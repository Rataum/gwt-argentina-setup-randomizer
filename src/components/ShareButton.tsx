import { useState } from "react";
import type { SetupResult } from "../models/game";
import { buildShareUrl } from "../services/urlState";
import styles from "./ActionButton.module.css";

interface ShareButtonProps {
  result: SetupResult;
}

function formatSetupAsText(result: SetupResult, url: string): string {
  const neutralLine = result.neutralBuildings.map((building) => building.letter).join(" ");
  const playersLine = result.privateBuildings.map((b) => `${b.number}${b.side}`).join(" ");
  const citiesLines = result.cities.map((city) => `${city.name} ${city.side}`).join("\n");

  return [
    "GWT Argentina",
    "",
    `Seed: ${result.masterSeed}`,
    "",
    "Construções neutras:",
    neutralLine,
    "",
    "Construções dos jogadores:",
    playersLine,
    "",
    "Cidades:",
    citiesLines,
    "",
    url,
  ].join("\n");
}

export function ShareButton({ result }: ShareButtonProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleShare() {
    const url = buildShareUrl(result);
    const text = formatSetupAsText(result, url);

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "GWT Argentina — Setup", text, url });
        return;
      } catch {
        // Usuário cancelou o compartilhamento ou a API falhou: cai no fallback abaixo.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setFeedback("Setup copiado!");
    } catch {
      setFeedback(url);
    } finally {
      setTimeout(() => setFeedback(null), 2500);
    }
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={handleShare}>
        🔗 Compartilhar
      </button>
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
}
