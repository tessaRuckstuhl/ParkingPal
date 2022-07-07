import React from 'react';
import { FavoriteBorderOutlined, StarBorder, LocationOn } from '@mui/icons-material';
import { Divider, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const Listing = (props) => {
  const { listing, setCenter } = props;
  const recenter = (e) => {
    setCenter({ lat: listing.lat, lng: listing.lng });
  };
  const buildFormattedPropertiesString = (properties) => {
    if (properties) {
      let str = '';
      Object.keys(properties).map((key, index) => {
        if (properties[key]) {
          let subStr = key.replaceAll('_', ' ');
          subStr = subStr.charAt(0).toUpperCase() + subStr.slice(1);
          if (str == '') {
            str += subStr;
          } else {
            str += ' · ' + subStr;
          }
        }
      });
      if (str.length > 0) {
        return str;
      } else {
        return 'No additional information to display...';
      }
    } else {
      return 'No additional information to display...';
    }
  };

  return (
    <div
      id={listing._id}
      className="flex space-x-5 p-3 bg-white  "
      onMouseEnter={() => recenter(listing)}
    >
      {/* Listing image */}
      {listing.images[0] ? (
        <img
          className="rounded object-contain"
          src={`http://localhost:3001/api/images/${listing.images[0]}`}
          width={200}
          height={150}
        ></img>
      ) : (
        <img
          className="rounded object-contain"
          src={`/img/image-not-available.jpg`}
          width={200}
          height={150}
        ></img>
      )}
      {/* Listing description */}
      <div className="flex-1 flex flex-col justify-between text-sm  space-y-1">
        {/* Listing Title */}
        <div className="flex justify-between ">
          <div>
            <div className="text-lightGray">
              {buildFormattedPropertiesString(listing.properties?.cancellation_and_access)}
            </div>
            <Link to={'/404'}>
              <div className="text-xl hover:underline hover:cursor-pointer">{listing.name}</div>
            </Link>
            <div className="text-sm flex items-center space-x-1">
              <span>
                <LocationOn sx={{ fontSize: '.75rem' }} />
              </span>
              <span> {listing.formattedAddress}</span>
            </div>
          </div>
          <FavoriteBorderOutlined />
        </div>
        <Divider sx={{ width: '30%' }} />
        {/* Listing Properties */}
        <div className="text-lightGray w-2/3">
          {buildFormattedPropertiesString(listing.properties?.parking)}
        </div>
        <Divider sx={{ width: '30%' }} />

        {/* Review */}
        <div className="flex justify-between">
          <div className="flex space-x-1 ">
            {listing.reviewStats.amount > 0 && <span>{listing.reviewStats.averageRating}</span>}
            {listing.reviewStats.amount > 0 && (
              <span>
                <Rating
                  sx={{ color: '#6F11F2' }}
                  size="small"
                  defaultValue={listing.reviewStats.averageRating}
                  readOnly
                  precision={0.1}
                />
              </span>
            )}
            <span>({listing.reviewStats.amount} reviews)</span>
          </div>
          <div>
            <span className="font-bold">{listing.basePrice}€ </span>
            <span>/hour</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
