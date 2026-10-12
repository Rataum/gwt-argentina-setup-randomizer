import { useMemo } from "react";
import { LanguageSwitch } from "../components/LanguageSwitch";
import { useI18n } from "../i18n/I18nContext";
import type { HistoryEntry, SetupState } from "../models/game";
import { getHistory } from "../services/storage";
import styles from "./HistoryPage.module.css";

interface HistoryPageProps {
  onOpenEntry: (state: SetupState) => void;
  onBack: () => void;
}

function toSetupState(entry: HistoryEntry): SetupState {
  const { masterSeed, neutralSeed, stationMasterSeed, playerSeed, citySeed } = entry;
  return { masterSeed, neutralSeed, stationMasterSeed, playerSeed, citySeed };
}

export function HistoryPage({ onOpenEntry, onBack }: HistoryPageProps) {
  const { t } = useI18n();
  const history = useMemo(() => getHistory(), []);

  function formatDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;
    return t.history.formatDate(date);
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onBack}>
          {t.history.back}
        </button>
        <h1 className={styles.title}>{t.history.title}</h1>
        <div className={styles.languageSlot}>
          <LanguageSwitch />
        </div>
      </div>

      {history.length === 0 ? (
        <p className={styles.empty}>{t.history.empty}</p>
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
