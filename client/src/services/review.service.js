import axios from 'axios';

const RService = {

    create(body) {
        return axios.post(`${process.env.REACT_APP_API_URL}review`, body);
    },
    update(body) {
        return axios.patch(`${process.env.REACT_APP_API_URL}review`, body);
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}review/${id}`);
    },
    getReview(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}review/${id}`);
    },
    getAllReviews() {
        return axios.get(`${process.env.REACT_APP_API_URL}review`);
    }
};

export default RService;
