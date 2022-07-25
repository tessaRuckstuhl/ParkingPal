
import React, { useState, useContext, useEffect } from 'react';
import ReviewService from '../../services/review.service';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Divider, Rating, Icon } from '@mui/material/';
import { styled } from '@mui/material/styles';
import BookingService from '../../services/booking.service';
import ParkingSpaceService from '../../services/parkingSpace.service';
import UserService from '../../services/user.service';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import StarIcon from '@mui/icons-material/Star';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment';
import { useErrorSnack } from '../../contexts/ErrorContext';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';






const ReviewForm = () => {
  const [reviewDescription, setReviewDescription] = useState('');
  const [neighborhoodRating, setNeighborhoodRating] = useState(2.5);
  const [accessRating, setAccessRating] = useState(2.5);
  const [locationRating, setLocationRating] = useState(2.5);
  const [communicationRating, setCommunicationRating] = useState(2.5);
  const [accuracyRating, setAccuracyRating] = useState(2.5);
  const [valueRating, setValueRating] = useState(2.5);
  const [booking, setBooking] = useState([""])
  const [parkingSpace, setParkingSpace] = useState("");
  const [guest, setGuest] = useState({});
  const [owner, setOwner] = useState({});
  const [amountParkingSpaceReviews, setAmountParkingSpaceReviews] = useState();
  const [averageParkingSpaceReview, setAverageParkingSpaceReview] = useState();
  const [parkingSpaceSize, setParkingSpaceSize] = useState();
  const {showSnack} = useErrorSnack()
  const navigate = useNavigate();



  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    boxShadow: "none",
    color: theme.palette.text.secondary,
  }));

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'reviewdescription':
        setReviewDescription(event.target.value);
        break;
      default:
        break;
    }
  };


  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = parseJwt(localStorage.getItem('token'))

    const overallRating = ((neighborhoodRating + accessRating + locationRating + communicationRating + accuracyRating + valueRating) / 6).toFixed(2);
    try {
      const review = {
        description: reviewDescription,
        reviewer: user,
        overallRating: overallRating,
        neighborhoodRating: neighborhoodRating,
        accessRating: accessRating,
        locationRating: locationRating,
        communicationRating: communicationRating,
        accuracyRating: accuracyRating,
        valueRating: valueRating,
        booking: booking,
        parkingSpace: parkingSpace
      };
      const response = await ReviewService.create(review);
      showSnack('Review created.', 'success')
      setTimeout(() => {  navigate("/personal"); }, 1500);

    } catch (error) {
      showSnack('Could not create review.', 'error')
    }
  };

  const setReviewStats = async (id) => {
    const resultReview = await ReviewService.getReviewStats(id)
    setAmountParkingSpaceReviews(resultReview.data.amount)
    setAverageParkingSpaceReview(resultReview.data.averageOverallRating)
  }


  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#883df2',
    },
    '& .MuiRating-iconHover': {
      color: '#6F11F2',
    },
  });


  useEffect(async () => {
    const bookingId = new URL(location.href).searchParams.get('bookingId')
    const resultBooking = await BookingService.getBooking(bookingId);
    setBooking(resultBooking.data);

    const resultParkingSpace = await ParkingSpaceService.listParkingSpace(resultBooking.data.parkingSpace)
    setParkingSpace(resultParkingSpace.data)
    setParkingSpaceSize(resultParkingSpace.data.properties.size)


    const resultGuest = await UserService.getUser(resultBooking.data.guest)
    setGuest(resultGuest.data)

    const resultOwner = await UserService.getUser(resultBooking.data.owner)
    setOwner(resultGuest.data)
    setReviewStats(resultBooking.data.parkingSpace)

  }, []);




  return (

    <div className="flex flex-col items-center ">
      <div className="w-3/4">
        <div className="mb-6 mt-6 text-xl">
          <b>Rate your parking place experience </b>
        </div>

        <form className="text-3x2 mb-7" noValidate onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-6 text-m">Your parking space booking came just to an end.<br />Now take a minute to reflect on the parking place and leave a quick review.</div>
          <Divider />
          <br />
          <div className="text-3x2 font-bold mb-1">
            <p>You booked this parking place provides by {guest.firstName}, from {moment(booking.startDate).format("DD.MM.YYYY, HH:mm")}  to {moment(booking.endDate).format("DD.MM.YYYY, HH:mm")} </p>
            {/* momentan sind die dates als string gespeichert - das wird sich noch ändern --> dann nehme ich die toDateString()  */}
          </div>

          <div className="mb-5 font-medium  text-xs">Here is a short summary of what was promised and expected </div>

          <div className="mb-5 font-medium  text-xs">
            <StarIcon color="primary" fontSize="small"></StarIcon>
            {averageParkingSpaceReview} &emsp; {amountParkingSpaceReviews} reviews &emsp; {parkingSpace.formattedAddress}
          </div>
          <div>
            {parkingSpace.images?.length > 0 ? (
              <>
                <ImageList sx={{ width: 1000, height: 300 }} cols={3} rowHeight={300}>
                  {parkingSpace.images?.map((id) => (
                    <ImageListItem key={id}>
                      <img
                        src={`http://localhost:3001/api/images/${id}?w=164&h=164&fit=crop&auto=format`}
                        alt="image"
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </>
            ) :
              (<></>)}

          </div>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={8}>



              <Item style={{ height: 300, justifyContent: 'begin', textAlign: 'justify' }}>

                <div
                  style={{
                    justifyContent: 'begin',
                    textAlign: 'justify',

                  }}
                >

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <br />

                      {parkingSpace.properties?.parking?.streetside &&
                        <h2>
                          <AddRoadIcon color="primary" fontSize="large"></AddRoadIcon> Steetside Parking
                        </h2>
                      }

                      {parkingSpace.properties?.parking?.garage &&
                        <h2>
                          <GarageIcon color="primary" fontSize="large"></GarageIcon> Entire Garage
                        </h2>
                      }

                      {parkingSpace.properties?.parking?.illuminated &&
                        <h2>
                          <LightModeIcon color="primary" fontSize="large"></LightModeIcon> Fully Illuminated
                        </h2>
                      }
                      {parkingSpace.properties?.parking?.illuminated &&
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
                            1: <LooksOneIcon color="primary" fontSize="large"></LooksOneIcon>,
                            2: <LooksTwoIcon color="primary" fontSize="large"></LooksTwoIcon>,
                            3: <Looks3Icon color="primary" fontSize="large"></Looks3Icon>,
                            4: <Looks4Icon color="primary" fontSize="large"></Looks4Icon>,
                            5: <Looks5Icon color="primary" fontSize="large"></Looks5Icon>
                          }[parkingSpaceSize]
                        } Size
                      </h2>

                      {parkingSpace.properties?.cancellation_and_access?.free_24h_before &&
                        <h2>
                          <NavigateBeforeIcon color="primary" fontSize="large"></NavigateBeforeIcon> 24 h before free
                        </h2>
                      }
                      {parkingSpace.properties?.cancellation_and_access?.no_meetup &&
                        <h2>
                          <NoMeetingRoomIcon color="primary" fontSize="large"></NoMeetingRoomIcon> No meetup required
                        </h2>
                      }
                      {parkingSpace.properties?.cancellation_and_access?.pin &&
                        <h2>
                          <PinIcon color="primary" fontSize="large"></PinIcon> Pin Access
                        </h2>
                      }
                      {parkingSpace.properties?.cancellation_and_access?.security_gate &&
                        <h2>
                          <DoorSlidingIcon color="primary" fontSize="large"></DoorSlidingIcon> Security gate for access
                        </h2>
                      }

                      <br></br>
                    </Grid>
                  </Grid>


                  <br></br>
                  <b>Description</b>
                  <Divider />
                  <br></br>
                  <p>{parkingSpace.description}</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item style={{ height: 300 }}>

                <div className=" font-regular  text-s text-left">
                  <AccountCircleIcon color="primary" fontSize="large"></AccountCircleIcon>
                  <a>Provided by {owner.firstName}</a>

                  <br></br>
                </div>
                <div className="mb-6 font-regular  text-s">

                </div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <StarIcon color="primary" fontSize="small"></StarIcon>
                    {amountParkingSpaceReviews} reviews
                  </Grid>
                  <Grid item xs={6}>

                    Identity verified
                  </Grid>
                </Grid>
                <br></br>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => { window.location = "mailto:" + owner.username; }}>
                  Contact Host
                </Button>
              </Item>
            </Grid>
          </Grid>

          <br />
          <Divider />
          <br />

          <div className="mb-1 text-xl"><b>Rate your experience</b></div>
          <div className=" mb-5 font-medium  text-xs">Please rate your parking place experience in overall satisfaction, accesability, service by the host and location</div>
          <div>

            <Grid container spacing={3} style={{ textAlign: "left" }} className="mb-7">
              <Grid item xs={4}>
                <div className="mb-2 font-semibold" >Neighborhood</div>
                <StyledRating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="neighborhoodrating"
                  label="Neighbor Rating"
                  name="neighborhoodrating"
                  value={neighborhoodRating}
                  autoFocus
                  onChange={(event, newValue) => {
                    setNeighborhoodRating(newValue);
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <div className="mb-2 font-semibold" >Access</div>
                <StyledRating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="accessrating"
                  label="Access Rating"
                  name="accessrating"
                  value={accessRating}
                  autoFocus
                  onChange={(event, newValue) => {
                    setAccessRating(newValue);
                  }} />
              </Grid>
              <Grid item xs={4}>
                <div className="mb-2 font-semibold" >Location</div>
                <StyledRating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="locationrating"
                  label="Location Rating"
                  name="locationrating"
                  value={locationRating}
                  autoFocus
                  onChange={(event, newValue) => {
                    setLocationRating(newValue);
                  }} />
              </Grid>
            </Grid>
            <Grid container spacing={3} style={{ textAlign: "left" }}>
              <Grid item xs={4}>
                <div className="mb-2 font-semibold" >Communication</div>
                <StyledRating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="communicationrating"
                  label="Communication Rating"
                  name="communicationrating"
                  value={communicationRating}
                  autoFocus
                  onChange={(event, newValue) => {
                    setCommunicationRating(newValue);
                  }} />
              </Grid>
              <Grid item xs={4}>
                <div className="mb-2 font-semibold" >Accuracy</div>
                <StyledRating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="accuracyrating"
                  label="Accuracy Rating"
                  name="accuracyrating"
                  value={accuracyRating}
                  autoFocus
                  onChange={(event, newValue) => {
                    setAccuracyRating(newValue);
                  }} />
              </Grid>
              <Grid item xs={4}>
                <div className="mb-2 font-semibold" >Value</div>
                <StyledRating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="valuerating"
                  label="Value Rating"
                  name="valuerating"
                  value={valueRating}
                  autoFocus
                  onChange={(event, newValue) => {
                    setValueRating(newValue);
                  }} />
              </Grid>
            </Grid>
          </div>
          <br />
          <Divider />
          <br />
          <div>
            <div className="mb-1 text-xl"><b>Describe your experience</b></div>
            <div className=" mb-5 font-medium  text-xs">Help others by describing your experience...</div>
            <TextField
              variant="outlined"
              margin="normal"
              multiline={true}
              rows={5}

              required
              fullWidth
              id="reviewdescription"
              label="Review Description"
              name="reviewdescription"
              style={{ height: 100 }}
              value={reviewDescription}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <br />
          <br />
          
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!reviewDescription}>
              Submit Review
            </Button>
          

        </form>


      </div>
    </div>
  );
};

export default ReviewForm;
