
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingSpaceService from '../services/parkingSpace.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Grid, Paper} from '@mui/material/';
import { styled } from '@mui/material/styles';

const AddParkingSpace = () => {
  const [parkingSpaceName, setParkingSpaceName] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [dayPrice, setDayPrice] = useState('');
  const [longTermStayPrice, setLongTermStayPrice] = useState('');

  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'parkingspacename':
        setParkingSpaceName(event.target.value);
        break;
      case 'location':
        setLocation(event.target.value);
        break;
      case 'size':
        setSize(event.target.value);
        break;
      case 'dayPrice':
        setDayPrice(event.target.value);
        break;
      case 'basePrice':
        setBasePrice(event.target.value);
        break;
      case 'longTermStayPrice':
        setLongTermStayPrice(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const parkingSpace = {
        name: parkingSpaceName,
        location: location,
        size: size,
        basePrice: basePrice
      };
      const response = await ParkingSpaceService.create(parkingSpace);
    } catch (error) {
    }
  };

  useEffect(() => {

  }, []);
  return (
    <div >
      <div style={{ marginBottom: 30 }}><h1><b>Welcome to the Creator Dashboard</b></h1></div>
      <Button  
        variant="contained"
        color="primary"
        onClick={()=>navigate('/all')}
      >All Parking Spaces</Button>
      <form noValidate onSubmit={(e) => handleSubmit(e)}>

        <h1>Step 1: Name your parking place</h1>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="parkingspacename"
          label="Parking Space Name"
          name="parkingspacename"
          value={parkingSpaceName}
          autoFocus
          onChange={(e) => handleChange(e)}
        />
        <h1 style={{marginBottom: 10}}>Step 2: Upload photos of your parking space and its environment</h1>
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <Item style={{height: 100}}>Photo Placeholder</Item>
          </Grid>
          <Grid item xs={6}>
          <Item style={{height: 100}}>Photo Placeholder</Item>
          </Grid>
        </Grid>
        <div style={{textAlign: 'center', marginTop:20}}><Button variant="contained" color="primary">Edit images</Button></div>
        <h1 style={{ marginBottom: 10 }}>Step 3: Provide additional information to help</h1>
        <Grid container spacing={3}>
          <Grid item xs={4}>
          <Item>Parking Properties</Item>
          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="dummy"
          label="dummy"
          id="dummy"
          value={null}
          onChange={(e) => handleChange(e)}
        />
          </Grid>
          <Grid item xs={4}>
            <Item>Size</Item>
            <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="size"
          label="Parking Space Size"
          id="size"
          value={size}
          onChange={(e) => handleChange(e)}
        />
          </Grid>
          <Grid item xs={4}>
          <Item>Cancellation and Access</Item>
          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="dummy"
          label="dummy"
          id="dummy"
          value={null}
          onChange={(e) => handleChange(e)}
        />
          </Grid>
        </Grid>
        
        <h1>Step 4: Edit your description</h1>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="description"
          label="Description"
          id=""
          value={null}
          onChange={(e) => handleChange(e)}
        />
        <h1>Step 5: When is your parking place available?</h1>
        <h1>Step 6: Set a price</h1>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="basePrice"
          label="Base Price"
          id="baseprice"
          value={basePrice}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="dayPrice"
          label="Day Price"
          id="dayPrice"
          value={dayPrice}
          onChange={(e) => handleChange(e)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="longTermStayPrice"
          label="Long Term Stay Price"
          id="longTermStayPrice"
          value={longTermStayPrice}
          onChange={(e) => handleChange(e)}
        />
        <h1>Step 7: Enter the address</h1>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="location"
          label="Location"
          id="location"
          value={location}
          onChange={(e) => handleChange(e)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Create Parking Space
        </Button>
      </form>
    </div>
  );
};

export default AddParkingSpace;
