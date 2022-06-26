
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingSpaceService from '../../services/parkingSpace.service';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Paper } from '@mui/material/';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';


const BookingForm = () => {
  const [parkingSpaceName, setParkingSpaceName] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [dayPrice, setDayPrice] = useState('');
  const [longTermStayPrice, setLongTermStayPrice] = useState('');

  const navigate = useNavigate();
  const [value, setValue] = React.useState(new Date());
  
  

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
        <div className="text-xl">
          <b>Carport in St. Anna - Straße</b>
        </div>
        <div className="mb-6 font-light text-s">
          <a>Insert Review here • </a>
          <a>Insert Review Number here •  </a>
          <a>Insert Adresse here</a>
        </div>
        <form className="text-3x2 font-bold mb-7" noValidate onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item style={{ height: 300 }}>Photo Placeholder</Item>
            </Grid>
            <Grid item xs={6}>
              <Item style={{ height: 300 }}>Photo Placeholder</Item>
            </Grid>
        </Grid>   
        <br></br>
        <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item style={{ height: 300, justifyContent:'begin', textAlign: 'justify' }}>
                Information on Parkingspace from Backend
              <Divider />
              <div
                style={{
                  justifyContent: 'begin',
                  textAlign: 'justify',

                }}
              >
              <br></br>
              <p>- bullet 1</p> 
              <p>- bullet 2</p> 
              <p>- bullet 3</p> 
              <br></br>
              <Divider />
              <br></br>
              <b>Description</b>
              <br></br>
              <p>Come check out this cool information which I have to retrieve from BackEnd first.</p>
              </div> 
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item style={{ height: 300 }}>
              
              <div className=" font-regular  text-s">
                <Grid container spacing = {2}>
                  <Grid item xs = {6}>
                    <a>10€ / day</a>
                  </Grid>
                  <Grid item xs = {6}>
                    <a>⭐  5.0</a>
                  </Grid>
                </Grid>
                <br></br>              
              </div>
              <div className="mb-6 font-regular  text-s">
              <Grid container spacing={2}>
                  <Grid item xs={5}>
                  <Item style ={{ height: 70 }} key = {5} elevation={5}>
                      <a>CHECK-IN</a>
                      <br></br>
                     <b> {`23.06`}</b>
                  </Item>
                  </Grid>
                  <Grid item xs ={1}>
                  <br></br>
                  <b> - </b>
                  </Grid> 
                  <Grid item xs={5}>
                  <Item style ={{ height: 70 }} key = {5} elevation={5}>
                  <a>CHECK-OUT</a>
                  <br></br>
                      <b>{`25.06`}</b>
                  </Item>
                  </Grid>
              </Grid>
              </div>
              <br></br>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"                
                    fullWidth
                  >
                    Book now
                  </Button>
                  <div className="mt-6 font-light text-s">      
                <Grid container spacing={2}>
                <Grid item xs={6}>
                Price Calculation
                </Grid>
                <Grid item xs={6}>
                
                Price
                </Grid> 
                </Grid> 
                </div>
                
            </Item>
            
            </Grid>
            
        </Grid> 
        
        <br></br>
        <br></br>
        <Divider />
        <br></br>
        <br></br>
        {/* Date picker from when to when the client wants to book */}
        <div
        style={{
          marginTop: '5%',
          width: '100%',
          margin: 'auto',
          
          justifyContent: 'center',
          textAlign: 'justify',
          //display: 'flex',
        }} >
        <a> From when to when do you plan to park? </a>
        </div>
        <div
        style={{
          marginTop: '2%',
          width: '100%',
          margin: 'auto',
          
          justifyContent: 'center',
          textAlign: 'justify',
          //display: 'flex',
        }}
      >
      <br></br>
        <Grid container spacing={2}>
          <Grid item xs={5}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="From"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider>
              </Grid>
              <Grid item xs ={1}>
                  <br></br>
                  <b> - </b>
                  </Grid> 
              <Grid item xs={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="From"
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
            </LocalizationProvider>
              </Grid>    
            </Grid>
      </div>
    <br></br>
    <br></br>
    <Divider />
    <br></br>
    <br></br>
      <div
        style={{
          marginTop: '10%' ,
          marginBottom: '10%',
          width: '100%',
          margin: 'auto',
          position : 'absolute',
          justifyContent: 'center',
          textAlign: 'justify',
          //display: 'flex',
        }}
      >
      <a>⭐  5.0 • 8 Reviews from Backend</a>

      </div>

<br></br>
<br></br>

<Grid container spacing={2}>
    <Grid item xs={5}>
      <Typography component="legend">Neighborhood</Typography>
        <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">Communication</Typography>
        <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">Access</Typography>
        <Rating name="read-only" value={value} readOnly />
    </Grid>
    <Grid item xs ={1}>
      <br></br>
      <b>  </b>
    </Grid> 
    <Grid item xs={5}>
    <Typography component="legend">Accuracy</Typography>
      <Rating name="read-only" value={value} readOnly />
    <Typography component="legend">Location</Typography>
     <Rating name="read-only" value={value} readOnly />
    <Typography component="legend">Value</Typography>
     <Rating name="read-only" value={value} readOnly />
    </Grid>
</Grid>



    <br></br>
    <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item style={{ height: 100 }}>
                {/* mit <src="pfad"> Bild einfügen vom Backend */}
                <div style={{
                    margin: 'auto',
                    fontSize: 15,
                    justifyContent: 'begin',
                    textAlign: 'justify',
                    display: 'flex',
                }}>
                  <Avatar alt="MG" src="/static/images/avatar/1.jpg" />
                  <p>Markus Gruber</p> 
                </div>
                <br></br>
                <div style={{
                    margin: 'auto',
                    fontSize: 15,
                    justifyContent: 'begin',
                    textAlign: 'justify',
                    display: 'flex',
                }}>
                <p> "Very easy to find! Thanks, it was amazing"</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={6}>
            <Item style={{ height: 100 }}>
                {/* mit <src="pfad"> Bild einfügen vom Backend */}
                <div style={{
                    margin: 'auto',
                    fontSize: 15,
                    justifyContent: 'begin',
                    textAlign: 'justify',
                    display: 'flex',
                }}>
                  <Avatar alt="MG" src="/static/images/avatar/1.jpg" />
                  <p>Markus Gruber</p> 
                </div>
                <br></br>
                <div style={{
                    margin: 'auto',
                    fontSize: 15,
                    justifyContent: 'begin',
                    textAlign: 'justify',
                    display: 'flex',
                }}>
                <p> "Very easy to find! Thanks, it was amazing"</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item style={{ height: 100 }}>
                {/* mit <src="pfad"> Bild einfügen vom Backend */}
                <div style={{
                    margin: 'auto',
                    fontSize: 15,
                    justifyContent: 'begin',
                    textAlign: 'justify',
                    display: 'flex',
                }}>
                  <Avatar alt="MG" src="/static/images/avatar/1.jpg" />
                  <p>Markus Gruber</p> 
                </div>
                <br></br>
                <div style={{
                    margin: 'auto',
                    fontSize: 15,
                    justifyContent: 'begin',
                    textAlign: 'justify',
                    display: 'flex',
                }}>
                <p> "Very easy to find! Thanks, it was amazing"</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={6}>
            <Item style={{ height: 100 }}>
                {/* mit <src="pfad"> Bild einfügen vom Backend */}
                <div style={{
                    margin: 'auto',
                    fontSize: 15,
                    justifyContent: 'begin',
                    textAlign: 'justify',
                    display: 'flex',
                }}>
                  <Avatar alt="MG" src="/static/images/avatar/1.jpg" />
                  <p>Markus Gruber</p> 
                </div>
                <br></br>
                <div style={{
                    margin: 'auto',
                    fontSize: 15,
                    justifyContent: 'begin',
                    textAlign: 'justify',
                    display: 'flex',
                }}>
                <p> "Very easy to find! Thanks, it was amazing"</p>
                </div>
              </Item>
            </Grid>
            
        </Grid>   
        
    <br></br>
    <Button
            type="submit"
            variant="outlined"
            color="primary"
          >
            Show all Reviews
    </Button>
    <br></br>
    <br></br>
    <Divider />
    <br></br>
    <br></br>
    <h2>Where you'll be parking</h2>
    <br></br>
    <br></br>
    <p>// TODO: insert map here // </p> 
    <br></br>
    <br></br>
    <Divider />
    <br></br>
    <br></br>
    <div  className="mb-6 font-light text-s" style={{
        margin: 'auto',
        fontSize: 15,
        justifyContent: 'begin',
        textAlign: 'justify',
        display: 'flex',
    }}>
      <Avatar alt="H" src="/static/images/avatar/1.jpg" />
      <h2>
        <strong>Provided by Hostname</strong>
        <br></br>
        joined May 2022
      </h2>
      
    </div>
    <br></br>
    <Button
      type="submit"
      variant="outlined"
      color="primary"
    >
      Contact Host
    </Button>
   
    <br></br>
    <br></br>
    <Divider />
    <br></br>
    <br></br>
    <p>Things to know</p>
    <br></br>
    <br></br>
    <div  className="mb-6 font-light text-s">
      <Grid container space = {2}>
        <Grid item xs={4}>
        <p>Parking rules</p>
        <br></br>
        <a>• Self check-in with lockbox</a>
        <br></br>
        <a>• No smoking</a>
        <br></br>
        <a>• No parties or events</a>
        </Grid>
        <Grid item xs={4}>
        <p>Health & safety </p>
        <br></br>
        <a>• Smoke Alarm</a>
        <br></br>
        <a>• Safety Camera</a>
        <br></br>
        <a>• ...</a>
        </Grid>
        <Grid item xs={4}>
        <p>Cancellation policy </p>
        <br></br>
        <a>• Free cancellation within 24h before </a>
        <br></br>
        <a>• No smoking</a>
        <br></br>
        <a>• No parties or events</a>
        </Grid>
      </Grid>
    </div>
    <br></br>
    <br></br>
   
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
