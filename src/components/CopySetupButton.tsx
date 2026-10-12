import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import type { SetupResult } from "../models/game";
import { formatSetupAsText } from "../services/formatSetup";
import styles from "./ActionButton.module.css";

interface CopySetupButtonProps {
  result: SetupResult;
}

export function CopySetupButton({ result }: CopySetupButtonProps) {
  const { t } = useI18n();
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleCopy() {
    const text = formatSetupAsText(result, t);
    try {
      await navigator.clipboard.writeText(text);
      setFeedback(t.copy.copied);
    } catch {
      setFeedback(t.copy.failed);
    } finally {
      setTimeout(() => setFeedback(null), 2500);
    }
  }

  return (
    <div>
      <button type="button" className={styles.button} onClick={handleCopy}>
        {t.copy.button}
      </button>
      {feedback && <p className={styles.feedback}>{feedback}</p>}
    </div>
  );
}
