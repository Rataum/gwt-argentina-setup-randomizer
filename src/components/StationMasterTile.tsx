import styles from "./StationMasterTile.module.css";

interface StationMasterTileProps {
  /** Espaço de mestre de estação no tabuleiro (1 a 5). */
  position: number;
  id: string;
  name: string;
  description: string;
}

/**
 * Mestre de estação sorteado para um espaço do tabuleiro: posição, nome
 * curto e o texto completo da pontuação.
 */
export function StationMasterTile({ position, id, name, description }: StationMasterTileProps) {
  return (
    <div className={styles.tile} aria-label={`Espaço ${position}: mestre da estação ${name}`}>
      <span className={styles.position}>{position}</span>
      <div className={styles.text}>
        <span className={styles.name}>
          {name} <span className={styles.id}>(mestre {id})</span>
        </span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
}
