import axios from 'axios';

const PSService = {
    msg() {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace`);
    },
    create(params) {
        return axios.post(`${process.env.REACT_APP_API_URL}parkingSpace/add`, params);
    },
    update(params) {
        return axios.patch(`${process.env.REACT_APP_API_URL}parkingSpace/update`, params);
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}parkingSpace/delete`, params);
    },
    getPS(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace/update`, id);
    },
    getAllPS() {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace/getAll`);
    }
};

export default PSService;
