import Email from '../assets/email.svg?react';
import GitHub from '../assets/github.svg?react';
import LinkedIn from '../assets/linkedIn.svg?react';
import Logo from '../assets/logo.svg?react';
import ImageButton from './ImageButton';

/** Footer component to be used on all pages */
export default function Footer() {
  const handleSendEmail = () => {
    window.open('mailto:software.2.omar@zubaidi.aleeas.com', '_self');
  };
  const handleOpenGitHub = () => {
    window.open('https://github.com/omarzubaidi', '_blank');
  };
  const handleOpenLinkedIn = () => {
    window.open('https://www.linkedin.com/in/omarzubaidi', '_blank');
  };

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
          onClick={handleSendEmail}
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
          onClick={handleOpenGitHub}
          buttonStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
          }}
        />
        <ImageButton
          // linkedin forbids changing the color https://brand.linkedin.com/in-logo
          image={<LinkedIn />}
          label="Check out my LinkedIn profile"
          onClick={handleOpenLinkedIn}
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
