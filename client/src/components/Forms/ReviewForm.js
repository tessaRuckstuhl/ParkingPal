
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingSpaceService from '../../services/parkingSpace.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Divider, Rating } from '@mui/material/';
import { styled } from '@mui/material/styles';

const ReviewForm = () => {
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
      const user = parseJwt(localStorage.getItem('token'))
      const parkingSpace = {
        name: parkingSpaceName,
        location: location,
        size: size,
        basePrice: basePrice,
        owner: user
      };
      const response = await ParkingSpaceService.create(parkingSpace);
    } catch (error) {
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {

  }, []);
  return (
    <div className="flex flex-col items-center ">
      <div className="w-3/4">
        <div className="mb-6 text-xl">
          <b>Rate your parking place experience</b>
        </div>
        <div className="mb-6 text-xl">
          <p>Your parking space booking came just to an end.<br />Now take a minute to reflect on the parking place and leave a quick review. </p>
        </div>
        <div>
          <Divider>

          </Divider>
        </div>
        <div>
          <p>You booked this parking place provides by<br />Alexander Mock. Adresse Platzhalter. Willkürliche Zeitdauer </p>

          <p>Here is a short summary of what was promised and expected</p>

          <b>Placeholder Booking summary</b>
        </div>
        <Divider>

        </Divider>

        <div>
          <div className="mb-6 text-xl">
            <b>Rate your experience</b> <br />
            <p> Please rate your parking place experience in overall satisfaction, accesability, service by the host and location</p>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Item>Neighborhood</Item>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </Grid>
            <Grid item xs={4}>
              <Item>Access</Item>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </Grid>
            <Grid item xs={4}>
              <Item>Location</Item>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Item>Communication</Item>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </Grid>
            <Grid item xs={4}>
              <Item>Accuracy</Item>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </Grid>
            <Grid item xs={4}>
              <Item>Value</Item>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </Grid>
          </Grid>
        </div>
        <Divider>

        </Divider>
        <div>
          <div className="mb-6 text-xl">
            <b>Describe your experience</b>
            <p> Help others by describing your experience</p>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="parkingspacename"
            label="Description"
            name="reviewdescription"
            style = {{height: 100}}
            value={parkingSpaceName}
            autoFocus
            onChange={(e) => handleChange(e)}
          />

        </div>

        <form className="text-3x2 font-bold mb-7" noValidate onSubmit={(e) => handleSubmit(e)}>

          <p>Step 1: Name your parking place</p>
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
          <b>Step 2: Upload photos of your parking space and its environment</b>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item style={{ height: 100 }}>Photo Placeholder</Item>
            </Grid>
            <Grid item xs={6}>
              <Item style={{ height: 100 }}>Photo Placeholder</Item>
            </Grid>
          </Grid>
          <p>Step 3: Provide additional information to help</p>
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

          <p>Step 4: Edit your description</p>
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
          <p>Step 5: When is your parking place available?</p>
          <p>Step 6: Set a price</p>
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
          <p>Step 7: Enter the address</p>
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
          <div className="mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/all')}
            >All Parking Spaces</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
