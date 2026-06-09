import { useTheme } from '../theme/ThemeProvider.jsx';
import { I } from '../icons.jsx';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="icon-btn theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      title={isDark ? 'Светлая тема' : 'Тёмная тема'}
    >
      {isDark ? <I.sun size={19} /> : <I.moon size={19} />}
    </button>
  );
}
