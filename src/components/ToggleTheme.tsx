import { useEffect, useState } from 'react';
import BulbOff from '../assets/bulb-off.svg?react';
import BulbOn from '../assets/bulb-on.svg?react';

/**
 * ToggleTheme component
 *
 * Allows users to switch between light and dark themes. It updates the document body data attribute to reflect the
 * current theme.
 */
export default function ToggleTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    console.log('Toggle theme from', theme);
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={() => {
        toggleTheme();
      }}
      onKeyDown={(e) => {
        if (e.key !== 'Enter' && e.key !== ' ') {
          return;
        }
        e.preventDefault();
        toggleTheme();
      }}
      onKeyUp={() => null}
      aria-label="Dark mode toggle"
      name="dark-mode-toggle"
      tabIndex={0}
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
