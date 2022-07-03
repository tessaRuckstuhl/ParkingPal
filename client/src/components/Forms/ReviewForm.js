
import React, { useState, useContext, useEffect } from 'react';
import ReviewService from '../../services/review.service';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Divider, Rating } from '@mui/material/';
import { styled } from '@mui/material/styles';
import BookingService from '../../services/booking.service';
import ParkingSpaceService from '../../services/parkingSpace.service';
import UserService from '../../services/user.service';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


const ReviewForm = () => {
  const [reviewDescription, setReviewDescription] = useState('');
  const [neighborhoodRating, setNeighborhoodRating] = useState(2.5);
  const [accessRating, setAccessRating] = useState(2.5);
  const [locationRating, setLocationRating] = useState(2.5);
  const [communicationRating, setCommunicationRating] = useState(2.5);
  const [accuracyRating, setAccuracyRating] = useState(2.5);
  const [valueRating, setValueRating] = useState(2.5);
  const [booking, setBooking] = useState([""])
  const [parkingSpace, setParkingSpace] = useState("test");
  const [guest, setGuest] = useState({});
  const [owner, setOwner] = useState({});



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
      case 'neighborhoodrating':
        setNeighborhoodRating(event.target.value);
        break;
      case 'accessrating':
        setAccessRating(event.target.value);
        break;
      case 'locationrating':
        setLocationRating(event.target.value);
        break;
      case 'communicationrating':
        setCommunicationRating(event.target.value);
        break;
      case 'accuracyrating':
        setAccuracyRating(event.target.value);
        break;
      case 'valuerating':
        setValueRating(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { id } = this.props.match.params // read id from url params  req.params id auslesen

      // location.pathname gibt dir die url zurück. 

      const user = parseJwt(localStorage.getItem('token'))
      const review = {
        description: reviewDescription,
        rating: 4,
        neighborhoodRating: neighborhoodRating,
        // accessRating: accessRating,
        // locationRating: locationRating,
        // communicationRating: communicationRating,
        // accuracyRating: accuracyRating,
        // valueRating: valueRating,

        // booking id 62bb4e3cc3a4de101c620263

        reviewer_id: "629f5ef16d7fec1d5cfc2b9b",        // Ich schreib hier gerade den kompletten user object rein, reicht hier ein String?
        parkingSpace_id: "62b43fe8ea081c71fe2f8ebe" // nur die id als string, muss eine valid id sein, sonst klappt es nicht. 
      };
      console.log("nice")
      console.log(review)
      const response = await ReviewService.create(review);

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




  useEffect(async () => {

    const bookingId = new URL(location.href).searchParams.get('bookingId')
    console.log(bookingId)

    const resultBooking = await BookingService.getBooking(bookingId);
    setBooking(resultBooking.data);
    console.log(booking)

    const resultParkingSpace = await ParkingSpaceService.listParkingSpace("62bf11c10fb3d62f64c897c2") // resultBooking.data.parkingSpace_id
    console.log(resultParkingSpace.data)
    setParkingSpace(resultParkingSpace.data)

    console.log("output")
    console.log(resultBooking.data)

    // const resultGuest = await UserService.getUserDash() // I need the user information here! 
    const guest_data = {
      "username": "Charlotte"

    }

    const owner_data = {
      "username": "Stefan",
      "email": "jakobkempter@gmail.com"
    }

    setGuest(guest_data)
    setOwner(owner_data)


  }, []);




  return (

    <div className="flex flex-col items-center ">
      <div className="w-3/4">
        <div className="mb-6 text-xl">
          <b>Rate your parking place experience </b>
        </div>

        <form className="text-3x2 font-bold mb-7" noValidate onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-6 text-m">
            <p>Your parking space booking came just to an end.<br />Now take a minute to reflect on the parking place and leave a quick review. </p>
          </div>
          <div>
            <p>You booked this parking place provides by {booking.guest_id}, from {booking.startDate}  to {booking.endDate} </p>
            {/* momentan sind die dates als string gespeichert - das wird sich noch ändern --> dann nehme ich die toDateString()  */}

            <p>Here is a short summary of what was promised and expected</p>
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
                Information on Parkingspace from Backend
                <Divider />
                <div
                  style={{
                    justifyContent: 'begin',
                    textAlign: 'justify',

                  }}
                >
                  <br></br>
                  <p>- Streetside:{parkingSpace.properties?.parking?.streetside.toString()}</p>
                  <p>- Garage: {parkingSpace.properties?.parking?.garage.toString()}</p>
                  <p>- Illuminated: {parkingSpace.properties?.parking?.illuminated.toString()}</p>
                  <p>- E-Charging: {parkingSpace.properties?.parking?.e_charging.toString()}</p>
                  <br></br>
                  <Divider />
                  <br></br>
                  <b>Description</b>
                  <br></br>
                  <p>{parkingSpace.description}</p>
                </div>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item style={{ height: 300 }}>

                <div className=" font-regular  text-s">

                  <a>Provided by {owner.username}</a>

                  <br></br>
                </div>
                <div className="mb-6 font-regular  text-s">

                </div>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    12 reviews
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
                  onClick={() => { window.location = "mailto:jakobkempter@gmail.com"; }}
                >
                  Contact Host
                </Button>
                <div className="mt-6 font-light text-s">

                </div>

              </Item>

            </Grid>

          </Grid>
          <Divider>

          </Divider>

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
                <Rating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="neighborhoodrating"
                  label="Neighbor Rating"
                  name="neighborhoodrating"
                  value={neighborhoodRating}
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <Item>Access</Item>
                <Rating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="accessrating"
                  label="Access Rating"
                  name="accessrating"
                  value={accessRating}
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />            </Grid>
              <Grid item xs={4}>
                <Item>Location</Item>
                <Rating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="locationrating"
                  label="Location Rating"
                  name="locationrating"
                  value={locationRating}
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Item>Communication</Item>
                <Rating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="communicationrating"
                  label="Communication Rating"
                  name="communicationrating"
                  value={communicationRating}
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <Item>Accuracy</Item>
                <Rating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="accuracyrating"
                  label="Accuracy Rating"
                  name="accuracyrating"
                  value={accuracyRating}
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={4}>
                <Item>Value</Item>
                <Rating
                  defaultValue={2.5}
                  precision={0.5}
                  variant="outlined"
                  required
                  id="valuerating"
                  label="Value Rating"
                  name="valuerating"
                  value={valueRating}
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
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
              id="reviewdescription"
              label="Review Description"
              name="reviewdescription"
              style={{ height: 100 }}
              value={reviewDescription}
              onChange={(e) => handleChange(e)}
            />
          </div>
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
