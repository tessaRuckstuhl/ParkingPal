import axios from 'axios';

const PSService = {

    create(body) {
        return axios.post(`${process.env.REACT_APP_API_URL}parkingSpace`, body);
    },
    update(body) {
        return axios.patch(`${process.env.REACT_APP_API_URL}parkingSpace`, body);
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}parkingSpace/${id}`);
    },
    getParkingSpace(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace/${id}`);
    },
    listAllParkingSpaces() {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace`);
    }
};

export default PSService;
