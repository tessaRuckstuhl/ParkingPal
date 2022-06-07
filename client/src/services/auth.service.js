import axios from 'axios';

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
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('token'));
  }
};

export default AuthService;
