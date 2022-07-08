import React, { useEffect, useContext, useState } from 'react';
import Tile from '../../components/UserDashboard/Tile';
import { LocalOfferOutlined, GarageOutlined, AccountCircle } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { Buffer } from 'buffer';
import moment from 'moment';
import { MainContext } from '../../contexts/MainContext';
import AuthService from '../../services/auth.service';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const { jwt, setJwt } = useContext(MainContext);
  const [parsedData, setParsedData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setParsedData(JSON.parse(Buffer.from(jwt.split('.')[1], 'base64')));
      console.log(JSON.parse(Buffer.from(jwt.split('.')[1], 'base64')));
    } catch (error) {
      console.log(error);
      AuthService.logout();
      setJwt('');
      return navigate('/');
    }
  }, [jwt, navigate, setJwt]);
  return (
    <div className="flex flex-col justify-center items-center space-y-5 mt-5">
      <div className="w-4/5 p-2 border border-lighterGray rounded-2xl shadow-bar text-center grid grid-flow-row gap-3 grid-rows-3">
        <div>
          <div className=" mb-2 text-xl">{parsedData.firstName + ' ' + parsedData.surname}</div>{' '}
          <Divider />
        </div>
        <AccountCircle sx={{ fontSize: 40, justifySelf: 'center' }} />{' '}
        <div className="text-lightGray text-sm">
          {parsedData.username}
          <br />
          {`You joined ParkingPal on ${moment(parsedData?.createdAt).format('DD.MM.YYYY')}.`}
        </div>
        <Link to={'404'}>
          <div className="text-sm text-purple hover:underline hover:cursor-pointer">
            {/* {`VIEW ${title.toUpperCase()}`} <ChevronRight /> */}
          </div>
        </Link>
      </div>
      <div className="w-4/5 flex flex-row space-x-5">
        <Tile
          title="My bookings"
          link="/personal/bookings"
          description="Here you can view, edit and review your past bookings."
          Icon={GarageOutlined}
          ownerId={parsedData._id}
        />
        <Tile
          title="My listings"
          link="/personal/listings"
          description="Here you can create, update and delete listings"
          Icon={LocalOfferOutlined}
          ownerId={parsedData._id}
        />
      </div>
    </div>
  );
};

export default Dashboard;
