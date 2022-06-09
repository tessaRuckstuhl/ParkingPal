
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';


const ListViewParkingSpaces = () => {
    const [parkingSpaces, setParkingSpaces] = useState('');

    const navigate = useNavigate();



    useEffect(() => {
    }, []);

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
