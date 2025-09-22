import Logo from '../assets/logo.svg?react';
import ImageButton from './ImageButton';
import ToggleTheme from './ToggleTheme';

/** Header component to be used on all pages */
export default function Header() {
  return (
    <header
      className="glassy header-footer"
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 'var(--padding)',
        // shift it to get rid of the border except at the bottom
        top: 0,
        height: 'calc(var(--header-height) + 1px)',
        transform: 'translateX(-1px) translateY(-1px)',
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
