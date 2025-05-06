// theme.ts
import { createTheme } from '@mui/material/styles';
import { type ThemeOptions } from '@mui/material/styles/createTheme';

// Extend MUI theme with custom properties
declare module '@mui/material/styles' {
  interface Theme {
    sidebar: {
      background: string;
      foreground: string;
      primary: string;
      primaryForeground: string;
      accent: string;
      accentForeground: string;
      border: string;
      ring: string;
      sectionHeader: string;
      userProfileBackground: string;
    };
    card: {
      background: string;
      borderRadius: string;
      boxShadow: string;
    };
  }
  interface ThemeOptions {
    sidebar?: {
      background?: string;
      foreground?: string;
      primary?: string;
      primaryForeground?: string;
      accent?: string;
      accentForeground?: string;
      border?: string;
      ring?: string;
      sectionHeader?: string;
      userProfileBackground?: string;
    };
    card?: {
      background?: string;
      borderRadius?: string;
      boxShadow?: string;
    };
  }
}

const baseTheme: ThemeOptions = {
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => `
        * {
          border-color: ${theme.palette.divider};
        }
        body {
          background-color: ${theme.palette.background.default};
          color: ${theme.palette.text.primary};
        }
      `,
    },
  },
  shape: {
    borderRadius: 8, // 0.5rem = 8px
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  sidebar: {
    background: '#16213E', // deep blue
    foreground: '#FFFFFF', // white
    primary: '#3b82f6', // accent blue
    primaryForeground: '#FFFFFF',
    accent: '#3b82f6',
    accentForeground: '#FFFFFF',
    border: 'rgba(255,255,255,0.08)',
    ring: '#3b82f6',
    sectionHeader: 'rgba(255,255,255,0.4)',
    userProfileBackground: '#1B254B',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 2px 12px 0 rgba(16,30,54,0.08)',
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#3b82f6',
      contrastText:'#ffffff',
    },
    secondary: {
      main: '#3b82f6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
    divider: 'hsl(214.3 31.8% 91.4%)',
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#3b82f6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#16213E',
      paper: '#16213E',
    },
    text: {
      primary: '#ffffff',
    },
    divider: 'hsl(217.2 32.6% 17.5%)',
  },
});