import React from 'react';
import { MainContextProvider } from './contexts/MainContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dash from './pages/Dash';
import AuthComponent from './services/AuthComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import mainTheme from './theme/mainTheme';
import Default from './layout/Default';

const App = () => {
  // main parkingpal theme
  const theme = createTheme(mainTheme);
  return (
    <div style={{ height: '100vh' }}>
      <ThemeProvider theme={theme}>
        <MainContextProvider>
          <Default>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route
                path="dashboard"
                element={
                  <AuthComponent>
                    <Dash />
                  </AuthComponent>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
          </Default>
        </MainContextProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
