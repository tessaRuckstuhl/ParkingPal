import axios from 'axios';

const BService = {

    create(body) {
        return axios.post(`${process.env.REACT_APP_API_URL}booking`, body);
    },
    update(body) {
        return axios.patch(`${process.env.REACT_APP_API_URL}booking`, body);
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}booking/${id}`);
    },
    getBooking(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}booking/${id}`);
    },
    getAllBooking() {
        return axios.get(`${process.env.REACT_APP_API_URL}booking`);
    }
};

export default BService;
