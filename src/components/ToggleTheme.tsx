import { useEffect, useState } from 'react';
import BulbOff from '../assets/bulbOff.svg?react';
import BulbOn from '../assets/bulbOn.svg?react';

/**
 * ToggleTheme component
 *
 * Allows users to switch between light and dark themes. It updates the document body data attribute to reflect the
 * current theme.
 */
export default function ToggleTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    // default to light mode
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      aria-label="Dark mode toggle"
      onClick={toggleTheme}
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
