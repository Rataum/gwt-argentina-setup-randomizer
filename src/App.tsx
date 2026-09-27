import { useEffect, useRef, useState } from "react";
import { useSetup } from "./hooks/useSetup";
import type { SetupState } from "./models/game";
import { HistoryPage } from "./pages/HistoryPage";
import { HomePage } from "./pages/HomePage";
import { SetupPage } from "./pages/SetupPage";
import { addHistoryEntry } from "./services/storage";
import { buildSearchFromState, readStateFromSearch } from "./services/urlState";

type View = "home" | "setup" | "history";

function readInitialSharedState(): SetupState | null {
  if (typeof window === "undefined") return null;
  return readStateFromSearch(window.location.search);
}

export function App() {
  const [view, setView] = useState<View>("home");
  // Lida uma única vez, na carga da página: se a URL trouxer uma seed,
  // guardamos aqui para oferecer "Abrir setup" na tela inicial.
  const [sharedState] = useState<SetupState | null>(readInitialSharedState);
  const setup = useSetup(sharedState ?? undefined);

  // Guarda a view anterior só para saber quando estamos SAINDO da tela de
  // setup (e não simplesmente carregando a página pela primeira vez).
  const previousViewRef = useRef<View>(view);

  // Mantém a URL sincronizada com o estado atual enquanto estamos na tela
  // de resultado, para que o link do navegador sempre reflita o que está
  // sendo mostrado (isso é o que faz o compartilhamento funcionar mesmo
  // sem clicar em "Compartilhar"). Ao sair da tela de setup, a seed é
  // removida da URL, já que ela deixa de representar o que está na tela.
  useEffect(() => {
    if (view === "setup") {
      const search = buildSearchFromState(setup.state);
      window.history.replaceState(null, "", `${window.location.pathname}${search}`);
    } else if (previousViewRef.current === "setup") {
      window.history.replaceState(null, "", window.location.pathname);
    }

    previousViewRef.current = view;
  }, [view, setup.state]);

  function handleNewSetup() {
    const fresh = setup.newSetup();
    addHistoryEntry(fresh);
    setView("setup");
  }

  function handleOpenShared() {
    if (!sharedState) return;
    addHistoryEntry(sharedState);
    setView("setup");
  }

  function handleOpenHistoryEntry(entry: SetupState) {
    setup.loadState(entry);
    setView("setup");
  }

  if (view === "history") {
    return <HistoryPage onOpenEntry={handleOpenHistoryEntry} onBack={() => setView("home")} />;
  }

  if (view === "setup") {
    return (
      <SetupPage
        result={setup.result}
        onRerollNeutral={setup.rerollNeutral}
        onRerollPlayers={setup.rerollPlayers}
        onRerollCities={setup.rerollCities}
        onNewSetup={handleNewSetup}
        onBackHome={() => setView("home")}
      />
    );
  }

  return (
    <HomePage
      sharedSeed={sharedState?.masterSeed ?? null}
      onNewSetup={handleNewSetup}
      onOpenShared={handleOpenShared}
      onOpenHistory={() => setView("history")}
    />
  );
}