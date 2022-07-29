import { Button, Divider, IconButton, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBackIos, DeleteOutline, Edit } from '@mui/icons-material';
import { useErrorSnack } from '../../contexts/ErrorContext';
import { MainContext } from '../../contexts/MainContext';
import AuthService from '../../services/auth.service';
import ReviewService from '../../services/review.service';
import StarIcon from '@mui/icons-material/Star';



const Listings = () => {
  const [ownerReviews, setOwnedReviews] = useState([]);
  const { showSnack } = useErrorSnack();
  const { jwt, setJwt } = useContext(MainContext);
  const [parsedData, setParsedData] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      setParsedData(AuthService.getCurrentUser(jwt));
    } catch (error) {
      console.log(error);
      AuthService.logout();
      setJwt('');
      return navigate('/login');
    }
  }, [jwt, navigate, setJwt]);

  useEffect(() => {
    if (parsedData) {
      setLoading(true);
      getOwnersReviews(parsedData._id);
      setLoading(false);
    }
  }, [parsedData]);




  const getOwnersReviews = async (ownerId) => {
    try {
      const reviews = await ReviewService.listOwnedReviews(ownerId)
      setOwnedReviews(reviews.data);
    } catch (error) {
      showSnack('Something went wrong trying to fetch your listings.', 'error');
      console.log(error);
    }
  };

  const deleteReview = async (id) => {
    try {
      const deleted = await ReviewService.delete(id);
      getOwnersReviews(parsedData._id);
      showSnack('Review deleted.', 'success');
    } catch (error) {
      showSnack('Something went wrong.', 'error');
      console.log(error);
    }
  };
  const updateReview = async (data) => {
    try {
      navigate("/review/update", {state:data})
    } catch (error) {
      showSnack('Something went wrong.', 'error');
      console.log(error);
    }
  };

  return (
    <div className="p-3 m-3">
      <Link to="/personal">
        <ArrowBackIos sx={{ fontSize: 20 }} />
        Dashboard
      </Link>
      <Divider sx={{ mb: 3, mt: 2 }} />
      <div className="flex justify-between mb-5">
        <div className="text-3xl font-bold">My reviews</div>
        <Link to="/review/create">
          <Button variant="contained" color="primary">
            Create new listing
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className=" flex justify-center">
          <CircularProgress />
        </div>
      ) : ownerReviews.length > 0 ? (
        ownerReviews.map((review, i) => (
          <div key={i} className="items-center border-lighterGray rounded-l shadow-bar p-2 flex justify-between">
            {`${review.description} `}{' '}
            <div>
            <IconButton onClick={() => updateReview(review)}>
              <Edit />
            </IconButton>  
            <IconButton onClick={() => deleteReview(review._id)}>
              <DeleteOutline />
            </IconButton>
            </div>
            {' '}
          </div>
        ))
      ) : (
        <div className="mt-20 text-center ">
          <div className="text-3xl font-semibold mb-5">Get started on ParkingPal</div>Got a parking
          space to share? <br />
          Earn money as an ParkingPal host. Get started by creating a listing.
        </div>
      )}
    </div>
  );
};

export default Listings;
