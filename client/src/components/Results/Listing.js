import React, { useState } from 'react';
import { FavoriteBorderOutlined, Favorite, StarBorder, LocationOn } from '@mui/icons-material';
import { Divider, IconButton, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Listing = (props) => {
  const { listing, setCenter } = props;
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
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

  const viewListing = () => {
    navigate(`/parking/booking?parkingId=${listing._id}`);
  };

  return (
    <div
      id={listing._id}
      className="flex space-x-3 p-3 bg-white  "
      onMouseEnter={() => recenter(listing)}
    >
      {/* Listing image Apsect Ratio 4:3 */}
      {listing.images[0] ? (
        <img
          className="rounded object-cover w-[190px] h-[143px]"
          src={`${process.env.REACT_APP_API_URL}images/${listing.images[0]}`}
          width={190}
          height={143}
        ></img>
      ) : (
        <img
          className="rounded  object-cover w-[190px] h-[143px]"
          src={`/img/image-not-available.jpg`}
          width={190}
          height={143}
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
            <a onClick={() => viewListing()}>
              <div className="text-xl hover:underline hover:cursor-pointer">{listing.name}</div>
            </a>
            <div className="text-sm flex items-center space-x-1">
              <span>
                <LocationOn sx={{ fontSize: '.75rem' }} />
              </span>
              <span> {listing.formattedAddress}</span>
            </div>
          </div>
          <div>
            <IconButton
              onClick={() => {
                setLiked(!liked);
              }}
            >
              {liked ? <Favorite color="primary" /> : <FavoriteBorderOutlined />}
            </IconButton>
          </div>
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
            {listing.reviewStats.amount > 0 && (
              <span>{listing.reviewStats.averageOverallRating}</span>
            )}
            {listing.reviewStats.amount > 0 && (
              <span>
                <Rating
                  sx={{ color: '#6F11F2' }}
                  size="small"
                  defaultValue={parseFloat(listing.reviewStats?.averageOverallRating) || 0}
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
