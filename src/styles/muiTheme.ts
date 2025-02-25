// src/styles/muiTheme.ts

import { createTheme } from '@mui/material/styles';

export const useMuiTheme = () => {
  return createTheme({
    typography: {
      fontWeightBold: 700,
      fontFamily: "'Inter', sans-serif",
      h1: {
        fontWeight: 800,
        fontSize: '3.5rem',
        fontFamily: "'Poppins', sans-serif", // Poppins para h1
      },
      h2: {
        fontWeight: 700,
        fontSize: '3rem',
        fontFamily: "'Poppins', sans-serif", // Poppins para h2
      },
      h3: {
        fontWeight: 700,
        fontSize: '2.5rem',
        fontFamily: "'Poppins', sans-serif", // Poppins para h3
      },
      h4: {
        fontWeight: 700,
        fontSize: '2rem',
        fontFamily: "'Poppins', sans-serif", // Poppins para h4
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.5rem',
        fontFamily: "'Poppins', sans-serif", // Poppins para h5
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.2rem',
        fontFamily: "'Poppins', sans-serif", // Poppins para h6
      },
    },
    palette: {
      primary: {
        main: '#1976D2',
      },
      secondary: {
        main: '#6beeff',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '4px',
          },
          containedPrimary: {
            color: '#FFFFFF',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            color: '#333333',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
          },
        },
      },
    },
  });
};