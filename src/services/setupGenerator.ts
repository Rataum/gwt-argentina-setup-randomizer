import {
  CITIES,
  NEUTRAL_BUILDINGS,
  PRIVATE_BUILDINGS,
  STATION_MASTERS,
  STATION_MASTER_SPACES,
} from "../data/gameData";
import type {
  CityResult,
  PrivateBuildingResult,
  SectionSeeds,
  SetupResult,
  SetupState,
  StationMaster,
} from "../models/game";
import { createRng, randomSide, shuffle } from "../utils/random";
import { deriveSectionSeed } from "./seedGenerator";

/**
 * Gera a ordem sorteada das 8 construções neutras a partir de uma seed.
 * A mesma seed sempre produz a mesma ordem.
 */
export function generateNeutralBuildings(seed: number) {
  const rng = createRng(seed);
  return shuffle(NEUTRAL_BUILDINGS, rng);
}

/**
 * Sorteia os mestres das estações: embaralha os 8 e fica com os 5 primeiros,
 * um para cada espaço de mestre de estação (posição 1 a 5). Os outros 3
 * voltam à caixa.
 */
export function generateStationMasters(seed: number): StationMaster[] {
  const rng = createRng(seed);
  return shuffle(STATION_MASTERS, rng).slice(0, STATION_MASTER_SPACES);
}

/**
 * Sorteia o lado (A/B) de cada uma das 10 construções privadas a partir de
 * uma seed. Todos os jogadores usam o mesmo resultado nesta partida.
 */
export function generatePrivateBuildings(seed: number): PrivateBuildingResult[] {
  const rng = createRng(seed);
  return PRIVATE_BUILDINGS.map((building) => ({
    number: building.number,
    side: randomSide(rng),
  }));
}

/**
 * Sorteia o lado (A/B) de cada um dos 3 tiles de cidade/porto a partir de
 * uma seed.
 */
export function generateCities(seed: number): CityResult[] {
  const rng = createRng(seed);
  return CITIES.map((city) => ({
    name: city.name,
    side: randomSide(rng),
  }));
}

/**
 * A partir de uma seed principal, deriva as seeds de seção (construções
 * neutras, mestres das estações, construções de jogador e cidades).
 */
export function deriveSectionSeedsFromMaster(masterSeed: number): SectionSeeds {
  return {
    neutralSeed: deriveSectionSeed(masterSeed, "neutral"),
    stationMasterSeed: deriveSectionSeed(masterSeed, "stationMaster"),
    playerSeed: deriveSectionSeed(masterSeed, "player"),
    citySeed: deriveSectionSeed(masterSeed, "city"),
  };
}

/**
 * Monta o resultado completo do setup (todas as seções já sorteadas) a
 * partir de um estado de seeds.
 */
export function buildSetupResult(state: SetupState): SetupResult {
  return {
    ...state,
    neutralBuildings: generateNeutralBuildings(state.neutralSeed),
    stationMasters: generateStationMasters(state.stationMasterSeed),
    privateBuildings: generatePrivateBuildings(state.playerSeed),
    cities: generateCities(state.citySeed),
    createdAt: new Date().toISOString(),
  };
}
