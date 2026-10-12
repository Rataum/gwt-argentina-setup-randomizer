import { describe, expect, it } from "vitest";
import { STATION_MASTERS } from "../../data/gameData";
import { translations } from "../translations";

/** Descreve só a "forma" do objeto: chaves e tipos, sem os textos. */
function shapeOf(value: unknown): unknown {
  if (typeof value === "function") return "function";
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shapeOf(inner)]));
  }
  return typeof value;
}

/** Junta todos os textos (strings) de um objeto de traduções. */
function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (value !== null && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

describe("traduções", () => {
  it("português e inglês têm exatamente as mesmas chaves", () => {
    expect(shapeOf(translations.en)).toEqual(shapeOf(translations["pt-BR"]));
  });

  it("nenhum texto está vazio", () => {
    for (const language of ["pt-BR", "en"] as const) {
      for (const text of collectStrings(translations[language])) {
        expect(text.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("todo mestre de estação tem nome e descrição nos dois idiomas", () => {
    for (const language of ["pt-BR", "en"] as const) {
      for (const master of STATION_MASTERS) {
        const entry = translations[language].stationMasters[master.id];
        expect(entry).toBeDefined();
        expect(entry.name.length).toBeGreaterThan(0);
        expect(entry.description.length).toBeGreaterThan(0);
      }
    }
  });

  it("os textos com parâmetros incluem os valores recebidos", () => {
    for (const language of ["pt-BR", "en"] as const) {
      const t = translations[language];
      expect(t.tiles.city("Le Havre", "B")).toContain("Le Havre");
      expect(t.tiles.neutralBuilding(3, "F")).toContain("F");
      expect(t.tiles.playerBuilding(7, "A")).toContain("7");
      expect(t.text.stationMasterLine(2, "Nome", "5")).toContain("Nome");
    }
  });
});
