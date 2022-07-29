import React from 'react';
import { MainContextProvider } from './contexts/MainContext';
import { FilterContextProvider } from './contexts/FilterContext';
import { ImageContextProvider } from './contexts/ImageContext';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
import Reviews from './pages/UserDashboard/Reviews';
import { ErrorContextProvider } from './contexts/ErrorContext';
import Paypal from './components/Payment/Paypal';
import PaymentSuccess from './pages/PaymentSuccess';
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
                    <Route path="parking/create" element={<AuthComponent><CreateParkingSpace/></AuthComponent>}></Route>
                    <Route path="parking/update" element={<AuthComponent><CreateParkingSpace/></AuthComponent>}></Route>
                    <Route path="parking/booking" element={<AuthComponent><CreateBooking/></AuthComponent>}></Route>
                    <Route path="all" element={<AuthComponent><ListViewParkingSpaces /></AuthComponent>}></Route>
                    <Route path="signup" element={<Signup />}></Route>
                    <Route path="review/create" element={<AuthComponent><CreateReview /></AuthComponent>}></Route>
                    <Route path="review/update" element={<AuthComponent><CreateReview/></AuthComponent>}></Route>

                    <Route path="about" element={<About />}></Route>
                    <Route path="/" element={<Results />}></Route>
                    {/* User Dashboard */}
                    <Route path="personal" element={<AuthComponent><Dashboard /></AuthComponent>}></Route>
                    <Route path="personal/bookings" element={<AuthComponent><Bookings /></AuthComponent>}></Route>
                    <Route path="personal/listings" element={<AuthComponent><Listings /></AuthComponent>}></Route>
                    <Route path="personal/reviews" element={<AuthComponent><Reviews /></AuthComponent>}></Route>
                    <Route path="pay" element={<AuthComponent><Paypal/></AuthComponent>}></Route>
                    <Route path="pay/success" element={<AuthComponent><PaymentSuccess/></AuthComponent>}></Route>

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
