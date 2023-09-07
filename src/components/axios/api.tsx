
import axios from 'axios';
const defaultURL = "https://newmasterconnect.herokuapp.com/api";
axios.defaults.baseURL = defaultURL;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfHeaderName = 'accept';
axios.defaults.xsrfHeaderName = 'accept-encoding';
axios.defaults.xsrfHeaderName = 'content-type';
axios.defaults.xsrfHeaderName = 'origin';
axios.defaults.xsrfHeaderName = 'dnt';
axios.defaults.xsrfHeaderName = 'user-agent';
axios.defaults.xsrfHeaderName = 'authorization';
axios.defaults.xsrfHeaderName = 'Access-Control-Allow-Origin';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const api = axios.create({
    timeout:5000,
    headers:{
        
        'Content-Type':'application/json',
        "Accept":"*/*",

    },

});

export default api;
