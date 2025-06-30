import { useNavigate } from 'react-router';
import Logo from '../assets/logo.svg?react';
import ImageButton from './ImageButton';
import ToggleTheme from './ToggleTheme';

/** Header component to be used on all pages */
export default function Header() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    const navigated = navigate('/');
    if (navigated instanceof Promise) {
      navigated.catch(console.error);
    }
  };

  return (
    <header
      style={{
        alignItems: 'center',
        borderBlockEnd: '1px solid var(--color-gray)',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.1)',
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
          onClick={handleOnClick}
          buttonStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--color-text)',
          }}
        />
        <h1 color="var(--color-primary)">Omar</h1>
      </div>
      <ToggleTheme />
    </header>
  );
}
