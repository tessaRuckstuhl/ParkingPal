import { Button, Divider, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PSService from '../../services/parkingSpace.service';
import { ArrowBackIos, DeleteOutline } from '@mui/icons-material';
import { useErrorSnack } from '../../contexts/ErrorContext';

const Listings = () => {
  const [ownerParkingSpaces, setOwnerParkingSpaces] = useState([]);
  const { showSnack } = useErrorSnack();
  const location = useLocation();
  const { ownerId } = location.state;
  useEffect(() => {
    getOwnersParkingSpaces(ownerId);
  }, []);

  const getOwnersParkingSpaces = async () => {
    try {
      const parkingSpaces = await PSService.listAllParkingSpaces({ ownerId: ownerId });
      setOwnerParkingSpaces(parkingSpaces.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteParkingSpace = async (id) => {
    try {
      const deleted = await PSService.delete(id);
      getOwnersParkingSpaces();
      showSnack('Parking space deleted.', 'success');
    } catch (error) {
      showSnack('Something went wrong.', 'error');
      console.log(error);
    }
  };
  return (
    <div className="p-3 m-3">
      <Link to="/personal">
        <ArrowBackIos sx={{ fontSize: 20 }} />
        Dashboard
      </Link>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <div className="flex justify-between mb-5">
        <div className="text-3xl font-bold">My listings</div>
        <Link to="/parking/create">
          <Button variant="contained" color="primary">
            Create new listing
          </Button>
        </Link>
      </div>

      {ownerParkingSpaces.length > 0 ? (
        ownerParkingSpaces.map((parking) => (
          <div className="items-center border-lighterGray rounded-l shadow-bar p-2 flex justify-between">
            {`${parking.name} in ${parking.formattedAddress}`}{' '}
            <IconButton onClick={() => deleteParkingSpace(parking._id)}>
              <DeleteOutline />
            </IconButton>{' '}
          </div>
        ))
      ) : (
        <div className="mt-20 text-center ">
          <div className="text-3xl font-semibold mb-5">Get started on ParkingPal</div>Got a parking space to
          share? <br/>Earn money as an ParkingPal host. Get started by creating a listing.
        </div>
      )}
    </div>
  );
};

export default Listings;