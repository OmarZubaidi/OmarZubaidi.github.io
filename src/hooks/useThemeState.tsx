import { createContext, useContext, useEffect, useState } from 'react';

type ThemeValue = 'light' | 'dark';

interface ThemeContextValue {
  theme: ThemeValue;
  switchTheme: () => void;
}

const ThemeStateContext = createContext<ThemeContextValue | null>(null);

export const useThemeState = () => {
  const context = useContext(ThemeStateContext);
  if (!context) {
    throw new Error('useThemeState must be used within ThemeStateProvider');
  }
  return context;
};

export const ThemeStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeValue>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const switchTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return <ThemeStateContext.Provider value={{ theme, switchTheme }}>{children}</ThemeStateContext.Provider>;
};
