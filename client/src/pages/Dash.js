import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Button from '@mui/material/Button';
import {Buffer} from 'buffer';
import { Link } from 'react-router-dom';



const Dash = () => {
  const { jwt, setJwt } = useContext(MainContext);
  const [parsedData,setParsedData] = useState('')
  const navigate = useNavigate();
  const logout = () => {
    AuthService.logout();
    setJwt('');
    return navigate('/');
  };
  useEffect(() => {
    try {
      setParsedData(JSON.parse(Buffer.from(jwt.split('.')[1], 'base64')));
    } catch (error) {
      console.log(error)
      AuthService.logout();
      setJwt('');
      return navigate('/');
    }
  }, [jwt, navigate, setJwt]);
  return (
    <div>
      <div>
        <pre>You are logged in</pre>
        <div className='text-lg'>Temporary Navigation Tree... Add your page here...</div>
        <br/>
        <Link to="/parking/create"><div className='hover:underline'>/parking/create - Create a new parking space listing</div></Link>
        <Link to="/map"><div className='hover:underline'>/map - View listings with map view</div> </Link>
        <Link to="/personal"><div className='hover:underline'>/personal - User Dashboard</div> </Link>

      </div>
      <Button onClick={() => logout()} fullWidth variant="contained" color="secondary">
        Logout
      </Button>
    </div>
  );
};

export default Dash;
