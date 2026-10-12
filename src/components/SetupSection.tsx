import type { ReactNode } from "react";
import { useI18n } from "../i18n/I18nContext";
import styles from "./SetupSection.module.css";

interface SetupSectionProps {
  title: string;
  onReroll: () => void;
  rerollLabel?: string;
  children: ReactNode;
}

export function SetupSection({ title, onReroll, rerollLabel, children }: SetupSectionProps) {
  const { t } = useI18n();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.content}>{children}</div>
      <button type="button" className={styles.rerollButton} onClick={onReroll}>
        ↻ {rerollLabel ?? t.setup.reroll}
      </button>
    </section>
  );
}
