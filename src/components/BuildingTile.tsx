import { useI18n } from "../i18n/I18nContext";
import styles from "./BuildingTile.module.css";

interface NeutralTileProps {
  variant: "neutral";
  position: number;
  letter: string;
}

interface PlayerTileProps {
  variant: "player";
  number: number;
  side: "A" | "B";
}

type BuildingTileProps = NeutralTileProps | PlayerTileProps;

/**
 * Representação visual de uma construção neutra (posição + letra) ou de uma
 * construção de jogador (número + lado sorteado).
 */
export function BuildingTile(props: BuildingTileProps) {
  const { t } = useI18n();

  if (props.variant === "neutral") {
    return (
      <div className={styles.tile} aria-label={t.tiles.neutralBuilding(props.position, props.letter)}>
        <span className={styles.position}>{props.position}</span>
        <span className={styles.letter}>{props.letter}</span>
      </div>
    );
  }

  return (
    <div className={styles.tile} aria-label={t.tiles.playerBuilding(props.number, props.side)}>
      <span className={styles.number}>{props.number}</span>
      <span className={styles.side}>{props.side}</span>
    </div>
  );
}
