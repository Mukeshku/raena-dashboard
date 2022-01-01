import axios from "axios";
import * as Constants from "../../constants";

export default axios.create({
    baseURL: Constants.BASE_URL,
    responseType: "json"
});
