import { FavoriteBorderOutlined, StarBorder } from '@mui/icons-material';
import { Divider } from '@mui/material';
import React from 'react';

const Listing = (props) => {
  const { listing, setCenter } = props;

  const onClick = (e) => {
    setCenter({lat:listing.lat, lng:listing.lng})
  }
  return (
    <div id={listing._id} className="flex space-x-5 p-5 bg-white" onClick={() => onClick(listing)}>
      {/* Listing image */}
      <img className="rounded" src="/garage.jpg" width={250} height={150}></img>
      {/* Listing description */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Listing Title */}
        <div className="flex justify-between">
          <div>
            <div className="text-lightGray text-sm">10 min upfront booking - TODO</div>
            <div className=" text-lg">{listing.name}</div>
          </div>
          <FavoriteBorderOutlined />
        </div>
        <Divider sx={{ width: '30%' }} />
        {/* Listing Properties */}
        <div className="text-lightGray text-sm w-1/2">24 hours max · Security Gate - TODO </div>
        <Divider sx={{ width: '30%' }} />

        {/* Review */}
        <div className="flex justify-between">
          <div className='flex space-x-1'>
            5.0
            <StarBorder />
            (318 reviews) - TODO
          </div>
          <div>{listing.basePrice}€ /hour</div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
