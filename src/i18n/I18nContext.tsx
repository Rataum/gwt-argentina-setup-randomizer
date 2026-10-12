import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { detectInitialLanguage, saveLanguage } from "./detectLanguage";
import { translations } from "./translations";
import type { Language, Translations } from "./translations";

interface I18nValue {
  language: Language;
  setLanguage: (language: Language) => void;
  /** Textos do idioma atual. */
  t: Translations;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Guarda o idioma atual e o disponibiliza para qualquer componente via
 * `useI18n()`. A escolha do usuário é salva no localStorage; na primeira
 * visita, o idioma vem do navegador.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    saveLanguage(next);
  }, []);

  // Mantém o atributo lang do <html> coerente (leitores de tela, tradutor
  // automático do navegador).
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nValue>(
    () => ({ language, setLanguage, t: translations[language] }),
    [language, setLanguage]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n precisa ser usado dentro de <I18nProvider>.");
  }
  return value;
}
