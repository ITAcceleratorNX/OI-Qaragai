import { useTheme } from '../theme/ThemeProvider.jsx';
import { I } from '../icons.jsx';
import { useTranslation } from '../i18n/LanguageProvider.jsx';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <button
      className="icon-btn theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.light') : t('theme.dark')}
      title={isDark ? t('theme.lightTitle') : t('theme.darkTitle')}
    >
      {isDark ? <I.sun size={19} /> : <I.moon size={19} />}
    </button>
  );
}
