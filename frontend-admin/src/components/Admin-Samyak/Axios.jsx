import axios from 'axios';

const API = axios.create({
    baseURL: "192.168.1.18:4000/api/v1"
});
export default API;