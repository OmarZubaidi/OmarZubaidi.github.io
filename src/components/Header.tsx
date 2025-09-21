import Logo from '../assets/logo.svg?react';
import ImageButton from './ImageButton';
import ToggleTheme from './ToggleTheme';

/** Header component to be used on all pages */
export default function Header() {
  return (
    <header
      style={{
        alignItems: 'center',
        borderBlockEnd: '1px solid var(--color-gray)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 'var(--padding)',
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex', gap: 'var(--padding)' }}>
        <ImageButton
          image={<Logo />}
          height={48}
          label="Return to home page"
          link="/"
          buttonStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--color-text)',
          }}
        />
        <h1 style={{ color: 'var(--color-primary)' }}>Omar's Projects</h1>
      </div>
      <ToggleTheme />
    </header>
  );
}
