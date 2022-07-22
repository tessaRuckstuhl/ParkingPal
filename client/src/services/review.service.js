import axios from 'axios';
import authHeader from './auth-header';

const requestConfig = {headers: authHeader()}

const RService = {

    create(body) {
        return axios.post(`${process.env.REACT_APP_API_URL}review`, body, requestConfig );
    },
    update(body) {
        return axios.patch(`${process.env.REACT_APP_API_URL}review`, body, requestConfig);
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}review/${id}`, requestConfig);
    },
    getReview(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}review/${id}`, requestConfig);
    },
    getAllReviews() {
        return axios.get(`${process.env.REACT_APP_API_URL}review`, requestConfig);
    },
    getReviewStats(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}helperReview/${id}`, requestConfig);
    },
    getReviewsOfParkingSpace(id) {
        return axios.post(`${process.env.REACT_APP_API_URL}helperReview/${id}`, requestConfig);
    }
};

export default RService;
