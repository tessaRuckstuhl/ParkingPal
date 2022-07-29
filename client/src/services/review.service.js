import axios from 'axios';
import authHeader from './auth-header';


const RService = {

    create(body) {
        return axios.post(`${process.env.REACT_APP_API_URL}review`, body, {headers: authHeader()} );
    },
    update(body) {
        return axios.patch(`${process.env.REACT_APP_API_URL}review`, body, {headers: authHeader()});
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}review/${id}`, {headers: authHeader()});
    },
    getReview(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}review/${id}`, {headers: authHeader()});
    },
    getAllReviews() {
        return axios.get(`${process.env.REACT_APP_API_URL}review`, {headers: authHeader()});
    },
    getReviewStats(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}helperReview/${id}`, {headers: authHeader()});
    },
    getReviewsOfParkingSpace(id) {
        return axios.post(`${process.env.REACT_APP_API_URL}helperReview/${id}`, {headers: authHeader()});
    }
};

export default RService;
