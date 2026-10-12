import { useI18n } from "../i18n/I18nContext";
import styles from "./StationMasterTile.module.css";

interface StationMasterTileProps {
  /** Espaço de mestre de estação no tabuleiro (1 a 5). */
  position: number;
  id: string;
}

/**
 * Mestre de estação sorteado para um espaço do tabuleiro: posição, nome
 * curto e o texto completo da pontuação, no idioma atual.
 */
export function StationMasterTile({ position, id }: StationMasterTileProps) {
  const { t } = useI18n();
  const master = t.stationMasters[id] ?? { name: id, description: "" };

  return (
    <div className={styles.tile} aria-label={t.tiles.stationMaster(position, master.name)}>
      <span className={styles.position}>{position}</span>
      <div className={styles.text}>
        <span className={styles.name}>
          {master.name} <span className={styles.id}>{t.tiles.stationMasterId(id)}</span>
        </span>
        <span className={styles.description}>{master.description}</span>
      </div>
    </div>
  );
}
