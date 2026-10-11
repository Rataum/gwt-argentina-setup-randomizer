import { useState } from "react";
import type { SetupResult } from "../models/game";
import { formatSetupAsText } from "../services/formatSetup";
import { buildShareUrl } from "../services/urlState";
import styles from "./ActionButton.module.css";

interface ShareButtonProps {
  result: SetupResult;
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
