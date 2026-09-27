import styles from "./CityTile.module.css";

interface CityTileProps {
  name: string;
  side: "A" | "B";
}

export function CityTile({ name, side }: CityTileProps) {
  return (
    <div className={styles.tile} aria-label={`${name}, lado ${side}`}>
      <span className={styles.name}>{name}</span>
      <span className={styles.side}>{side}</span>
    </div>
  );
}
