import axios from "axios";

export default axios.create({
    baseURL: 'http://172.16.82.215:9122/api/',
    responseType: "json"
});
