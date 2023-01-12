import axios from "axios";

const api = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const customHeaderValue = base64encode(
    JSON.stringify({url:location.href, key:apiKey})
)

let BaseApi = axios.create({
    baseURL: api,
});

function base64encode(input) {
    return btoa(input);
}

let Api = function() {

    const token=localStorage.getItem('token');
    BaseApi.defaults.headers.common['x-spa-custom'] = customHeaderValue;
    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = token;
    }

    return BaseApi;
};

export default Api;
