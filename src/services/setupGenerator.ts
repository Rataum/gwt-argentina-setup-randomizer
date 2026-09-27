import { CITIES, NEUTRAL_BUILDINGS, PRIVATE_BUILDINGS } from "../data/gameData";
import type {
  CityResult,
  PrivateBuildingResult,
  SectionSeeds,
  SetupResult,
  SetupState,
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
 * A partir de uma seed principal, deriva as três seeds de seção
 * (construções neutras, construções de jogador e cidades).
 */
export function deriveSectionSeedsFromMaster(masterSeed: number): SectionSeeds {
  return {
    neutralSeed: deriveSectionSeed(masterSeed, "neutral"),
    playerSeed: deriveSectionSeed(masterSeed, "player"),
    citySeed: deriveSectionSeed(masterSeed, "city"),
  };
}

/**
 * Monta o resultado completo do setup (as três seções já sorteadas) a
 * partir de um estado de seeds.
 */
export function buildSetupResult(state: SetupState): SetupResult {
  return {
    ...state,
    neutralBuildings: generateNeutralBuildings(state.neutralSeed),
    privateBuildings: generatePrivateBuildings(state.playerSeed),
    cities: generateCities(state.citySeed),
    createdAt: new Date().toISOString(),
  };
}
