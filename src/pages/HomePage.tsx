import styles from "./HomePage.module.css";

interface HomePageProps {
  sharedSeed: number | null;
  onNewSetup: () => void;
  onOpenShared: () => void;
  onOpenHistory: () => void;
}

export function HomePage({ sharedSeed, onNewSetup, onOpenShared, onOpenHistory }: HomePageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.heading}>
        <h1 className={styles.title}>GWT ARGENTINA</h1>
        <p className={styles.subtitle}>Setup Randomizer</p>
      </div>

      {sharedSeed !== null && (
        <div className={styles.sharedCard}>
          <span className={styles.sharedLabel}>Setup compartilhado</span>
          <span className={styles.sharedSeed}>Seed: {sharedSeed}</span>
          <button type="button" className={styles.primaryButton} onClick={onOpenShared}>
            Abrir setup
          </button>
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.primaryButton} onClick={onNewSetup}>
          🎲 Novo setup
        </button>
        <button type="button" className={styles.secondaryButton} onClick={onOpenHistory}>
          Histórico
        </button>
      </div>
    </main>
  );
}
