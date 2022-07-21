import axios from 'axios';
import authHeader from './auth-header';

const requestConfig = {headers: authHeader()}

const PSService = {
    create(body) {
        return axios.post(`${process.env.REACT_APP_API_URL}parkingSpace`, body,requestConfig);
    },
    update(id,body) {    
        return axios.patch(`${process.env.REACT_APP_API_URL}parkingSpace/${id}`, body,requestConfig);
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}parkingSpace/${id}`,requestConfig);
    },
    listParkingSpace(id) {
        localStorage.removeItem('parkingSpace')
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace/${id}`,requestConfig);
    },
    listAllParkingSpaces(filters) {
        
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace`, {params: filters},requestConfig);
    },
    listOwnedParkingSpaces(ownerId) {
        return axios.get(`${process.env.REACT_APP_API_URL}helperParkingspace/listings/${ownerId}`,requestConfig);
    },
    filterParkingSpaces(filters){
        return  axios.get(`${process.env.REACT_APP_API_URL}helperParkingspace/filter`, {params: filters});
    },
    filterConstraints(){
        return  axios.get(`${process.env.REACT_APP_API_URL}helperParkingspace/filter/constraints`);
    },
    getCoordinates(address) {
        let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + `&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        return axios.get(url)
    },
    deleteImage(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}images/${id}`,requestConfig);
    }
};

export default PSService;
