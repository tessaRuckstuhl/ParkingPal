import { FavoriteBorderOutlined, StarBorder, LocationOn } from '@mui/icons-material';
import { Divider } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Listing = (props) => {
  const { listing, setCenter } = props;

  const recenter = (e) => {
    setCenter({ lat: listing.lat, lng: listing.lng });
  };
  return (
    <div
      id={listing._id}
      className="flex space-x-5 p-5 bg-white  "
      onMouseEnter={() => recenter(listing)}
    >
      {/* Listing image */}
      <img className="rounded" src="/temp/garage.jpg" width={250} height={150}></img>
      {/* Listing description */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Listing Title */}
        <div className="flex justify-between ">
          <div>
            <div className="text-lightGray text-sm">10 min upfront booking - TODO</div>
            <Link to={'/404'}>
              <div className="text-lg hover:underline hover:cursor-pointer">{listing.name}</div>
            </Link>
            <div className="text-[.75rem] flex items-center ">
              <LocationOn className="mr-1" sx={{ fontSize: '.75rem' }} />
              {listing.formattedAddress}
            </div>
          </div>
          <FavoriteBorderOutlined />
        </div>
        <Divider sx={{ width: '30%' }} />
        {/* Listing Properties */}
        <div className="text-lightGray text-sm w-1/2">24 hours max · Security Gate - TODO </div>
        <Divider sx={{ width: '30%' }} />

        {/* Review */}
        <div className="flex justify-between">
          <div className="flex space-x-1">
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