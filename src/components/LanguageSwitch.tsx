import { useI18n } from "../i18n/I18nContext";
import { LANGUAGES } from "../i18n/translations";
import styles from "./LanguageSwitch.module.css";

/**
 * Botão para trocar o idioma (PT | EN). O idioma atual fica destacado.
 * A escolha é salva e passa a valer nas próximas visitas.
 */
export function LanguageSwitch() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className={styles.group} role="group" aria-label={t.language.label}>
      {LANGUAGES.map((option) => {
        const isActive = option.id === language;
        return (
          <button
            key={option.id}
            type="button"
            lang={option.id}
            title={option.name}
            aria-label={option.name}
            aria-pressed={isActive}
            className={isActive ? `${styles.option} ${styles.active}` : styles.option}
            onClick={() => setLanguage(option.id)}
          >
            {option.short}
          </button>
        );
      })}
    </div>
  );
}
