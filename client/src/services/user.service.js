import axios from 'axios';
import authHeader from './auth-header';



const UserService = {
  getUserDash() {
    return axios.get(`${process.env.REACT_APP_API_URL}user/dashboard`, { headers: authHeader() });
  },
  getUser(id) {
    return axios.get(`${process.env.REACT_APP_API_URL}user/${id}`, {headers: authHeader()});
},
};

export default UserService;
