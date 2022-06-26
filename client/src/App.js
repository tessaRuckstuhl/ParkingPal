import React from 'react';
import { MainContextProvider } from './contexts/MainContext';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dash from './pages/Dash';
import AuthComponent from './services/AuthComponent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import mainTheme from './theme/mainTheme';
import Default from './layout/Default';
import CreateParkingSpace from './pages/CreateParkingSpace'
import Booking from './pages/Booking'
import CreateReview from './pages/CreateReview'
import ListViewParkingSpaces from './pages/ListViewParkingSpaces'

import PageNotFound from './pages/404';
const App = () => {
  // main parkingpal theme
  const theme = createTheme(mainTheme);
  return (
    <div className='h-full'>
      {/* mui theme */}
      <ThemeProvider theme={theme}>
        {/* token context  */}
        <MainContextProvider>
            {/* Default Layout, includes header and footer */}
            <Default>
              {/* Routes */}
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="parking/create" element={<CreateParkingSpace />}></Route>
                <Route path="parking/booking" element={<Booking />}></Route>
                <Route path="all" element={<ListViewParkingSpaces/>}></Route>
                <Route path="review/create" element={<CreateReview/>}></Route> // Jakob
                <Route path="signup" element={<Signup />}></Route>
                <Route
                  path="dashboard"
                  element={
                    <AuthComponent>
                      <Dash />
                    </AuthComponent>
                  }
                ></Route>
                {/* matches anything except the above */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Default>
        </MainContextProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
