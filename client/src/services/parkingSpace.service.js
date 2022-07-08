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
    listParkingSpace(id) {
        console.log(id)
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace/${id}`);
    },
    listAllParkingSpaces(filters) {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace`, {params: filters});
    },
    getCoordinates(address) {
        let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + `&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        return axios.get(url)
    },
    deleteImage(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}images/${id}`);
    }
};

export default PSService;
