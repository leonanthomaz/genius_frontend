import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/globalStyles'; 
import { useMuiTheme } from './styles/muiTheme';
import { theme } from './styles/theme'; 
import { GlobalProvider } from './contexts/GlobalContext.tsx'; 

const Root = () => {
  return (
    <MainApp />
  );
};

const MainApp = () => {
  const muiTheme = useMuiTheme();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <GlobalProvider>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </GlobalProvider>
        </Router>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);
