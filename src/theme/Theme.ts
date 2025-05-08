
// --- THEME EXTENSIONS ---
// Extend MUI theme with custom properties for your app's design system
// Use these theme values in all your components for consistency

import { createTheme, ThemeOptions } from "@mui/material";

declare module '@mui/material/styles' {
  interface Theme {
    // Sidebar colors and styles
    sidebar: {
      background: string; // Use for sidebar background
      foreground: string; // Use for sidebar text/icons
      primary: string; // Use for active nav item/icon
      primaryForeground: string; // Use for active nav item text/icon
      accent: string; // Use for sidebar accent elements
      accentForeground: string; // Use for accent text/icons
      border: string; // Use for sidebar border
      ring: string; // Use for focus ring
      sectionHeader: string; // Use for section headers in sidebar
      userProfileBackground: string; // Use for user profile card in sidebar
      width: number; // Default sidebar width in px. Use in layouts (AppLayout, etc.)
    };
    // Card styles
    card: {
      background: string; // Use for card backgrounds
      borderRadius: string; // Use for card border radius
      boxShadow: string; // Use for card shadow
    };
    // Chart segment colors
    chart: {
      new: string; // Use for 'New' segment in pie/donut charts
      contacted: string; // Use for 'Contacted' segment
      qualified: string; // Use for 'Qualified' segment
      lost: string; // Use for 'Lost' segment
    };
    // Status chip/badge colors (for deals, tasks, etc.)
    status: {
      active: { bg: string; color: string }; // Use for 'Active' status
      atRisk: { bg: string; color: string }; // Use for 'At Risk' status
      won: { bg: string; color: string }; // Use for 'Won' status
      default: { bg: string; color: string }; // Use for other/default statuses
    };
    // Icon backgrounds (for stat cards, etc.)
    icon: {
      statCardBg: string; // Use for stat card icon background (transparent by default)
    };
  }
  interface ThemeOptions {
    sidebar?: Partial<Theme['sidebar']>;
    card?: Partial<Theme['card']>;
    chart?: Partial<Theme['chart']>;
    status?: Partial<Theme['status']>;
    icon?: Partial<Theme['icon']>;
  }
}

// --- BASE THEME ---
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
    borderRadius: 8, // Use for most containers/cards
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  sidebar: {
    background: '#16213E', // Deep blue for sidebar background
    foreground: '#FFFFFF', // White for sidebar text/icons
    primary: '#3b82f6', // Accent blue for active nav item/icon
    primaryForeground: '#FFFFFF',
    accent: '#3b82f6',
    accentForeground: '#FFFFFF',
    border: 'rgba(255,255,255,0.08)',
    ring: '#3b82f6',
    sectionHeader: 'rgba(255,255,255,0.4)',
    userProfileBackground: '#1B254B',
    width: 260, // Default sidebar width in px. Use in layouts (AppLayout, etc.)
  },
  card: {
    background: '#FFFFFF', // Use for card backgrounds
    borderRadius: '16px', // Use for card border radius
    boxShadow: '0 2px 12px 0 rgba(16,30,54,0.08)', // Use for card shadow
  },
  chart: {
    new: '#3B82F6', // Blue for 'New' leads
    contacted: '#10B981', // Green for 'Contacted' leads
    qualified: '#F97066', // Orange/red for 'Qualified' leads
    lost: '#6B7280', // Gray for 'Lost' leads
  },
  status: {
    active: { bg: 'rgba(34,197,94,0.12)', color: '#22C55E' }, // Soft green bg, green text
    atRisk: { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' }, // Soft red bg, red text
    won: { bg: 'rgba(59,130,246,0.12)', color: '#3B82F6' }, // Soft blue bg, blue text
    default: { bg: '#F3F4F6', color: '#6B7280' }, // Light gray bg, gray text
  },
  icon: {
    statCardBg: 'transparent', // Use for stat card icon background (transparent by default)
  },
};

// --- LIGHT THEME ---
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

// --- DARK THEME ---
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