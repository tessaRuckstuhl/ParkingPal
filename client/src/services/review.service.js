import axios from 'axios';

const RService = {

    create(body) {
        return axios.post(`${process.env.REACT_APP_API_URL}parkingspace-review`, body);
    },
    update(body) {
        return axios.patch(`${process.env.REACT_APP_API_URL}parkingspace-review`, body);
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}parkingspace-review/${id}`);
    },
    getReview(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingspace-review/${id}`);
    },
    getAllReviews() {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingspace-review`);
    }
};

export default RService;
