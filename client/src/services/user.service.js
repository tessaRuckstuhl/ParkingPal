import axios from 'axios';
import authHeader from './auth-header';

//not used currently
const UserService = {
  getUserDash() {
    return axios.get(`${process.env.REACT_APP_API_URL}user/dashboard`, { header: authHeader() });
  },
  getUser(id) {
    return axios.get(`${process.env.REACT_APP_API_URL}user/${id}`);
},
};

export default UserService;
