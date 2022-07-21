import React from 'react';
import ParkingSpaceForm from '../components/Forms/ParkingSpaceForm';
//required otherwise it will redirect to page
import AuthComponent from '../services/AuthComponent';

const CreateParkingSpace = () => {
  return (
    <AuthComponent>
    <ParkingSpaceForm/>
    </AuthComponent>
  )
} 
  

export default CreateParkingSpace;
