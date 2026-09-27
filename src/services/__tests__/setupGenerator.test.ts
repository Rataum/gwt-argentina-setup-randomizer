import { describe, expect, it } from "vitest";
import { CITIES, NEUTRAL_BUILDINGS, PRIVATE_BUILDINGS } from "../../data/gameData";
import {
  buildSetupResult,
  deriveSectionSeedsFromMaster,
  generateCities,
  generateNeutralBuildings,
  generatePrivateBuildings,
} from "../setupGenerator";

describe("generateNeutralBuildings", () => {
  it("gera exatamente 8 construções neutras", () => {
    const result = generateNeutralBuildings(1);
    expect(result).toHaveLength(8);
  });

  it("as 8 construções neutras são todas diferentes", () => {
    const result = generateNeutralBuildings(1);
    const letters = new Set(result.map((b) => b.letter));
    expect(letters.size).toBe(8);
  });

  it("é uma permutação válida das construções neutras originais", () => {
    const result = generateNeutralBuildings(777);
    const resultLetters = [...result.map((b) => b.letter)].sort();
    const originalLetters = [...NEUTRAL_BUILDINGS.map((b) => b.letter)].sort();
    expect(resultLetters).toEqual(originalLetters);
  });
});

describe("generatePrivateBuildings", () => {
  it("gera exatamente 10 construções de jogador", () => {
    const result = generatePrivateBuildings(1);
    expect(result).toHaveLength(10);
  });

  it("cada construção possui lado A ou B", () => {
    const result = generatePrivateBuildings(1);
    for (const building of result) {
      expect(["A", "B"]).toContain(building.side);
    }
  });

  it("contém os números 1 a 10, cada um uma única vez", () => {
    const result = generatePrivateBuildings(555);
    const numbers = result.map((b) => b.number).sort((a, b) => a - b);
    expect(numbers).toEqual(PRIVATE_BUILDINGS.map((b) => b.number));
  });
});

describe("generateCities", () => {
  it("gera exatamente 3 cidades", () => {
    const result = generateCities(1);
    expect(result).toHaveLength(3);
  });

  it("cada cidade possui lado A ou B", () => {
    const result = generateCities(1);
    for (const city of result) {
      expect(["A", "B"]).toContain(city.side);
    }
  });

  it("contém as 3 cidades esperadas (Le Havre, Rotterdam, Liverpool)", () => {
    const result = generateCities(2024);
    const names = result.map((c) => c.name).sort();
    expect(names).toEqual([...CITIES.map((c) => c.name)].sort());
  });
});

describe("reprodutibilidade da seed", () => {
  it("a mesma seed produz exatamente o mesmo resultado", () => {
    const seeds = deriveSectionSeedsFromMaster(482913);
    const state = { masterSeed: 482913, ...seeds };

    const resultA = buildSetupResult(state);
    const resultB = buildSetupResult(state);

    expect(resultA.neutralBuildings).toEqual(resultB.neutralBuildings);
    expect(resultA.privateBuildings).toEqual(resultB.privateBuildings);
    expect(resultA.cities).toEqual(resultB.cities);
  });

  it("uma seed diferente pode produzir uma configuração diferente", () => {
    const stateA = { masterSeed: 111111, ...deriveSectionSeedsFromMaster(111111) };
    const stateB = { masterSeed: 222222, ...deriveSectionSeedsFromMaster(222222) };

    const resultA = buildSetupResult(stateA);
    const resultB = buildSetupResult(stateB);

    const sameNeutral = JSON.stringify(resultA.neutralBuildings) === JSON.stringify(resultB.neutralBuildings);
    const samePlayers = JSON.stringify(resultA.privateBuildings) === JSON.stringify(resultB.privateBuildings);
    const sameCities = JSON.stringify(resultA.cities) === JSON.stringify(resultB.cities);

    expect(sameNeutral && samePlayers && sameCities).toBe(false);
  });

  it("regenerar uma seção (nova seed daquela seção) não modifica as outras", () => {
    const seeds = deriveSectionSeedsFromMaster(482913);
    const original = { masterSeed: 482913, ...seeds };
    const originalResult = buildSetupResult(original);

    const withNewNeutralSeed = { ...original, neutralSeed: 999999 };
    const updatedResult = buildSetupResult(withNewNeutralSeed);

    expect(updatedResult.privateBuildings).toEqual(originalResult.privateBuildings);
    expect(updatedResult.cities).toEqual(originalResult.cities);
    // A seção regenerada tem uma seed diferente, então (com probabilidade
    // esmagadora) o resultado dela muda:
    expect(updatedResult.neutralBuildings).not.toEqual(originalResult.neutralBuildings);
  });
});
