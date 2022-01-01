import axios from "axios";

export default axios.create({
    baseURL: 'http://172.16.84.7:8026/api/',
    responseType: "json"
});
