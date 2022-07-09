
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingService from '../../services/booking.service';
import ParkingSpaceService from '../../services/parkingSpace.service';
import ReviewService from '../../services/review.service';
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
import { fromUnixTime, setHours } from 'date-fns';
import Map from '../Map/Map';
import { Wrapper } from '@googlemaps/react-wrapper';
import Marker from '../Map/Marker';
import MapWrapper from '../Map/MapWrapper';
import { setDayWithOptions } from 'date-fns/fp';





const BookingForm = () => {
  const [parkingSpaceName, setParkingSpaceName] = useState('');
  const [basePrice, setBasePrice] = useState('2');
  const [dayPrice,setDayPrice] = useState('10');
  const [todayDate,setTodayDate] = useState('');
  const [parkingProp, setParkingProp] = useState('');
  const [address,setParkingAddress] = useState('');
  const [pics,setParkingPics1] = useState('');
  const [pics2,setParkingPics2] = useState('');
  const [desc,setParkingDesc] = useState('');
  const [review,setReviewRating] = useState('');
  const [reviewlist, setReviewList] = useState('');
  const [owner, setParkingOwner] = useState('');
  const [nr, setNR] = useState(2);
  const [cr, setCR] = useState(5);
  const [ar, setAR] = useState(3);
  const [acr, setACR] = useState(4);
  const [lr, setLR] = useState(5);
  const [vr, setVR] = useState(1);
  const [fromTime,setFromTime] = useState (new Date(1));
  const [untilTime,setUntilTime] = useState (new Date(1));
  const [timeDif,setTimeDif] = useState('');
  const [totalTime,setTotalTime] = useState(0);
  const [totalPrice,setTotalPrice] = useState(2);
  const [days,setDays] = useState(0);
  const [hours,setHours] = useState(0);
  
  
  const navigate = useNavigate();
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());
  


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const ary = ["hi ","this ","is a","Review showcase","dont show me"];
  const len = ary.length  
  const today = new Date()


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = parseJwt(localStorage.getItem('token'))
      const booking = {
        parkingSpace: parkingSpaceName,
        // guest ist der, der ein Parkplatz bucht
        guest: user, 
        // owner ist der Besitzer den ich über Parkplatz ID hole
        owner: owner,
        // Was ist mit terms: gemeint?
        issueDate: todayDate,
        startDate: startValue,
        endDate: endValue, 
        price: totalPrice,
      };
      await BookingService.create(booking);
    } catch (error) {
    }
  };

  



  useEffect(async () => {
    const bookingId = new URL(location.href).searchParams.get('bookingId')
    console.log(bookingId)
    const parkingResult = await ParkingSpaceService.listParkingSpace(bookingId)
    //const reviewResult = await ReviewService.getReview(bookingId)
    //const reviewResultlist = await ReviewService.getAllReviews()
    
    console.log("unformatted time dif: "+timeDif)
    
    console.log("totalTime: "+ totalTime)
    console.log("fromTimeEx: " + fromTime)
    console.log("fromTimeEx: " + fromTime)
    console.log("day:Price: " + dayPrice)
    console.log("hourPrice:" + basePrice)
    
    

    // console.log(parkingResult.data.formattedAddress)
    // console.log(parkingResult.data.images[1])
    
    console.log("This is the desc:")
    console.log(parkingResult.data.description)
    console.log("Test")
    // console.log(reviewResult.data.rating)
    console.log("Owner:")
    console.log(owner)
    console.log("Here is the address:")
    console.log (parkingResult.data.location)
    
    // const review = await ReviewService.getReview("62bac21772fa1c20a4e88a14")
    // setReviewRating (review.data.rating)
    // console.log("Here ist the review:")
    // console.log (review.rating)
    console.log("DayPrice:")
    console.log(parkingResult.data.dayPrice)
    console.log("hourPrice:")
    console.log(parkingResult.data.basePrice)
    console.log("Days :")
    console.log(days)
    console.log("this is hours: " + hours)
    console.log ("total day price: "+days*dayPrice)
    console.log ("total base price: "+hours*basePrice)
    setTodayDate(today)
    setParkingSpaceName(parkingResult.data.name)
    setParkingProp(parkingResult.data.properties.parking)
    setParkingAddress(parkingResult.data.formattedAddress)
    setParkingPics1(parkingResult.data.images[0])
    setParkingPics2(parkingResult.data.images[1])
    setParkingOwner(parkingResult.data.owner)
    setParkingDesc(parkingResult.data.description)
    setDayPrice(parkingResult.data.dayPrice)
    setBasePrice(parkingResult.data.basePrice)
    // setReviewRating(reviewResult.data.rating)
    // setReviewList(reviewResultlist.data)
    // setNR(reviewResultlist.data.neighborhoodRating)
    // setCR(reviewResultlist.data.communicationRating)
    // setAR(reviewResultlist.data.accessRating)
    // setACR(reviewResultlist.data.accuracyRating)
    // setLR(reviewResultlist.data.locationRating)
    // setVR(reviewResultlist.data.valueRating)
    
  
  }, []);
  return (
    <div className="flex flex-col items-center ">
      <div className="w-3/4">
        <div className="text-xl">
          <b>{address}</b>
        </div>
        <div className="mb-6 font-light text-s">
        <a>{review} • </a>
          <a>Insert Review here •  </a>
          
        </div>
        <form className="text-3x2 font-bold mb-7" noValidate onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {/* <Item style={{ height: 300 }}>{pics}</Item> */}
              <Item style={{ height: 300 }}>
                <img
                  className="rounded object-contain"
                  src={`http://localhost:3001/api/images/${pics}`}
                  width={200}
                  height={300}
                ></img>
              </Item>
            </Grid>
            <Grid item xs={6}>
              {/* <Item style={{ height: 300 }}>{pics2}</Item> */}
              <Item style={{ height: 300 }}>
                <img
                  className="rounded object-contain"
                  src={`http://localhost:3001/api/images/${pics2}`}
                  width={200}
                  height={300}
                ></img>
              </Item>
            </Grid>
          </Grid>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>
                Information on Parkingspace from Backend
                <Divider />
                <div
                  style={{
                    justifyContent: 'begin',
                    textAlign: 'justify',

                  }}
                >
                  <br></br>
                  <p>- Streetside: {parkingProp.streetside.toString()}</p>
                  <p>- Garage: {parkingProp.garage.toString()}</p>
                  <p>- Illuminated: {parkingProp.illuminated.toString()}</p>
                  <p>- E-Charging: {parkingProp.e_charging.toString()}</p>
                  <br></br>
                  <Divider />
                  <br></br>
                  <b>Description</b>
                  <br></br>
                  <p>{desc}</p>                  
                </div>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item style={{ height: 300 }}>

                <div className=" font-regular  text-s">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <a>{basePrice} € / hour  and {dayPrice} € / day</a>
                    </Grid>
                    <Grid item xs={6}>
                      <a>⭐  5.0</a>
                    </Grid>
                  </Grid>
                  <br></br>
                </div>
                <div className="mb-6 font-regular  text-s">
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <Item style={{ height: 70 }} key={5} elevation={5}>
                        <a>CHECK-IN</a>
                        <br></br>
                        <b> {fromTime.toString().substring(0,24)}</b>
                      </Item>
                    </Grid>
                    <Grid item xs={1}>
                      <br></br>
                      <b> - </b>
                    </Grid>
                    <Grid item xs={5}>
                      <Item style={{ height: 70 }} key={5} elevation={5}>
                        <a>CHECK-OUT</a>
                        <br></br>
                        <b>{untilTime.toString().substring(0,24)}</b>
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
                    Total Time
                    </Grid>
                    <Grid item xs={6}>
                      {days} day(s) and {hours} hour(s)
                    </Grid>
                  </Grid>
                </div>
                <div className="mt-1 font-light text-s">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                    Total Price
                    </Grid>
                    <Grid item xs={6}>
                      {totalPrice} €
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
                    disablePast = {true} 
                    value={startValue}
                    onChange={(start) => {  
                      setStartValue(start);
                      setFromTime(start);
                      
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={1}>
                <br></br>
                <b> - </b>
              </Grid>
              <Grid item xs={5}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Until"
                    value={endValue}
                    disablePast = {true}
                    minDateTime = {fromTime}
                    onChange={(end) => {
                      setEndValue(end);
                      setUntilTime(end)
                      setTimeDif(end-fromTime)
                      setDays ((timeDif/(1000*86400)) > 0 ? parseInt((timeDif/(1000*86400))) : 0 )
                      setHours(days > 0 ? ((parseInt(timeDif/(1000*3600)) - days *24 )) : parseInt(timeDif/(1000*3600)))
                      
                      setTotalPrice((days*dayPrice + hours*basePrice))
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
              marginTop: '10%',
              marginBottom: '10%',
              width: '100%',
              margin: 'auto',
              position: 'absolute',
              justifyContent: 'center',
              textAlign: 'justify',
              //display: 'flex',
            }}
          >
            <a>⭐  5.0 • {len} Reviews in total</a>

          </div>

          <br></br>
          <br></br>

          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography component="legend">Neighborhood</Typography>
              <Rating name="read-only" value={nr} readOnly />
              <Typography component="legend">Communication</Typography>
              <Rating name="read-only" value={cr} readOnly />
              <Typography component="legend">Access</Typography>
              <Rating name="read-only" value={ar} readOnly />
            </Grid>
            <Grid item xs={1}>
              <br></br>
              <b>  </b>
            </Grid>
            <Grid item xs={5}>
              <Typography component="legend">Accuracy</Typography>
              <Rating name="read-only" value={acr} readOnly />
              <Typography component="legend">Location</Typography>
              <Rating name="read-only" value={lr} readOnly />
              <Typography component="legend">Value</Typography>
              <Rating name="read-only" value={vr} readOnly />
            </Grid>
          </Grid>

          {/* <div >
            <Grid container spacing={2}>
                {reviewlist.map((rev) => (
                  <Grid item xs={6}>
                  <Item style={{ height: 100 }}>
                  <a>{rev.description}</a>
                ))}
            </Grid>
          </div> */}
          <br></br>
          <Grid container spacing={2}>  
            {len <5 ? ary.map((aryitem) => (     
              <Grid item xs={6}>
                    <Item style={{ height: 100 }}>
                    <div style={{
                  margin: 'auto',
                  fontSize: 15,
                  justifyContent: 'begin',
                  textAlign: 'justify',
                  display: 'flex',
                }}>
                  <a>{aryitem}</a>
                  </div></Item>
              </Grid>
          )): ary.slice(0,4).map((aryitem) => (
                <Grid item xs={6}>
                    <Item style={{ height: 100 }}>
                      
                        <div style={{
                          margin: 'auto',
                          fontSize: 15,
                          justifyContent: 'begin',
                          textAlign: 'justify',
                          display: 'flex',
                        }}>
                          <p>Reviewer's Name</p>
                        </div>
                        <br></br>
                        <div style={{
                          margin: 'auto',
                          fontSize: 15,
                          justifyContent: 'begin',
                          textAlign: 'justify',
                          display: 'flex',
                        }}>
                           <a>{aryitem}</a>
                        </div>
                    </Item>
               </Grid>
          ))}
          </Grid>
          <br></br>
          
    
          <Divider />
          <br></br>
          <br></br>
          <h2>Where you'll be parking</h2>
          <br></br>
          <br></br>
          {/* <div className="flex">
          <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
            <Map center={center} onIdle={onIdle} zoom={zoom} >
              {results.map((result, i) => (
                <Marker
                  key={i}
                  position={{ lat: result.lat, lng: result.lng }}
                  label={'€' + result.basePrice}
                  resultId={result._id}
                  name={result.name}
                />
              ))}
            </Map>
          </Wrapper>
        </div> */}
        
          <p>// TODO: insert map here // </p>
          <br></br>
          <br></br>
          <Divider />
          <br></br>
          <br></br>
          <div className="mb-6 font-light text-s" style={{
            margin: 'auto',
            fontSize: 15,
            justifyContent: 'begin',
            textAlign: 'justify',
            display: 'flex',
          }}>
            <Avatar alt="H" src="/static/images/avatar/1.jpg" />
            <h2>
              <strong>Provided by {owner}</strong>
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
          <div className="mb-6 font-light text-s">
            <Grid container space={2}>
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
