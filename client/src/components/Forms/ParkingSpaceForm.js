
import React, { useState, useContext, useEffect } from 'react';
import ParkingSpaceService from '../../services/parkingSpace.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Box, IconButton, Radio, RadioGroup, FormControl , Tooltip, Checkbox,FormGroup , FormControlLabel } from '@mui/material/';
import { styled } from '@mui/material/styles';
import ImageUploaderForm from './ImageUploaderForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider,DateTimePicker } from '@mui/x-date-pickers';
import { useErrorSnack } from '../../contexts/ErrorContext'
import { ImageContext } from '../../contexts/ImageContext'
import Info from '@mui/icons-material/Info';
import moment from 'moment';
import { useLocation ,useNavigate} from 'react-router-dom';

//https://mui.com/material-ui/react-stepper/ maybe add

const ParkingSpaceForm = () => {
  const [parkingSpaceName, setParkingSpaceName] = useState('');
  const { imageIDs, setImageIDs } = useContext(ImageContext)
  const [description, setDescription] = useState('');
  const [size, setSize] = useState(0);
  const [basePrice, setBasePrice] = useState('');
  const [dayPrice, setDayPrice] = useState('');
  const [longTermStayPrice, setLongTermStayPrice] = useState('');
  const [fromValue, setFromValue] = React.useState('');
  const [toValue, setToValue] = React.useState('');
  const [availability, setAvailability] = useState([]);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const [e_charging, setE_Charging] = useState(false)
  const [streetside, setStreetside] = useState(false)
  const [illuminated, setIlluminated] = useState(false)
  const [garage, setGarage] = useState(false)
  const [free_24h_before, setFree_24h_before] = useState(false)
  const [no_meetup, setNo_Meetup] = useState(false)
  const [pin, setPin] = useState(false)
  const [securityGate, setSecurityGate] = useState(false)
  const [formIncomplete, setFormIncomplete] = useState(true)

  const required = [" Parking Space Name"," Size"," Availability", " Base Price"," House Number"," City", " Postal Code"]
  const [updateID,setUpdateID] = useState("") 
  const [loadUpdateData,setLoadUpdateData] = useState(true) 

  const navigate = useNavigate();
  
  const Item = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: '2px',
    color: theme.palette.text.secondary,
  }));
  const { showSnack } = useErrorSnack()
  const {state} = useLocation()

  const clearAll = () => {
    setParkingSpaceName("")
    setImageIDs([])
    setDescription("")
    setSize("")
    setBasePrice("")
    setDayPrice("")
    setLongTermStayPrice("")
    setAvailability([])
    setStreet("")
    setHouseNumber("")
    setPostalCode("")
    setCity("")
    setE_Charging(false)
    setStreetside(false)
    setIlluminated(false)
    setGarage(false)
    setFree_24h_before(false)
    setNo_Meetup(false)
    setPin(false)
    setSecurityGate(false)
    setFromValue("")
    setToValue("")
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'parkingspacename':
        setParkingSpaceName(event.target.value);
        break;
      case 'radio-buttons-size':
        setSize(event.target.value);
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
      case 'streetside':
        setStreetside(!streetside);
        break;
      case 'e_charging':
        setE_Charging(!e_charging);
        break;
      case 'illuminated':
        setIlluminated(!illuminated);
        break;
      case 'garage':
        setGarage(!garage);
        break;
      case 'free_24h_before':
        setFree_24h_before(!free_24h_before);
        break;
      case 'no_meetup':
        setNo_Meetup(!no_meetup);
        break;
      case 'pin':
        setPin(!pin);
        break;
      case 'securityGate':
        setSecurityGate(!securityGate);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let address = street + houseNumber + " " + postalCode + city;
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
        basePrice: basePrice,
        dayPrice: dayPrice,
        longTermStayPrice: longTermStayPrice,
        images: imageIDs,
        description: description,
        properties: {
          parking: {
            streetside: streetside,
            garage: garage,
            e_charging: e_charging,
            illuminated: illuminated
          },
          size: Number(size),
          cancellation_and_access: {
            free_24h_before: free_24h_before,
            no_meetup: no_meetup,
            pin: pin,
            security_gate: securityGate
          }
        },
        status: "available"
      };
      location.pathname === "/parking/create" ? await ParkingSpaceService.create(parkingSpace): await ParkingSpaceService.update(updateID,parkingSpace)
      clearAll()
      navigate("/personal/listings")
      showSnack("Parking space created successfully!", "success")
    } catch (error) {
      for (var i = 0; i < imageIDs.length; i++) {
        await ParkingSpaceService.deleteImage(imageIDs[i]).catch(imageremoveerror => "could not delete this image with id" + imageIDs[i])
      }
    };
  }

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect( () => {
  try{
    if(location.pathname === "/parking/update" && loadUpdateData){
      const updateParkingSpace = state
      setUpdateID(updateParkingSpace._id)
      setParkingSpaceName(updateParkingSpace.name)
      //setImageIDs(updateParkingSpace.images)
      setDescription(updateParkingSpace.description)
      setSize(updateParkingSpace.properties.size)
      setBasePrice(updateParkingSpace.basePrice)
      setDayPrice(updateParkingSpace.dayPrice)
      setLongTermStayPrice(updateParkingSpace.longTermStayPrice)
      setAvailability(updateParkingSpace.availability)
      setStreet(updateParkingSpace.formattedAddress.split(',')[0].split(' ')[0])
      setHouseNumber(updateParkingSpace.formattedAddress.split(',')[0].split(' ')[1])
      setPostalCode(updateParkingSpace.formattedAddress.split(',')[1].split(' ')[1])
      setCity(updateParkingSpace.formattedAddress.split(',')[1].split(' ')[2])
      setE_Charging(updateParkingSpace.properties.parking.e_charging)
      setStreetside(updateParkingSpace.properties.parking.streetside)
      setIlluminated(updateParkingSpace.properties.parking.illuminated)
      setGarage(updateParkingSpace.properties.parking.garage)
      setFree_24h_before(updateParkingSpace.properties.cancellation_and_access.free_24h_before)
      setNo_Meetup(updateParkingSpace.properties.cancellation_and_access.no_meetup)
      setPin(updateParkingSpace.properties.cancellation_and_access.pin)
      setSecurityGate(updateParkingSpace.properties.cancellation_and_access.pin)
      setLoadUpdateData(false)
    } 
    if (parkingSpaceName !== "" && size !== "" && availability.length !== 0 && basePrice !== "" && street !== "" && houseNumber !== "" && (postalCode !== "" || city !== ""))
      setFormIncomplete(false)
    else {
      setFormIncomplete(true)
    }
  } catch (error) {
    console.log(error);
    return navigate('/login');
  }
  }, [parkingSpaceName,size,availability,basePrice,street,houseNumber,postalCode,city]);

  return (
    <div className="flex flex-col items-center ">
      <div className="w-3/4">
        <div className="mb-6 text-xl">
          <b>Welcome to the Creator Dashboard</b>
          <p className="text-[#9f9a9a] text-sm font-bold">Work your way down and enter all the information a potential parking guest might need.</p>
        </div>
        <form className="text-3x2 font-bold my-2" noValidate onSubmit={(e) => handleSubmit(e)}>
          <p>Step 1: Name your parking place</p>
          <p className="text-[#9f9a9a] text-sm">Enter a listing name in 50 characters or less. Make it stick out!</p>
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
          <p className="text-[#9f9a9a] text-sm">Set the scene and impove your visibility by adding photos.</p>
          <ImageUploaderForm />
          <Grid container spacing={2}>
            <Grid item sm={6}>
            </Grid>
            <Grid item sm={6}>
            </Grid>
          </Grid>
          <b>Step 3: Provide additional information to help</b>
          <Grid container spacing={3}>
            <Grid item sm={4}>
              <Item><u>Parking Properties</u></Item>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Streetside" name="streetside" checked={streetside} onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="Garage" name="garage" checked={garage} onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="E-Charging" name="e_charging" checked={e_charging} onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="Illuminated" name="illuminated" checked={illuminated} onChange={(e) => handleChange(e)} />
              </FormGroup>
            </Grid>
            <Grid item sm={4}>
              <Item><u>Size</u></Item>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={size}
                  name="radio-buttons-size"
                  onChange={(e) => handleChange(e)}
                >
                  <FormControlLabel value={0} control={<Radio />} label="S" />
                  <FormControlLabel value={1} control={<Radio />} label="M" />
                  <FormControlLabel value={2} control={<Radio />} label="L" />
                  <FormControlLabel value={3} control={<Radio />} label="XL" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item sm={4}>
              <Item><u>Cancellation and Access</u></Item>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Free cancellation 24h before booking" name="free_24h_before" checked={free_24h_before} onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="No meetup required" name="no_meetup" checked={no_meetup} onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="Access via pin" name="pin" checked={pin} onChange={(e) => handleChange(e)} />
                <FormControlLabel control={<Checkbox />} label="Security Gate" name="securityGate" checked={securityGate} onChange={(e) => handleChange(e)} />
              </FormGroup>
            </Grid>
          </Grid>
          <b>Step 4: Edit your description</b>
          <p className="text-[#9f9a9a] text-sm">Describe what's nearby and let the guests know, why your parking space is unique.</p>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            value={description}
            onChange={(e) => handleChange(e)}
          />
          <b>Step 5: When is your parking place available?</b>
          <p className="text-[#9f9a9a] text-sm">Provide all dates throughout the year. This can be hours, days, weeks or months.</p>
          <div className="my-4 space-x-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="From"
                disablePast = {true} 
                value={fromValue || null}
                onChange={(newValue) => {
                  setFromValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                label="To"
                value={toValue || null}
                minDate={fromValue || null}
                onChange={(newValue) => {
                  setToValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              {availability.length > 0 ? availability.map((slot,k) => {
                return <div key={k}>{moment(slot.from).format("DD.MM.YYYY, HH:mm")} until {moment(slot.to).format("DD.MM.YYYY, HH:mm")}</div>
              }) : null}
              <Button style={{ marginTop: 10 }} variant="contained" color="primary" onClick={() => {
                if (fromValue >= toValue) {
                  showSnack("Please make sure the start date is before the end date!", "warning")
                }
                else {
                  let available = {
                    from: fromValue.toISOString(),
                    to: toValue.toISOString()
                  }
                  setAvailability(state => [...state, available]);
                  setToValue(null);
                  setFromValue(null);
                }
              }}>Add Availability</Button>
              <Button style={{ marginTop: 10 }} disabled={availability.length === 0} variant="contained" color="primary" onClick={() => {
                setToValue(null);
                setFromValue(null);
                setAvailability([]);
              }}>Clear Dates</Button>
            </LocalizationProvider>
          </div>
          <b>Step 6: Set a price</b>
          <p className="text-[#9f9a9a] text-sm">This is your default price per hour</p>
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
              <p className="text-[#9f9a9a] text-sm">This will be the price per hour, when the parking space is booked for more than 5 hours</p>
            <Tooltip title="This will be the price per hour, when the parking space is booked for more than 5 hours" placement="top" arrow >
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
            <p className="text-[#9f9a9a] text-sm">This ist the price, for a full day</p>
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
          </div>

          <p>Step 7: Enter the address</p>
          <div>
            <TextField
              className="mr-2"
              variant="outlined"
              margin="normal"
              required
              style={{ width: '69.5%', marginRight: 5 }}
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
              style={{ width: '30%' }}
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
              style={{ width: '69.5%', marginRight: 5 }}
              name="city"
              label="City"
              id="city"
              value={city}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              style={{ width: '30%' }}
              name="postalCode"
              label="Postal Code"
              id="postalCode"
              value={postalCode}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="my-4">
            {location.pathname === "/parking/create" ? <Button
              disabled={formIncomplete}
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Parking Space
            </Button> :
            <Button
              disabled={formIncomplete}
              type="submit"
              variant="contained"
              color="primary"
            >
              Update Parking Space
            </Button>}
            {formIncomplete?
            <IconButton onClick={() => showSnack("Please fill out" +  required, 'warning')}>
              <Info sx={{ fontSize: 20 }} color="secondary" />
            </IconButton>
            :null}
          </div >
        </form>
      </div>
    </div>
  );
};

export default ParkingSpaceForm;
