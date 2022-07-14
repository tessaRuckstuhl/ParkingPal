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
import CreateParkingSpace from './pages/CreateParkingSpace'
import ListViewParkingSpaces from './pages/ListViewParkingSpaces'
import CreateReview from './pages/CreateReview'
import CreateBooking from './pages/CreateBooking'
import About from './pages/About'
import PageNotFound from './pages/404';
import Results from './pages/Results';
import Dashboard from './pages/UserDashboard/Dashboard';
import Bookings from './pages/UserDashboard/Bookings';
import Listings from './pages/UserDashboard/Listings';
import { ErrorContextProvider } from './contexts/ErrorContext';
const App = () => {
  // main parkingpal theme
  const theme = createTheme(mainTheme);
  return (
    <div className="h-full">
      {/* mui theme */}
      <ThemeProvider theme={theme}>
        {/* token context  */}
        <MainContextProvider>
          {/* error context */}
          <ErrorContextProvider>
            {/* filter context */}
            <FilterContextProvider>
              <ImageContextProvider>
                {/* Default Layout, includes header and footer */}
                <Default>
                  {/* Routes */}
                  <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="parking/create" element={<CreateParkingSpace />}></Route>
                    <Route path="parking/booking" element={<CreateBooking />}></Route>
                    <Route path="all" element={<ListViewParkingSpaces />}></Route>
                    <Route path="signup" element={<Signup />}></Route>
                    <Route path="review/create" element={<CreateReview />}></Route>
                    <Route path="about" element={<About />}></Route>
                    <Route
                      path="dashboard"
                      element={
                        <AuthComponent>
                          <Dash />
                        </AuthComponent>
                      }
                    ></Route>
                    <Route path="/" element={<Results />}></Route>
                    {/* User Dashboard */}
                    <Route path="personal" element={<Dashboard />}></Route>
                    <Route path="personal/bookings" element={<Bookings />}></Route>
                    <Route path="personal/listings" element={<Listings />}></Route>

                    {/* matches anything except the above */}
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Default>
              </ImageContextProvider>
            </FilterContextProvider>
          </ErrorContextProvider>
        </MainContextProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
