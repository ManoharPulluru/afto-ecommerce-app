// theme.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeType = 'light' | 'dark';

const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#ea6969',
  border: '#ea69693f',
  secondary: '#ffffff',
  icon: '#ab2726',
};

const darkTheme = {
  background: '#252836',
  text: '#ffffff',
  primary: '#ff7676',
  border: '#ffffff33',
  secondary: '#1f1d2b',
  icon: '#ffffff',
};

const ThemeContext = createContext({
  theme: lightTheme,
  mode: 'light' as ThemeType,
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // 👇 always start with light theme
  const [mode, setMode] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;
  const isDark = mode === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, mode, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
