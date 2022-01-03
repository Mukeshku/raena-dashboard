import axios from "axios";

export default axios.create({
    baseURL: 'https://raena.shrikshel.in/api/',
    responseType: "json"
});
