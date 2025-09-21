import Email from '../assets/email.svg?react';
import GitHub from '../assets/github.svg?react';
import LinkedInBlack from '../assets/linkedInBlack.svg?react';
import LinkedInWhite from '../assets/linkedInWhite.svg?react';
import Logo from '../assets/logo.svg?react';
import { useThemeState } from '../hooks/useThemeState';
import ImageButton from './ImageButton';

/** Footer component to be used on all pages */
export default function Footer() {
  const { theme } = useThemeState();

  return (
    <footer
      style={{
        alignItems: 'center',
        borderBlockEnd: '1px solid var(--color-gray)',
        boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 'var(--padding)',
      }}
    >
      <Logo
        aria-hidden="true"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'var(--color-text)',
          height: '32px',
        }}
      />
      <div style={{ alignItems: 'center', display: 'flex', gap: 'var(--padding)' }}>
        <ImageButton
          image={<Email />}
          label="Email me"
          link="mailto:software.2.omar@zubaidi.aleeas.com"
          buttonStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            color: 'var(--color-text)',
          }}
        />
        <ImageButton
          // github forbids changing the color https://github.com/logos
          image={<GitHub />}
          label="Check out my GitHub profile"
          onClick={() => {
            window.open('https://github.com/omarzubaidi', '_blank');
          }}
          buttonStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
          }}
        />
        <ImageButton
          // linkedin forbids changing the color https://brand.linkedin.com/in-logo
          image={theme === 'light' ? <LinkedInBlack /> : <LinkedInWhite />}
          label="Check out my LinkedIn profile"
          onClick={() => {
            window.open('https://www.linkedin.com/in/omarzubaidi', '_blank');
          }}
          buttonStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
          }}
        />
      </div>
    </footer>
  );
}
