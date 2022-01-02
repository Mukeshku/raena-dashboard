import axios from "axios";

export default axios.create({
    baseURL: 'http://172.16.83.7:9120/api/',
    responseType: "json"
});
