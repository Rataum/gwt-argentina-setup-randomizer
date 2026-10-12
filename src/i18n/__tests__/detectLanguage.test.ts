import { describe, expect, it } from "vitest";
import { FALLBACK_LANGUAGE, isLanguage, matchLanguage, pickLanguage } from "../detectLanguage";

describe("matchLanguage", () => {
  it("reconhece português em qualquer variante", () => {
    expect(matchLanguage("pt")).toBe("pt-BR");
    expect(matchLanguage("pt-BR")).toBe("pt-BR");
    expect(matchLanguage("pt-PT")).toBe("pt-BR");
    expect(matchLanguage("PT_br")).toBe("pt-BR");
  });

  it("reconhece inglês em qualquer variante", () => {
    expect(matchLanguage("en")).toBe("en");
    expect(matchLanguage("en-US")).toBe("en");
    expect(matchLanguage("en-GB")).toBe("en");
  });

  it("devolve null para idiomas sem tradução", () => {
    expect(matchLanguage("es-ES")).toBeNull();
    expect(matchLanguage("ja")).toBeNull();
    expect(matchLanguage("")).toBeNull();
  });
});

describe("isLanguage", () => {
  it("só aceita os idiomas suportados", () => {
    expect(isLanguage("pt-BR")).toBe(true);
    expect(isLanguage("en")).toBe(true);
    expect(isLanguage("pt")).toBe(false);
    expect(isLanguage("fr")).toBe(false);
    expect(isLanguage(null)).toBe(false);
  });
});

describe("pickLanguage", () => {
  it("a escolha salva tem prioridade sobre o navegador", () => {
    expect(pickLanguage("en", ["pt-BR"])).toBe("en");
    expect(pickLanguage("pt-BR", ["en-US"])).toBe("pt-BR");
  });

  it("ignora uma escolha salva inválida e usa o navegador", () => {
    expect(pickLanguage("fr", ["pt-BR"])).toBe("pt-BR");
  });

  it("sem escolha salva, usa o primeiro idioma suportado do navegador", () => {
    expect(pickLanguage(null, ["pt-BR", "en"])).toBe("pt-BR");
    expect(pickLanguage(null, ["en-US", "pt-BR"])).toBe("en");
  });

  it("pula idiomas sem tradução na lista do navegador", () => {
    expect(pickLanguage(null, ["es-ES", "fr", "pt-BR"])).toBe("pt-BR");
  });

  it("sem nenhum idioma suportado, usa o idioma padrão", () => {
    expect(pickLanguage(null, ["es-ES", "ja"])).toBe(FALLBACK_LANGUAGE);
    expect(pickLanguage(null, [])).toBe(FALLBACK_LANGUAGE);
  });
});
