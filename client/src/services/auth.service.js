import axios from 'axios';
import { Buffer } from 'buffer';

const AuthService = {
  signup(credentials) {
    return axios.post(`${process.env.REACT_APP_API_URL}user/signup`, credentials);
  },
  login(credentials) {
    return axios.post(`${process.env.REACT_APP_API_URL}user/login`, credentials);
  },
  logout() {
    return localStorage.removeItem('token');
  },
  getCurrentUser(token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
  },
};

export default AuthService;
