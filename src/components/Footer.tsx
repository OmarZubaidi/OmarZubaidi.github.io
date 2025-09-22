import Email from '../assets/email.svg?react';
import GitHub from '../assets/github.svg?react';
import LinkedInBlack from '../assets/linkedInBlack.svg?react';
import LinkedInWhite from '../assets/linkedInWhite.svg?react';
import { useThemeState } from '../hooks/useThemeState';
import ImageButton from './ImageButton';

/** Footer component to be used on all pages */
export default function Footer() {
  const { theme } = useThemeState();

  return (
    <footer
      className="glassy header-footer"
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: 'calc(var(--padding) * 3)',
        padding: 'var(--padding)',
        // shift it to get rid of the border except at the top
        bottom: '0',
        height: 'calc(var(--footer-height) + 1px)',
        transform: 'translateX(-1px) translateY(+1px)',
      }}
    >
      <ImageButton
        image={<Email />}
        label="Email me"
        link="mailto:software.2.omar@zubaidi.aleeas.com"
        buttonStyle={{
          padding: 0,
          color: 'var(--color-text)',
        }}
      />
      <ImageButton
        // github forbids changing the color https://github.com/logos
        image={<GitHub />}
        label="Check out my GitHub profile"
        link="https://github.com/omarzubaidi"
        linkNewTab
        buttonStyle={{
          padding: 0,
        }}
      />
      <ImageButton
        // linkedin forbids changing the color https://brand.linkedin.com/in-logo
        image={theme === 'light' ? <LinkedInBlack /> : <LinkedInWhite />}
        label="Check out my LinkedIn profile"
        link="https://www.linkedin.com/in/omarzubaidi"
        linkNewTab
        buttonStyle={{
          padding: 0,
        }}
      />
    </footer>
  );
}
