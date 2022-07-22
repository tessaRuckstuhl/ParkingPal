
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingService from '../../services/booking.service';
import ParkingSpaceService from '../../services/parkingSpace.service';
import ReviewService from '../../services/review.service';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Paper } from '@mui/material/';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import UserService from '../../services/user.service';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useErrorSnack } from '../../contexts/ErrorContext'
import MapWrapper from '../Map/MapWrapper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import GarageIcon from '@mui/icons-material/Garage';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import LightModeIcon from '@mui/icons-material/LightMode';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import PinIcon from '@mui/icons-material/Pin';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import { fontWeight } from '@mui/system';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { map } from 'lodash';
import { ListItem } from '@material-ui/core';





const BookingForm = () => {
  const [parkingSpace,setParkingSpace] = useState([]);
  const [parkingMapCenter,setParkingMapCenter] = useState({lat:48.1488436,lng:11.5658499});
  const [parkingSpaceName, setParkingSpaceName] = useState('');
  const [parkingSpaceId, setParkingSpaceId] = useState('');
  const [availability, setAvailability] = useState([]);
  const [basePrice, setBasePrice] = useState();
  const [dayPrice,setDayPrice] = useState();
  const [longPrice, setLongPrice] = useState()
  const [todayDate,setTodayDate] = useState('');
  const [parkingProp, setParkingProp] = useState('');
  const [parkingCandA, setParkingCandA] = useState('');
  const [address,setParkingAddress] = useState('');
  const [images,setParkingPics] = useState([])
  const [desc,setParkingDesc] = useState('');
  const [owner, setOwner] = useState('');
  const [reviewamount, setReviewamount] = useState(0)
  const [overallRating, setOverallRating] = useState(0)
  const [nr, setNR] = useState(5);
  const [cr, setCR] = useState(5);
  const [ar, setAR] = useState(5);
  const [acr, setACR] = useState(5);
  const [lr, setLR] = useState(5);
  const [vr, setVR] = useState(5);
  const [fromTime,setFromTime] = useState (new Date(1));
  const [untilTime,setUntilTime] = useState (new Date(1));
  const [totalPrice,setTotalPrice] = useState(0);
  const [parkingPrice,setParkingPrice] = useState();
  const [fee,setFee] = useState();
  const [days,setDays] = useState(0);
  const [hours,setHours] = useState(0);
  const [parkingSpaceSize,setParkingSpaceSize] = useState();
  const [reviewsAry, setReviews] = useState([]);
  const navigate = useNavigate();
  const [startValue, setStartValue] = React.useState(new Date());
  const [endValue, setEndValue] = React.useState(new Date());
  
 
  
  const { showSnack } = useErrorSnack()


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor:'#6F11F2',
      color: theme.palette.common.white,
      fontSize: 16,
      fontWeight: 'bold'
    },
    body: {
      fontSize: 16,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.mode == 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    },
  }))(TableRow);


  


  const today = new Date()

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = parseJwt(localStorage.getItem('token'))
      const booking = {
        parkingSpace: parkingSpaceId,
        // guest ist der, der ein Parkplatz bucht
        guest: user._id, 
        // owner ist der Besitzer den ich über Parkplatz ID hole
        owner: owner,
        // Was ist mit terms: gemeint?
        issueDate: todayDate,
        startDate: startValue,
        endDate: endValue, 
        price: totalPrice,
        payed:false
      };
      const createdBooking = await BookingService.create(booking);
      // first we create the booking with payed set to false, then we handle payment and update payed field to true
      handlePayment(createdBooking.data)

    } catch (error) {
      console.log(error)
    }
  };
  
  
  // leave me here
  // redirect with state: price, other stats,search for booking id and update as payed
  // LOGIC: 1. handleSubmit (parkingSpace created) 2. handlePayment (forward to paypal, pay, update entry in db as payed) 3. redirect to some success page
  const handlePayment = (data) => {
    console.log(totalPrice)
    var okDate = false
    for (let i = 0; i<availability.length;i++){
      if (availability[i].from < fromTime.toISOString() && untilTime.toISOString() < availability[i].to){
        okDate = true
        break;
      }
    }
    if (okDate) {navigate('/pay', {state: data})}
    else {
      showSnack("Your selected dates are not available. Please choose another date","error")
      console.log("its not available")
      console.log (fromTime.toISOString())
      console.log (untilTime.toISOString())
    }
  }


  // const setReviewName = async (reviewsList) => {

  //   reviewsList.map((review) => (
  //     const resultOwner = await UserService.getUser(review.owner)
  //     review.ownername = resultOwner.data.name
  //   )
    
  //   )}
  // }

  

  // const reviewName = async (reviewId) => {
  //   let name = await UserService.getUser(reviewId)
  //   firstname = name.data.firstName 
  //   return firstname 
  // }

  const reviewNameAry = []

  const reviewName = async () => {
    for (let i = 0; i<reviewsAry.length; i++) {
      let name = await UserService.getUser(reviewsAry[i].reviewer) //id
      let firstname = name.data.firstName
      reviewNameAry[i] = firstname
      console.log("i got triggered")
    }
  }


  useEffect(async () => {
    const parkingId = new URL(location.href).searchParams.get('parkingId')
    setParkingSpaceId(parkingId)
    console.log("test")

    console.log(parkingId)
    const parkingResult = await ParkingSpaceService.listParkingSpace(parkingId)
    const reviewResult = await ReviewService.getReviewStats(parkingId)

    const resultOwner = await UserService.getUser(parkingResult.data.owner)
    
    console.log(parkingResult.data)
    
    //const resultGuest = await UserService.getUser(resultBooking.data.guest)
    setOwner(resultOwner.data.surname)
    console.log(resultOwner)

    const reviewResultlist = await ReviewService.getReviewsOfParkingSpace(parkingId)
    console.log("Hey")
    console.log(reviewResultlist.data)

    
    console.log(parkingResult)
    console.log("hallo")
    console.log(parkingResult.data.availability)
    console.log(reviewResult.data)

   reviewName()
   console.log("schau hier") 
   console.log(reviewNameAry)
    
 
    

    console.log (parkingResult.data.images[0])
    // time and Price
    // console.log("unformatted time dif: "+timeDif)
    // console.log("totalTime: "+ totalTime)
    // console.log("fromTimeEx: " + fromTime)
    // console.log("fromTimeEx: " + fromTime)
    // console.log("day:Price: " + dayPrice)
    // console.log("hourPrice:" + basePrice)
    // console.log("DayPrice:")
    // console.log(parkingResult.data.dayPrice)
    // console.log("hourPrice:")
    // console.log(parkingResult.data.basePrice)
    // console.log("Days :")
    // console.log(days)
    // console.log("this is hours: " + hours)
    // console.log ("total day price: "+days*dayPrice)
    // console.log ("total base price: "+hours*basePrice)

    
    
    // parkign space
    console.log("This is the desc: "+ parkingResult.data.description)
    console.log("Owner: "+ owner)
    console.log("Here is the address: "+ parkingResult.data)
    
  
  
    // review
    //console.log(reviewResult.data.rating)
    const formattedParkingSpaces = {...parkingResult.data, lat: parkingResult.data.location.coordinates[0], lng: parkingResult.data.location.coordinates[1]}
    setParkingSpace([...parkingSpace,formattedParkingSpaces])
    setParkingMapCenter({lat:parkingResult.data.location.coordinates[0], lng:parkingResult.data.location.coordinates[1]})
    setTodayDate(today)
    setParkingSpaceName(parkingResult.data.name)
    setParkingProp(parkingResult.data.properties.parking)
    setParkingCandA(parkingResult.data.properties.cancellation_and_access)
    setParkingAddress(parkingResult.data.formattedAddress)
    
    setParkingPics(parkingResult.data.images)
    
    setParkingDesc(parkingResult.data.description)
    setDayPrice(parkingResult.data.dayPrice)
    setBasePrice(parkingResult.data.basePrice)
    setLongPrice(parkingResult.data.longTermStayPrice)
    setAvailability(parkingResult.data.availability)
    setParkingSpaceSize(parkingResult.data.size)
    setReviewamount(reviewResult.data.amount || 0)
    setOverallRating(reviewResult.data.averageOverallRating || 0)
    setNR(reviewResult.data.averageNeighborhoodRating || 0)
    setCR(reviewResult.data.averageCommunicationRating|| 0)
    setAR(reviewResult.data.averageAccessRating || 0)
    setACR(reviewResult.data.averageAccuracyRating || 0)
    setLR(reviewResult.data.averageLocationRating || 0)
    setVR(reviewResult.data.averageValueRating|| 0) 
    setReviews(reviewResultlist.data.reviews)
   
    
    
  }, []);
  return (
    <div className="flex flex-col items-center ">
      <div className="w-3/4">
        <div className="text-xl">
          <b>{address}</b>
        </div>
        <div className="mb-6 font-light text-s">
        
          <a>{overallRating} ⭐ Rating from {reviewamount} reviews</a>
          
        </div>
        <form className="text-3x2 font-bold mb-7" noValidate onSubmit={(e) => handleSubmit(e)}>
          {/* <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box style={{ height: 300 }}>
                <img
                  className="rounded object-contain"
                  src={`http://localhost:3001/api/images/${pics}`}
                  style={{ height: 300, width: 375 }}
                  height={300}
                ></img>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box style={{ height: 300 }}>
                <img
                  className="rounded object-contain"
                  src={`http://localhost:3001/api/images/${pics2}`}
                  style={{ height: 300, width: 375 }}
                ></img>
              </Box>
            </Grid>
          </Grid> */}
          <ImageList cols={2} rowHeight={400}>
            {images.map((picture) => (
              <ImageListItem >
                <img
                  src={`http://localhost:3001/api/images/${picture}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item style={{ height: 400, justifyContent: 'begin', textAlign: 'justify' }}>
                
                
                <div
                  style={{
                    justifyContent: 'begin',
                    textAlign: 'justify',

                  }}
                >
                  <br></br>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <br />

                      {parkingProp.streetside &&
                        <h2>
                          <AddRoadIcon color="primary" fontSize="large"></AddRoadIcon> Steetside Parking
                        </h2>
                      }

                      {parkingProp.garage &&
                        <h2>
                          <GarageIcon color="primary" fontSize="large"></GarageIcon> Entire Garage
                        </h2>
                      }

                      {parkingProp.illuminated &&
                        <h2>
                          <LightModeIcon color="primary" fontSize="large"></LightModeIcon> Fully Illuminated
                        </h2>
                      }
                      {parkingProp.e_charging &&
                        <h2>
                          <ElectricCarIcon color="primary" fontSize="large"></ElectricCarIcon> E-Charging
                        </h2>
                      }
                      <br></br>
                    </Grid>
                    <Grid item xs={6}>
                      <br />
                      <h2>
                        {
                          {
                            '1': <LooksOneIcon color="primary" fontSize="large"></LooksOneIcon>,
                            '2': <LooksTwoIcon color="primary" fontSize="large"></LooksTwoIcon>,
                            '3': <Looks3Icon color="primary" fontSize="large"></Looks3Icon>,
                            '4': <Looks4Icon color="primary" fontSize="large"></Looks4Icon>,
                            '5': <Looks5Icon color="primary" fontSize="large"></Looks5Icon>
                          }[parkingSpaceSize]
                        } Size
                      </h2>

                      {parkingCandA.free_24h_before &&
                        <h2>
                          <NavigateBeforeIcon color="primary" fontSize="large"></NavigateBeforeIcon> 24 h before free
                        </h2>
                      }
                      {parkingCandA.no_meetup &&
                        <h2>
                          <NoMeetingRoomIcon color="primary" fontSize="large"></NoMeetingRoomIcon> No meetup required
                        </h2>
                      }
                      {parkingCandA.pin &&
                        <h2>
                          <PinIcon color="primary" fontSize="large"></PinIcon> Pin Access
                        </h2>
                      }
                      {parkingCandA.security_gate &&
                        <h2>
                          <DoorSlidingIcon color="primary" fontSize="large"></DoorSlidingIcon> Security gate for access
                        </h2>
                      }

                      <br></br>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Divider />
                  <br></br>
                  <b>Description</b>
                  <br></br>
                  <a>{desc}</a>                  
                </div>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item style={{ height: 400 }}>

                <div className=" font-regular  text-s"  
                  style={{
                    justifyContent: 'center',
                    textAlign: 'justify',
                    //display: 'flex',
                  }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <b>↠ {basePrice} € / hour</b> 
                      <br></br>
                      <b>↠ {dayPrice} € / day</b>
                      <br></br>
                      <a>Staying longer than 5h?</a>
                      <br></br>
                      it's only <b>{longPrice}€ </b>for the rest of the day
                    </Grid>
                    <Grid item xs={6}>
                    <b>Rating:</b> ⭐  {overallRating} ({reviewamount})
                    </Grid>
                  </Grid>
                  <br></br>
                </div>
                <div className="mb-6 font-regular  text-s" >
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <Item style={{ height: 70 }} key={5} elevation={5}>
                        <b>CHECK-IN</b>
                        <br></br>
                        <a> {fromTime.toString().substring(0,24)}</a>
                      </Item>
                    </Grid>
                    <Grid item xs={1}>
                      <br></br>
                      <b> - </b>
                    </Grid>
                    <Grid item xs={5}>
                      <Item style={{ height: 70 }} key={5} elevation={5}>
                        <b>CHECK-OUT</b>
                        <br></br>
                        <a>{untilTime.toString().substring(0,24)}</a>
                      </Item>
                    </Grid>
                  </Grid>
                </div>
                
                <div className="mt-2 font-bold" style={{
                  justifyContent: 'center',
                  textAlign: 'justify',
                }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                    Total Time
                    </Grid>
                    <Grid item xs={6}>
                      {days} day(s) and {hours} hour(s)
                    </Grid>
                  </Grid>
                </div>
                <div className=" font-bold" style={{
                  justifyContent: 'center',
                  textAlign: 'justify',
                }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                    Parking Price
                    </Grid>
                    <Grid item xs={6}>
                      {parkingPrice} €
                    </Grid>
                  </Grid>
                </div>
                <div className=" font-bold" style={{
                  justifyContent: 'center',
                  textAlign: 'justify',
                }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                    Fee
                    </Grid>
                    <Grid item xs={6}>
                      {fee} €
                    </Grid>
                  </Grid>
                </div>
                
                <div className="mt-2 mb-7 font-bold" style={{
                  justifyContent: 'center',
                  textAlign: 'justify',
                }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                    Total Price
                    </Grid>
                    <Grid item xs={6}>
                      {totalPrice} €
                    </Grid>
                  </Grid>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Book now
                </Button>
              </Item>

            </Grid>

          </Grid>

          <br></br>
          <br></br>
          {/* <Divider /> */}
          <br></br>
          <br></br>
          
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
                      const myTimeDif = (end-fromTime)
                      const myDays = ((myTimeDif/(1000*86400)) >= 1 ? parseInt((myTimeDif/(1000*86400))) : 0 )
                      const myHours = (myDays > 0 ? ((parseInt(myTimeDif/(1000*3600)) - myDays *24 )) : parseInt(myTimeDif/(1000*3600)))
                      const remainHourPrice = (myHours > 5 ? longPrice : (myHours)* basePrice)
                      const myFee = (myDays*dayPrice + remainHourPrice)*0.05
                      setDays(myDays)
                      setHours(myHours)
                      setFee(myFee)
                      setParkingPrice (myDays*dayPrice + remainHourPrice)
                      setTotalPrice((myDays*dayPrice + remainHourPrice)+myFee)
                    }}
                  />
                </LocalizationProvider> 
              </Grid>
            </Grid> 
          </div>
          <br></br>
          <div style ={{ marginBottom: '1pt'}}>
          <a>List of available slots</a>
          </div>
          <br></br>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>From</StyledTableCell>
                  <StyledTableCell align="right">Until</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {availability.map((date) => (  
                  <StyledTableRow>
                    <StyledTableCell component ="th" scope ="row">{date.from.substring(0,19)}</StyledTableCell>
                    <StyledTableCell align="right">{date.to.substring(0,19)}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>

          <br></br>
          <br></br>
          <Divider />
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
            Customer Ratings

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

          
          <br></br>
          <Grid container spacing={2}>  
            {reviewsAry.length <5 ? reviewsAry.map((aryitem) => (     
              <Grid item xs={6}>
                    <Item style={{ height: 100 }}>
                    <div style={{
                  margin: 'auto',
                  fontSize: 15,
                  justifyContent: 'begin',
                  textAlign: 'justify',
              }}>
                <b>{aryitem.reviewer}</b>
                <br></br>
                <a>{aryitem.description }</a>
                </div>
            </Item> 
          </Grid>
          )): reviewsAry.slice(0,4).map((aryitem) => (
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
                          <b>{aryitem.reviewer}</b>
                          <br></br>
                          <a>{aryitem.description }</a>
                        </div>
                    </Item>
               </Grid>
          ))}
          </Grid>
          <br></br>
          
    
          {/* <Divider /> */}
          <br></br>
          <br></br>
          <h2>Where you'll be parking</h2>
          <br></br>
          <br></br>
          
        
          <div className="w-full">
            <MapWrapper results={parkingSpace} center={parkingMapCenter} setCenter={setParkingMapCenter} selected={true} />
          </div>

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

            <h2>
              <strong>Provided by {owner}</strong>
              <br></br>
              
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
