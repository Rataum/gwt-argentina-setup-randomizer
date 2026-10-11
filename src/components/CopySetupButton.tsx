import { useState } from "react";
import type { SetupResult } from "../models/game";
import { formatSetupAsText } from "../services/formatSetup";
import styles from "./ActionButton.module.css";

interface CopySetupButtonProps {
  result: SetupResult;
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
