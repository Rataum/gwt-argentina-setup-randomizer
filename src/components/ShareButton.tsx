import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import type { SetupResult } from "../models/game";
import { formatSetupAsText } from "../services/formatSetup";
import { buildShareUrl } from "../services/urlState";
import styles from "./ActionButton.module.css";

interface ShareButtonProps {
  result: SetupResult;
}

export function ShareButton({ result }: ShareButtonProps) {
  const { t } = useI18n();
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleShare() {
    const url = buildShareUrl(result);
    const text = formatSetupAsText(result, t, url);

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: t.share.shareTitle, text, url });
        return;
      } catch {
        // Usuário cancelou o compartilhamento ou a API falhou: cai no fallback abaixo.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setFeedback(t.share.copied);
    } catch {
      setFeedback(url);
    } finally {
      setTimeout(() => setFeedback(null), 2500);
    }
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={handleShare}>
        {t.share.button}
      </button>
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
}
