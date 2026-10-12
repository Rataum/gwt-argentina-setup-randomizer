import type { Language } from "./translations";

/**
 * Idioma usado quando nada foi escolhido e o navegador não informa nenhum
 * idioma que o app suporte (ex.: espanhol, japonês). Troque aqui se preferir
 * outro padrão.
 */
export const FALLBACK_LANGUAGE: Language = "en";

const STORAGE_KEY = "gwt-argentina:language";

export function isLanguage(value: unknown): value is Language {
  return value === "pt-BR" || value === "en";
}

/**
 * Converte uma tag de idioma do navegador (ex.: "pt", "pt-PT", "en-GB") em um
 * idioma suportado pelo app. Devolve `null` se não houver tradução.
 */
export function matchLanguage(tag: string): Language | null {
  const base = tag.trim().toLowerCase().split(/[-_]/)[0];
  if (base === "pt") return "pt-BR";
  if (base === "en") return "en";
  return null;
}

/**
 * Regra de escolha do idioma (função pura, fácil de testar):
 * 1. a escolha salva pelo usuário, se existir;
 * 2. o primeiro idioma suportado da lista de preferência do navegador;
 * 3. o idioma padrão (`FALLBACK_LANGUAGE`).
 */
export function pickLanguage(saved: string | null, browserLanguages: readonly string[]): Language {
  if (isLanguage(saved)) return saved;

  for (const tag of browserLanguages) {
    const match = matchLanguage(tag);
    if (match) return match;
  }

  return FALLBACK_LANGUAGE;
}

function getBrowserLanguages(): readonly string[] {
  if (typeof navigator === "undefined") return [];
  if (navigator.languages && navigator.languages.length > 0) return navigator.languages;
  return navigator.language ? [navigator.language] : [];
}

function readSavedLanguage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage indisponível (modo privado, bloqueado...): segue sem ele.
    return null;
  }
}

/** Salva a escolha do usuário para as próximas visitas. */
export function saveLanguage(language: Language): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Sem armazenamento, a escolha só vale até fechar o app.
  }
}

/** Idioma inicial do app: escolha salva, depois navegador, depois padrão. */
export function detectInitialLanguage(): Language {
  return pickLanguage(readSavedLanguage(), getBrowserLanguages());
}
