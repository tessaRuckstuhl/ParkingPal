import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Button from '@mui/material/Button';
import {Buffer} from 'buffer';

const Dash = () => {
  const { jwt, setJwt } = useContext(MainContext);
  const [parsedData, setParsedData] = useState('');
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
      <h1>Dashboard...</h1>
      <div>
        <pre>{JSON.stringify(parsedData, null, 2)}</pre>
      </div>

      <Button onClick={() => logout()} fullWidth variant="contained" color="secondary">
        Logout
      </Button>
    </div>
  );
};

export default Dash;
