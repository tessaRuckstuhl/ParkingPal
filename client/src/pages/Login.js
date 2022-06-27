import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/Forms/LoginForm';
const Login = () => {
  return (
    <>
      <div className='flex flex-col'>
        <div className='text-lg'>Temporary Navigation Tree... Add your page here...</div>
        <Link to="create/booking"><div className='hover:underline'>Create a new booking</div></Link>
        <Link to="map"><div className='hover:underline'>View listings with map view</div> </Link>
      </div>
      <LoginForm />
    </>
  );
};

export default Login;
