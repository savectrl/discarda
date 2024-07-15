import React from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/styles';

import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Auth from '../Auth/Auth';
import { signIn } from '../../actions';
import createHashHistory from '../../history';



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


function App() {
  // Dispatch
  const dispatch = useDispatch();

  // Check local storage if have login info
  // Dispatch sign in action with our userId and redirect to dashboard
  const checkLocalStorageAuth = () => {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      dispatch(signIn(user));
      createHashHistory.push('/dashboard');
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <HashRouter>
          {checkLocalStorageAuth()}
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/" exact component={Auth} />
        </HashRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;

const theme = createTheme(adaptV4Theme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '14px',
        backgroundColor: 'black'
      }
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: '#202225',
        color: 'white'
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#36393E',
        position: 'absolute'
      }
    }
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#7289da'
    },
    secondary: {
      main: '#3ca374'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600
  }
}));
