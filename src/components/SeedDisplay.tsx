import styles from "./SeedDisplay.module.css";

interface SeedDisplayProps {
  seed: number;
}

export function SeedDisplay({ seed }: SeedDisplayProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Seed:</span>
      <span className={styles.value}>{seed}</span>
    </div>
  );
}
