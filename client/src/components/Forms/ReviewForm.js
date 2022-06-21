
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingSpaceService from '../../services/parkingSpace.service';
import ReviewService from '../../services/review.service';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Paper, Divider, Rating } from '@mui/material/';
import { styled } from '@mui/material/styles';

const ReviewForm = () => {
  const [reviewDescription, setReviewDescription] = useState('');
  const [neighborhoodRating, setNeighborhoodRating] = useState('2.5');
  const [accessRating, setAccessRating] = useState('2.5');
  const [locationRating, setLocationRating] = useState('2.5');
  const [communicationRating, setCommunicationRating] = useState('2.5');
  const [accuracyRating, setAccuracyRating] = useState('2.5');
  const [valueRating, setValueRating] = useState('2.5');


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
      const { id } = this.props.match.params // read id from url params

      const user = parseJwt(localStorage.getItem('token'))
      const review = {
        description: reviewDescription,
        neighborhoodRating: neighborhoodRating,
        accessRating: accessRating,
        locationRating: locationRating,
        communicationRating: communicationRating,
        accuracyRating: accuracyRating,
        valueRating: valueRating,

        owner: user,        // Ich schreib hier gerade den kompletten user object rein, reicht hier ein String?
        parkingSpace_id: id // nur die id als string
      };
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

  useEffect(() => {


    const { token, email } = this.props.match.params
    // Wird beim Rendern der Seite ausgeführt 
    // hier Id von den params auslesen. 
    const parkingspace_id = 234823492349
    // Wie kann ich darauf zugreifen?

  }, []);
  return (
    
    <div className="flex flex-col items-center ">
      <div className="w-3/4">
        <div className="mb-6 text-xl">
          <b>Rate your parking place experience</b>
        </div>

        <form className="text-3x2 font-bold mb-7" noValidate onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-6 text-xl">
            <p>Your parking space booking came just to an end.<br />Now take a minute to reflect on the parking place and leave a quick review. </p>
          </div>
          <Divider>

          </Divider>


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
              autoFocus
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


// id in den url params mitgegeben 
