import axios from "axios";

const api = process.env.REACT_APP_API_URL;
// const api = 'http://localhost:8000/api';

let BaseApi = axios.create({
    baseURL: api,
});

let Api = function() {

    const token=localStorage.getItem('token');
    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = token;
    }
    return BaseApi;
};

export default Api;
