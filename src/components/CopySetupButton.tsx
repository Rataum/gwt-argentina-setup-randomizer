import { useState } from "react";
import type { SetupResult } from "../models/game";
import styles from "./ActionButton.module.css";

interface CopySetupButtonProps {
  result: SetupResult;
}

function formatSetupAsText(result: SetupResult): string {
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
  ].join("\n");
}

export function CopySetupButton({ result }: CopySetupButtonProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleCopy() {
    const text = formatSetupAsText(result);
    try {
      await navigator.clipboard.writeText(text);
      setFeedback("Configuração copiada!");
    } catch {
      setFeedback("Não foi possível copiar automaticamente.");
    } finally {
      setTimeout(() => setFeedback(null), 2500);
    }
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={handleCopy}>
        📋 Copiar configuração
      </button>
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
}
