import axios from 'axios';
import authHeader from './auth-header';

const BService = {

    create(body) {
        return axios.post(`${process.env.REACT_APP_API_URL}booking`, body,{headers: authHeader()});
    },
    update(id,body) {
        console.log('update...')
        return axios.patch(`${process.env.REACT_APP_API_URL}booking/${id}`,body,{headers: authHeader()});
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}booking/${id}`,{headers: authHeader()});
    },
    getBooking(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}booking/${id}`,{headers: authHeader()});
    },
    getAllBooking(params) {
        return axios.get(`${process.env.REACT_APP_API_URL}booking`,{params: params, headers: authHeader()});
    }
};

export default BService;
