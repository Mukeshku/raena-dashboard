import axios from "axios";

export default axios.create({
    baseURL: 'http://172.16.83.203:8027/api/',
    responseType: "json"
});
