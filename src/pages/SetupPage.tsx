import { BuildingTile } from "../components/BuildingTile";
import { CityTile } from "../components/CityTile";
import { CopySetupButton } from "../components/CopySetupButton";
import { LanguageSwitch } from "../components/LanguageSwitch";
import { SeedDisplay } from "../components/SeedDisplay";
import { SetupSection } from "../components/SetupSection";
import { ShareButton } from "../components/ShareButton";
import { StationMasterTile } from "../components/StationMasterTile";
import { useI18n } from "../i18n/I18nContext";
import type { SetupResult } from "../models/game";
import styles from "./SetupPage.module.css";

interface SetupPageProps {
  result: SetupResult;
  onRerollNeutral: () => void;
  onRerollStationMasters: () => void;
  onRerollPlayers: () => void;
  onRerollCities: () => void;
  onNewSetup: () => void;
  onBackHome: () => void;
}

export function SetupPage({
  result,
  onRerollNeutral,
  onRerollStationMasters,
  onRerollPlayers,
  onRerollCities,
  onNewSetup,
  onBackHome,
}: SetupPageProps) {
  const { t } = useI18n();

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <button type="button" className={styles.backButton} onClick={onBackHome}>
          {t.setup.back}
        </button>
        <h1 className={styles.title}>GWT ARGENTINA</h1>
        <LanguageSwitch />
      </div>

      <SeedDisplay seed={result.masterSeed} />

      <div className={styles.sections}>
        <SetupSection title={t.setup.sections.neutralBuildings} onReroll={onRerollNeutral}>
          {result.neutralBuildings.map((building, index) => (
            <BuildingTile key={building.id} variant="neutral" position={index + 1} letter={building.letter} />
          ))}
        </SetupSection>

        <SetupSection title={t.setup.sections.stationMasters} onReroll={onRerollStationMasters}>
          {result.stationMasters.map((master, index) => (
            <StationMasterTile key={master.id} position={index + 1} id={master.id} />
          ))}
        </SetupSection>

        <SetupSection title={t.setup.sections.playerBuildings} onReroll={onRerollPlayers}>
          {result.privateBuildings.map((building) => (
            <BuildingTile key={building.number} variant="player" number={building.number} side={building.side} />
          ))}
        </SetupSection>

        <SetupSection title={t.setup.sections.cities} onReroll={onRerollCities}>
          {result.cities.map((city) => (
            <CityTile key={city.name} name={city.name} side={city.side} />
          ))}
        </SetupSection>
      </div>

      <div className={styles.footerActions}>
        <button type="button" className={styles.newSetupButton} onClick={onNewSetup}>
          {t.setup.newSetup}
        </button>
        <ShareButton result={result} />
        <CopySetupButton result={result} />
      </div>
    </main>
  );
}
