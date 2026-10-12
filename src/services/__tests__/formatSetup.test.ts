import { describe, expect, it } from "vitest";
import { translations } from "../../i18n/translations";
import { formatSetupAsText } from "../formatSetup";
import { buildSetupResult, deriveSectionSeedsFromMaster } from "../setupGenerator";

const state = { masterSeed: 482913, ...deriveSectionSeedsFromMaster(482913) };
const result = buildSetupResult(state);

describe("formatSetupAsText", () => {
  it("gera o texto em português", () => {
    const text = formatSetupAsText(result, translations["pt-BR"]);
    expect(text).toContain("Seed: 482913");
    expect(text).toContain("Construções neutras:");
    expect(text).toContain("Mestres das estações:");
    expect(text).toContain("Construções dos jogadores:");
    expect(text).toContain("Cidades:");
  });

  it("gera o texto em inglês", () => {
    const text = formatSetupAsText(result, translations.en);
    expect(text).toContain("Seed: 482913");
    expect(text).toContain("Neutral buildings:");
    expect(text).toContain("Station masters:");
    expect(text).toContain("Player buildings:");
    expect(text).toContain("Cities:");
    expect(text).not.toContain("Construções");
  });

  it("o conteúdo sorteado é o mesmo nos dois idiomas", () => {
    const pt = formatSetupAsText(result, translations["pt-BR"]);
    const en = formatSetupAsText(result, translations.en);
    const neutralLine = result.neutralBuildings.map((b) => b.letter).join(" ");
    const playersLine = result.privateBuildings.map((b) => `${b.number}${b.side}`).join(" ");

    for (const text of [pt, en]) {
      expect(text).toContain(neutralLine);
      expect(text).toContain(playersLine);
      for (const master of result.stationMasters) {
        expect(text).toContain(`(${text === pt ? "mestre" : "master"} ${master.id})`);
      }
    }
  });

  it("lista os 5 mestres numerados de 1 a 5", () => {
    const text = formatSetupAsText(result, translations.en);
    for (let position = 1; position <= 5; position++) {
      expect(text).toContain(`${position} — `);
    }
  });

  it("inclui a URL ao final quando informada", () => {
    const url = "https://exemplo.github.io/repo/?seed=482913";
    const text = formatSetupAsText(result, translations.en, url);
    expect(text.endsWith(url)).toBe(true);
    expect(formatSetupAsText(result, translations.en)).not.toContain("https://");
  });
});
