import axios from "axios";

export default axios.create({
    baseURL: "http://172.16.82.127:8025/api/",
    responseType: "json"
});
