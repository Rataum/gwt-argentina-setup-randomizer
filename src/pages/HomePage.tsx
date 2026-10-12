import { LanguageSwitch } from "../components/LanguageSwitch";
import { useI18n } from "../i18n/I18nContext";
import styles from "./HomePage.module.css";

interface HomePageProps {
  sharedSeed: number | null;
  onNewSetup: () => void;
  onOpenShared: () => void;
  onOpenHistory: () => void;
}

export function HomePage({ sharedSeed, onNewSetup, onOpenShared, onOpenHistory }: HomePageProps) {
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <LanguageSwitch />
      </div>

      <div className={styles.heading}>
        <h1 className={styles.title}>GWT ARGENTINA</h1>
        <p className={styles.subtitle}>Setup Randomizer</p>
      </div>

      {sharedSeed !== null && (
        <div className={styles.sharedCard}>
          <span className={styles.sharedLabel}>{t.home.sharedSetup}</span>
          <span className={styles.sharedSeed}>Seed: {sharedSeed}</span>
          <button type="button" className={styles.primaryButton} onClick={onOpenShared}>
            {t.home.openSetup}
          </button>
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.primaryButton} onClick={onNewSetup}>
          {t.home.newSetup}
        </button>
        <button type="button" className={styles.secondaryButton} onClick={onOpenHistory}>
          {t.home.history}
        </button>
      </div>
    </main>
  );
}
