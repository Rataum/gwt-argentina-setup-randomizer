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
  if (props.variant === "neutral") {
    return (
      <div className={styles.tile} aria-label={`Posição ${props.position}: construção ${props.letter}`}>
        <span className={styles.position}>{props.position}</span>
        <span className={styles.letter}>{props.letter}</span>
      </div>
    );
  }

  return (
    <div className={styles.tile} aria-label={`Construção ${props.number}, lado ${props.side}`}>
      <span className={styles.number}>{props.number}</span>
      <span className={styles.side}>{props.side}</span>
    </div>
  );
}
