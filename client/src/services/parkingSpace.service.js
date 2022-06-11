import axios from 'axios';

const PSService = {

    create(params) {
        return axios.post(`${process.env.REACT_APP_API_URL}parkingSpace`, params);
    },
    update(params) {
        return axios.patch(`${process.env.REACT_APP_API_URL}parkingSpace/update`, params);
    },
    delete(id) {
        return axios.delete(`${process.env.REACT_APP_API_URL}parkingSpace/${id}`);
    },
    listPS(id) {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace/${id}`);
    },
    listAllPS() {
        return axios.get(`${process.env.REACT_APP_API_URL}parkingSpace`);
    }
};

export default PSService;
