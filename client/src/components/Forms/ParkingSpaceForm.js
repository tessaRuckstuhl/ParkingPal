
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingSpaceService from '../../services/parkingSpace.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper } from '@mui/material/';
import { styled } from '@mui/material/styles';
import ImageUploaderForm from './ImageUploaderForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const ParkingSpaceForm = () => {
  const [parkingSpaceName, setParkingSpaceName] = useState('');
  const [images, setImages] = useState([]);

  const [description, setDescription] = useState('');

  const [size, setSize] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [dayPrice, setDayPrice] = useState('');
  const [longTermStayPrice, setLongTermStayPrice] = useState('');

  const [fromValue, setFromValue] = React.useState(null);
  const [toValue, setToValue] = React.useState(null);
  const [availability, setAvailability] = useState([]);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')


  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const clearAll = () => {
    setParkingSpaceName("")
    setStreet("")
    setHouseNumber("")
    setPostalCode("")
    setCity("")
    setSize("")
    setBasePrice("")
    setDayPrice("")
    setLongTermStayPrice("")
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'parkingspacename':
        setParkingSpaceName(event.target.value);
        break;
      case 'street':
        setStreet(event.target.value);
        break;
      case 'houseNumber':
        setHouseNumber(event.target.value);
        break;
      case 'postalCode':
        setPostalCode(event.target.value);
        break;
      case 'city':
        setCity(event.target.value);
        break;
      case 'size-S':
        setSize(1);
        break;
      case 'size-M':
        setSize(2);
        break;
      case 'size-L':
        setSize(3);
        break;
      case 'size-XL':
        setSize(4);
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
      case 'description':
        setDescription(event.target.value);
        break;

      default:
        break;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let address = street + houseNumber + postalCode + city;
      const response = await ParkingSpaceService.getCoordinates(address)
      //you can also take it out of the main context
      const user = parseJwt(localStorage.getItem('token'))
      const parkingSpace = {
        name: parkingSpaceName,
        owner: user,
        formattedAddress: response.data.results[0].formatted_address,
        location: {
          type: "Point",
          coordinates: [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]
        },
        availability: availability,
        size: size,
        basePrice: basePrice,
        dayPrice: dayPrice,
        longTermStayPrice: longTermStayPrice,

      };
      console.log(parkingSpace)
      await ParkingSpaceService.create(parkingSpace);
      clearAll()
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
  }, [availability]);

  return (
    <div className="flex flex-col items-center ">
      <div className="w-3/4">
        <div className="mb-6 text-xl">
          <b>Welcome to the Creator Dashboard</b>
        </div>
        <form className="text-3x2 font-bold my-2" noValidate onSubmit={(e) => handleSubmit(e)}>
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
          <ImageUploaderForm />
          <Grid container spacing={2}>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6}>
            </Grid>
          </Grid>
          <p>Step 3: Provide additional information to help</p>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Item>Parking Properties</Item>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Streetside" name="streetSide" onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Garage" name="garage" onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="E-Charging" name="e-charging" onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="Illuminated" name="illuminated" onChange={(e) => handleChange(e)} />
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <Item>Size</Item>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="S" name="size-S" onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="M" name="size-M" onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="L" name="size-L" onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="XL" name="size-XL" onChange={(e) => handleChange(e)} />
              </FormGroup>
            </Grid>
            <Grid item xs={4}>
              <Item>Cancellation and Access</Item>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Free cancellation 24 hours before booking" name="size-S" onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="No meetup required" onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="Access via pin" onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="Security Gate" name="securityGate" onChange={(e) => handleChange(e)} />
              </FormGroup>
            </Grid>
          </Grid>
          <p>Step 4: Edit your description</p>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            value={null}
            onChange={(e) => handleChange(e)}
          />
          <p>Step 5: When is your parking place available?</p>
          <div className="my-4 space-x-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker className=""
                label="From"
                value={fromValue}
                onChange={(newValue) => {
                  setFromValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                label="To"
                value={toValue}
                onChange={(newValue) => {
                  setToValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
                {availability.length > 0 ? availability.map((from) => {
                  return <div>{from}</div>
                }): null}
              <Button variant="contained" color="primary" onClick={() => {
                console.log(availability)
                let available = [fromValue.format("DD-MM-YYYY HH:MM"), toValue.format("DD-MM-YYYY HH:MM")]
                setToValue(null);
                setFromValue(null);
                setAvailability(state => [...state, available[0], available[1]]);
              }}>Add Availability</Button>
            </LocalizationProvider>
          </div>
          <p>Step 6: Set a price</p>
          <div className="mb-2">
            <Tooltip title="This is the default price per hour" placement="top" arrow >
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
            </Tooltip>
            <Tooltip title="This ist the price, for a full day" placement="top" arrow >
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
            </Tooltip>
            <Tooltip title="This will be the price per hour, for when the parking space is booked for more than 5 hours" placement="top" arrow >
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
            </Tooltip>
          </div>

          <p>Step 7: Enter the address</p>
          <div className="space-x-2">
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="street"
              label="Street"
              id="street"
              value={street}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="houseNumber"
              label="House Number"
              id="houseNumber"
              value={houseNumber}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="postalCode"
              label="Postal Code"
              id="postalCode"
              value={postalCode}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              name="city"
              label="City"
              id="city"
              value={city}
              onChange={(e) => handleChange(e)}
            />
          </div>

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

export default ParkingSpaceForm;
