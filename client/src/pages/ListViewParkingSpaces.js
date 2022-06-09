
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingSpaceService from '../services/parkingSpace.service';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';


const ListViewParkingSpaces = () => {
    const [parkingSpaces, setParkingSpaces] = useState([]);

    const navigate = useNavigate();



    useEffect(() => {
        showAll()
    }, []);

    const showAll = async () => {
        const result = await ParkingSpaceService.getAllPS();
        setParkingSpaces(result);
    }


    return (
        <div >
            <Button
                variant="contained"
                color="primary"
                onClick={
                    () => navigate('/addPS')}
            >Create Parking Space</Button>
        </div>
    );
};

export default ListViewParkingSpaces;
