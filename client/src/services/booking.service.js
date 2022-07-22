import axios from 'axios';
import authHeader from './auth-header';

const requestConfig = {headers: authHeader()}
const BService = {
    
    create(body) {
        return axios.post(`${process.env.REACT_APP_API_URL}booking`, body,requestConfig);
    },
    update(id,body) {
        console.log('update...')
        return axios.patch(`${process.env.REACT_APP_API_URL}booking/${id}`,body,requestConfig);
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}booking/${id}`,requestConfig);
    },
    getBooking(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}booking/${id}`,requestConfig);
    },
    getAllBooking(params) {
        return axios.get(`${process.env.REACT_APP_API_URL}booking`,{params: params,...requestConfig});
    }
};

export default BService;
