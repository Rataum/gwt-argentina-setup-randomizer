import { useMemo } from "react";
import type { HistoryEntry, SetupState } from "../models/game";
import { getHistory } from "../services/storage";
import styles from "./HistoryPage.module.css";

interface HistoryPageProps {
  onOpenEntry: (state: SetupState) => void;
  onBack: () => void;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function toSetupState(entry: HistoryEntry): SetupState {
  const { masterSeed, neutralSeed, playerSeed, citySeed } = entry;
  return { masterSeed, neutralSeed, playerSeed, citySeed };
}

export function HistoryPage({ onOpenEntry, onBack }: HistoryPageProps) {
  const history = useMemo(() => getHistory(), []);

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onBack}>
          ← Início
        </button>
        <h1 className={styles.title}>Histórico</h1>
      </div>

      {history.length === 0 ? (
        <p className={styles.empty}>Nenhum setup gerado ainda. Toque em "Novo setup" para começar.</p>
      ) : (
        <div className={styles.list}>
          {history.map((entry) => (
            <button
              key={entry.masterSeed}
              type="button"
              className={styles.entryButton}
              onClick={() => onOpenEntry(toSetupState(entry))}
            >
              <span className={styles.entryDate}>{formatDate(entry.createdAt)}</span>
              <span className={styles.entrySeed}>Seed {entry.masterSeed}</span>
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
