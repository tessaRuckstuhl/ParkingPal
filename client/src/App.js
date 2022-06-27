import React from 'react';
import { MainContextProvider } from './contexts/MainContext';
import { FilterContextProvider } from './contexts/FilterContext';
import { ImageContextProvider } from './contexts/ImageContext';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dash from './pages/Dash';
import AuthComponent from './services/AuthComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import mainTheme from './theme/mainTheme';
import Default from './layout/Default';
import CreateParkingSpace from './pages/CreateParkingSpace';
import ListViewParkingSpaces from './pages/ListViewParkingSpaces';
import PageNotFound from './pages/404';
import Results from './pages/Results';
import Bar from './components/Filter/Bar';
const App = () => {
  // main parkingpal theme
  const theme = createTheme(mainTheme);
  return (
    <div className="h-full">
      {/* mui theme */}
      <ThemeProvider theme={theme}>
        {/* token context  */}
        <MainContextProvider>
          {/* filter context */}
          <FilterContextProvider>
            {/* image context */}
            <ImageContextProvider>

            
            {/* Default Layout, includes header and footer */}
            <Default>
              {/* Routes */}
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="parking/create" element={<CreateParkingSpace />}></Route>
                <Route path="all" element={<ListViewParkingSpaces />}></Route>
                <Route path="signup" element={<Signup />}></Route>
                <Route
                  path="dashboard"
                  element={
                    <AuthComponent>
                      <Dash />
                    </AuthComponent>
                  }
                ></Route>
                <Route path="map" element={<Results />}></Route>

                {/* matches anything except the above */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Default>
            </ImageContextProvider>
          </FilterContextProvider>
        </MainContextProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
