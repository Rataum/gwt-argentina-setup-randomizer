import type { ReactNode } from "react";
import styles from "./SetupSection.module.css";

interface SetupSectionProps {
  title: string;
  onReroll: () => void;
  rerollLabel?: string;
  children: ReactNode;
}

export function SetupSection({ title, onReroll, rerollLabel = "Sortear novamente", children }: SetupSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.content}>{children}</div>
      <button type="button" className={styles.rerollButton} onClick={onReroll}>
        ↻ {rerollLabel}
      </button>
    </section>
  );
}
