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
    background: 'hsl(var(--sidebar-background))',
    foreground: 'hsl(var(--sidebar-foreground))',
    primary: 'hsl(var(--sidebar-primary))',
    primaryForeground: 'hsl(var(--sidebar-primary-foreground))',
    accent: 'hsl(var(--sidebar-accent))',
    accentForeground: 'hsl(var(--sidebar-accent-foreground))',
    border: 'hsl(var(--sidebar-border))',
    ring: 'hsl(var(--sidebar-ring))',
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: 'hsl(222.2 47.4% 11.2%)',
      contrastText: 'hsl(210 40% 98%)',
    },
    secondary: {
      main: 'hsl(210 40% 96.1%)',
      contrastText: 'hsl(222.2 47.4% 11.2%)',
    },
    background: {
      default: 'hsl(0 0% 100%)',
      paper: 'hsl(0 0% 100%)',
    },
    text: {
      primary: 'hsl(222.2 84% 4.9%)',
    },
    divider: 'hsl(214.3 31.8% 91.4%)',
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: 'hsl(210 40% 98%)',
      contrastText: 'hsl(222.2 47.4% 11.2%)',
    },
    secondary: {
      main: 'hsl(217.2 32.6% 17.5%)',
      contrastText: 'hsl(210 40% 98%)',
    },
    background: {
      default: 'hsl(222.2 84% 4.9%)',
      paper: 'hsl(222.2 84% 4.9%)',
    },
    text: {
      primary: 'hsl(210 40% 98%)',
    },
    divider: 'hsl(217.2 32.6% 17.5%)',
  },
});