import axios from "axios";

export default axios.create({
    baseURL: 'http://172.16.83.7:9121/api/',
    responseType: "json"
});
