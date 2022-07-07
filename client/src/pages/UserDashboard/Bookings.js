import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';

const Bookings = () => {
  return (
    <div className='p-3 m-3'>
      <Link to="/personal">
        <ArrowBackIos sx={{ fontSize: 20 }} />
        Dashboard
      </Link>
      <Divider sx={{ mb: 3, mt: 2 }} />

      <div className="text-xl">My bookings</div>
      <div>
        TODO...
      </div>
    </div>
  );
};

export default Bookings;
