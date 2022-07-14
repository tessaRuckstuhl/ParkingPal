import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PSService from '../services/parkingSpace.service';
import moment from 'moment';
const PaymentSuccess = () => {
  const { state } = useLocation();
  const [bookedParking, setBookedParking] = useState(null);

  useEffect(() => {
    fetchBookedParkingSpace();
  }, []);

  const fetchBookedParkingSpace = async () => {
    try {
      const parkingSpace = await PSService.listParkingSpace(state.booking.parkingSpace);
      setBookedParking(parkingSpace.data);
    } catch {
      console.log(error);
    }
  };
  return (
    <div className="mt-20 text-center flex flex-col items-center">
      <div className="text-3xl font-bold mb-3 text-purple">Awesome!</div>
      <div className=" text-lg"> Your payment {`(${state?.booking?.price} €) `}was successful.</div>
      <div className="shadow-bar rounded-3xl border border-lighterGray w-[60%] p-5 text-center m-10">
        <div className="text-lg">
          <div className="text-2xl font"> Booking Details</div>
          <br />
          <span className="font-bold ">{bookedParking?.name}</span> at{' '}
          <span className="font-bold ">{bookedParking?.formattedAddress}</span>
          <br />
          <span className="font-bold">
            {moment(state.booking.startDate).format('DD.MM.YYYY,  HH:MM')}
          </span>{' '}
          to{' '}
          <span className="font-bold">
            {moment(state.booking.endDate).format('DD.MM.YYYY,  HH:MM')}
          </span>
        </div>
      </div>
      <div className="text-xl mb-3">
        Find and book your next parking space{' '}
        <Link to="/">
          <span className="text-purple hover:underline">here</span>
        </Link>{' '}
        or go to your personal{' '}
        <Link to="/personal">
          <span className="text-purple hover:underline">dashboard</span>
        </Link>
        .
      </div>
    </div>
  );
};

export default PaymentSuccess;
