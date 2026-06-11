import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { OQ } from '../data.js'; // enriched default (RU)
import { locales, LANG_HTML } from './locales/index.js';
import { findById } from '../data/details.js';
import { localizeOQ } from './localizeOQ.js';
import { getNested, interpolate } from './utils.js';

const STORAGE_KEY = 'oi-qaragai-lang';

const LanguageContext = createContext({
  lang: 'RU',
  setLang: () => {},
  t: (key) => key,
  oq: OQ,
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && locales[saved]) return saved;
    } catch {
      /* ignore */
    }
    return 'RU';
  });

  const setLang = (next) => {
    if (!locales[next]) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = LANG_HTML[lang] ?? 'ru';
  }, [lang]);

  const value = useMemo(() => {
    const messages = locales[lang] ?? locales.RU;

    const t = (key, vars) => {
      const val = getNested(messages, key) ?? getNested(locales.RU, key);
      if (val === undefined) return key;
      return interpolate(val, vars);
    };

    return {
      lang,
      setLang,
      t,
      oq: localizeOQ(lang, t),
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}

export function useOQ() {
  return useContext(LanguageContext).oq;
}

export function useDetail(section, id) {
  const { lang } = useTranslation();
  return useMemo(() => findById(section, id, lang), [section, id, lang]);
}
