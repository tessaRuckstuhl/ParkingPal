import { Button, Divider, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowBackIos, DeleteOutline } from '@mui/icons-material';
import { useErrorSnack } from '../../contexts/ErrorContext';
import BService from '../../services/booking.service';
import PSService from '../../services/parkingSpace.service';
import moment from 'moment';
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { showSnack } = useErrorSnack();
  const location = useLocation();
  const { ownerId } = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    getBookings(ownerId);
  }, []);

  const getBookings = async () => {
    try {
      // ToDo beautify...
      const res = await BService.getAllBooking({ guestId: ownerId });
      const bookings = res.data;
      for (let i = 0; i < bookings.length; i++) {
        const matchedParkingSpace = await PSService.listParkingSpace(bookings[i].parkingSpace);
        bookings[i].parkingSpaceProps = matchedParkingSpace.data;
      }
      setBookings(bookings);
    } catch (error) {
      console.log(error);
      showSnack('An error occurred', 'error');
    }
  };

  const reviewBooking = (bookingId) => {
    navigate(`/review/create?bookingId=${bookingId}`, { bookingId: bookingId });
  };

  return (
    <div className="p-3 m-3">
      <Link to="/personal">
        <ArrowBackIos sx={{ fontSize: 20 }} />
        Dashboard
      </Link>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <div className="flex justify-between mb-5">
        <div className="text-3xl font-bold">My bookings</div>
      </div>

      {bookings.length > 0 ? (
        bookings.map((b) => (
          <div className="items-center border-lighterGray rounded-l shadow-bar p-2 flex justify-between">
            {`${moment(b.startDate).format('DD.MM.YYYY,  HH:MM')} to ${moment(b.endDate).format(
              'DD.MM.YYYY, HH:MM'
            )} in ${b.parkingSpaceProps?.name} at ${b.parkingSpaceProps?.formattedAddress}`}
            <Button onClick={() => reviewBooking(b._id)}>Review</Button>{' '}
          </div>
        ))
      ) : (
        <div className="mt-20 text-center ">
          <div className="text-3xl font-semibold mb-5">Nothing here yet.</div> Find and book your
          first parking space{' '}
          <Link to="/">
            <span className="text-purple hover:underline">here</span>
          </Link>
          .
        </div>
      )}
    </div>
  );
};

export default Bookings;
