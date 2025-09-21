import BulbOff from '../assets/bulbOff.svg?react';
import BulbOn from '../assets/bulbOn.svg?react';
import { useThemeState } from '../hooks/useThemeState';

/**
 * ToggleTheme component
 *
 * Allows users to switch between light and dark themes. It updates the document body data attribute to reflect the
 * current theme.
 */
export default function ToggleTheme() {
  const { theme, switchTheme } = useThemeState();

  return (
    <button
      aria-label="Dark mode toggle"
      // completely blind users can't see theme colors, but light sensitive users may prefer dark mode
      aria-live="polite"
      aria-pressed={theme === 'dark'}
      onClick={switchTheme}
      type="button"
      style={{
        background: 'transparent',
        border: '1px solid var(--color-gray)',
        borderRadius: 'var(--border-radius-lg)',
        color: 'var(--color-text)',
        cursor: 'pointer',
        padding: 'var(--padding)',
      }}
    >
      {theme === 'light' ? <BulbOn height={32} aria-hidden /> : <BulbOff height={32} aria-hidden />}
    </button>
  );
}
