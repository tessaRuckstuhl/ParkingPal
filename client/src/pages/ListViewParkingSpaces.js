
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingSpaceService from '../services/parkingSpace.service';

import {Card,Button} from '@mui/material';


const ListViewParkingSpaces = () => {
    const [parkingSpaces, setParkingSpaces] = useState([""]);

    const navigate = useNavigate();



    useEffect(async () => {
        const result = await ParkingSpaceService.listAllParkingSpaces();
        setParkingSpaces(result.data);
    }, []);



    return (
        <div className="ml-2">
            <Button
                variant="contained"
                color="primary"
                onClick={
                    () => navigate('/parking/create')}
            >Create Parking Space</Button>
            <div>{parkingSpaces.map((parkingSpace,k)=> {return <Card key={k} className="mt-4">{JSON.stringify(parkingSpace)}</Card>}
            )}</div>
        </div>
        
    );
};

export default ListViewParkingSpaces;
