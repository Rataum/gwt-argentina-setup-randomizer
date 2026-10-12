import { useI18n } from "../i18n/I18nContext";
import styles from "./CityTile.module.css";

interface CityTileProps {
  name: string;
  side: "A" | "B";
}

export function CityTile({ name, side }: CityTileProps) {
  const { t } = useI18n();

  return (
    <div className={styles.tile} aria-label={t.tiles.city(name, side)}>
      <span className={styles.name}>{name}</span>
      <span className={styles.side}>{side}</span>
    </div>
  );
}
