
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



  //const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
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

    } catch (error) {
    }
  };

  const setReviewStats = async (id) => {
    const resultReview = await ReviewService.getReviewStats(id) 
    setAmountParkingSpaceReviews(resultReview.data.amount)
    setAverageParkingSpaceReview(resultReview.data.averageRating)
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

    // const user = parseJwt(localStorage.getItem('token'))

    
    // const resultParkingSpaceNew = await ParkingSpaceService.listParkingSpace("62bf11471e9e744d16826538") 


    // const bookingNew = {
    //   parkingSpace: resultParkingSpaceNew.data,
    //   guest: user,
    //   owner: user,
    //   terms: "cheap",
    //   issueDate: new Date('2022-07-03T03:24:00'),
    //   startDate: new Date('2022-07-04T12:00:00'),
    //   endDate: new Date('2022-07-05T12:00:00')
    // }

    // console.log(bookingNew)

    // const response = await BookingService.create(bookingNew)
    // console.log(response)


    




    const bookingId = new URL(location.href).searchParams.get('bookingId')
    console.log(bookingId)
    const resultBooking = await BookingService.getBooking(bookingId);
    setBooking(resultBooking.data);

    const resultParkingSpace = await ParkingSpaceService.listParkingSpace(resultBooking.data.parkingSpace) 
    setParkingSpace(resultParkingSpace.data)


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
            <p>You booked this parking place provides by {guest.firstName}, from {booking.startDate}  to {booking.endDate} </p>
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

                <b>Information</b>
                <Divider />
                <div
                  style={{
                    justifyContent: 'begin',
                    textAlign: 'justify',

                  }}
                >
                  <br />
                  <p>- Streetside: {parkingSpace.properties?.parking?.streetside.toString()}</p>
                  <p>- Garage: {parkingSpace.properties?.parking?.garage.toString()}</p>
                  <p>- Illuminated: {parkingSpace.properties?.parking?.illuminated.toString()}</p>
                  <p>- E-Charging: {parkingSpace.properties?.parking?.e_charging.toString()}</p>
                  <br></br>

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

                <div className=" font-regular  text-s">

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
          >
            Submit Review
          </Button>
        </form>


      </div>
    </div>
  );
};

export default ReviewForm;
