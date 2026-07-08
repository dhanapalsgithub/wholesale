import { createTheme } from '@mui/material/styles';

export const buildTheme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#13a34a', light: '#6ee7a8', dark: '#087333' },
      secondary: { main: '#00bcd4' },
      background: {
        default: darkMode ? '#06140d' : '#effcf4',
        paper: darkMode ? 'rgba(9, 28, 18, 0.72)' : 'rgba(255, 255, 255, 0.7)',
      },
    },
    shape: { borderRadius: 18 },
    typography: {
      fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'].join(','),
      h1: { fontWeight: 800 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 800 },
      h4: { fontWeight: 800 },
      h5: { fontWeight: 800 },
      h6: { fontWeight: 800 },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.68), rgba(255,255,255,0.24))',
            backdropFilter: 'blur(22px) saturate(150%)',
            border: '1px solid rgba(255,255,255,0.32)',
            boxShadow: '0 24px 80px rgba(8, 115, 51, 0.16)',
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 999, textTransform: 'none', fontWeight: 800 } },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.72), rgba(255,255,255,0.34))',
            backdropFilter: 'blur(20px)',
          },
        },
      },
    },
  });
