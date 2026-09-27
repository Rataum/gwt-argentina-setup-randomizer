import { describe, expect, it } from "vitest";
import { deriveSectionSeedsFromMaster } from "../setupGenerator";
import { buildSearchFromState, readStateFromSearch } from "../urlState";

describe("readStateFromSearch", () => {
  it("interpreta corretamente uma seed presente na URL", () => {
    const state = readStateFromSearch("?seed=482913");
    expect(state).not.toBeNull();
    expect(state?.masterSeed).toBe(482913);
  });

  it("deriva as seeds de seção a partir da seed principal quando não há overrides", () => {
    const state = readStateFromSearch("?seed=482913");
    const expected = deriveSectionSeedsFromMaster(482913);
    expect(state?.neutralSeed).toBe(expected.neutralSeed);
    expect(state?.playerSeed).toBe(expected.playerSeed);
    expect(state?.citySeed).toBe(expected.citySeed);
  });

  it("respeita overrides de seção presentes na URL", () => {
    const state = readStateFromSearch("?seed=482913&ns=1234");
    expect(state?.neutralSeed).toBe(1234);
  });

  it("retorna null quando não há seed na URL", () => {
    const state = readStateFromSearch("?foo=bar");
    expect(state).toBeNull();
  });
});

describe("buildSearchFromState", () => {
  it("gera uma URL limpa (só ?seed=) quando nenhuma seção foi sorteada à parte", () => {
    const masterSeed = 482913;
    const state = { masterSeed, ...deriveSectionSeedsFromMaster(masterSeed) };
    expect(buildSearchFromState(state)).toBe(`?seed=${masterSeed}`);
  });

  it("uma URL com seed válida abre a configuração correspondente (round-trip)", () => {
    const masterSeed = 482913;
    const state = { masterSeed, ...deriveSectionSeedsFromMaster(masterSeed) };
    const search = buildSearchFromState(state);
    const parsed = readStateFromSearch(search);
    expect(parsed).toEqual(state);
  });

  it("inclui o override de uma seção sorteada à parte", () => {
    const masterSeed = 482913;
    const base = { masterSeed, ...deriveSectionSeedsFromMaster(masterSeed) };
    const withReroll = { ...base, citySeed: 55555 };
    const search = buildSearchFromState(withReroll);
    expect(search).toContain("cs=55555");

    const parsed = readStateFromSearch(search);
    expect(parsed).toEqual(withReroll);
  });
});
