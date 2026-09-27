import { BuildingTile } from "../components/BuildingTile";
import { CityTile } from "../components/CityTile";
import { CopySetupButton } from "../components/CopySetupButton";
import { SeedDisplay } from "../components/SeedDisplay";
import { SetupSection } from "../components/SetupSection";
import { ShareButton } from "../components/ShareButton";
import type { SetupResult } from "../models/game";
import styles from "./SetupPage.module.css";

interface SetupPageProps {
  result: SetupResult;
  onRerollNeutral: () => void;
  onRerollPlayers: () => void;
  onRerollCities: () => void;
  onNewSetup: () => void;
  onBackHome: () => void;
}

export function SetupPage({
  result,
  onRerollNeutral,
  onRerollPlayers,
  onRerollCities,
  onNewSetup,
  onBackHome,
}: SetupPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onBackHome}>
          ← Início
        </button>
        <h1 className={styles.title}>GWT ARGENTINA</h1>
        <span aria-hidden="true" />
      </div>

      <SeedDisplay seed={result.masterSeed} />

      <div className={styles.sections}>
        <SetupSection title="Construções neutras" onReroll={onRerollNeutral}>
          {result.neutralBuildings.map((building, index) => (
            <BuildingTile key={building.id} variant="neutral" position={index + 1} letter={building.letter} />
          ))}
        </SetupSection>

        <SetupSection title="Construções dos jogadores" onReroll={onRerollPlayers}>
          {result.privateBuildings.map((building) => (
            <BuildingTile key={building.number} variant="player" number={building.number} side={building.side} />
          ))}
        </SetupSection>

        <SetupSection title="Cidades / cais" onReroll={onRerollCities}>
          {result.cities.map((city) => (
            <CityTile key={city.name} name={city.name} side={city.side} />
          ))}
        </SetupSection>
      </div>

      <div className={styles.footerActions}>
        <button type="button" className={styles.newSetupButton} onClick={onNewSetup}>
          🎲 Novo setup
        </button>
        <ShareButton result={result} />
        <CopySetupButton result={result} />
      </div>
    </main>
  );
}
