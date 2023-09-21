import axios from 'axios';
const defaultURL = "https://userpost-302619268814.s3-accesspoint.us-east-1.amazonaws.com";
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
axios.defaults.xsrfHeaderName = 'x-amz-server-side-encryption';
axios.defaults.xsrfHeaderName = 'x-amz-id-2';
axios.defaults.xsrfHeaderName = 'x-amz-request-id';
axios.defaults.xsrfHeaderName = 'ETag';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const userpost = axios.create({
    timeout:5000,
    headers:{
        
        'Content-Type':'multipart/form-data',
        "Accept":"*/*",

    },

});
export const userImage = axios.create({
    timeout:5000,
    headers:{
        'Content-Type':'multipart/form-data',
        "Accept":"*/*",

    },

});

