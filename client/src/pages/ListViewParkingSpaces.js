
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingSpaceService from '../services/parkingSpace.service';

import {Card,Button} from '@mui/material';


const ListViewParkingSpaces = () => {
    const [parkingSpaces, setParkingSpaces] = useState([""]);

    const navigate = useNavigate();



    useEffect(async () => {
        const result = await ParkingSpaceService.listAllPS();
        setParkingSpaces(result.data);
    }, []);



    return (
        <div className="ml-2">
            <Button
                variant="contained"
                color="primary"
                onClick={
                    () => navigate('/parkingSpaceCreation')}
            >Create Parking Space</Button>
            <div>{parkingSpaces.map((parkingSpace=> {return <Card className="mt-4">{JSON.stringify(parkingSpace)}</Card>}
            ))}</div>
        </div>
        
    );
};

export default ListViewParkingSpaces;
