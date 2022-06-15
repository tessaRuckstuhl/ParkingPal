import { FavoriteBorderOutlined, HeartBrokenOutlined } from '@mui/icons-material';
import React from 'react';
const Listing = (props) => {
  const { listing } = props;
  return (
    <div className="flex space-x-5 p-5">
        {/* listing image */}
      <img className="rounded" src="/garage.jpg" width={250} height={150}></img>
      {/* listing description */}
      <div className='flex-1 justify-between'>
        {/* Listing Title */}
        <div className='flex justify-between'>
          <div>
            <div className="text-lightGray text-sm">10 min upfront booking</div>
            <div className=" text-lg">Carport in St.-Anna-Straße</div>
          </div>
          <FavoriteBorderOutlined />
        </div>
        {/* Listing Properties */}
        <div className="text-lightGray text-sm w-1/2">
          24 hours max - Security Gate - Self check-in possible
        </div>
        {/* Review */}
        <div className="flex">
          <div>5.0 (318 reviews)</div>
          <div>10EUR /hour</div>
        </div>
        {/* {listing.formatted_address} *** lat and lang: ***
        {JSON.stringify(listing.geometry.location)} */}
      </div>
    </div>
  );
};

export default Listing;
