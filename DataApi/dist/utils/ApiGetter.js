import axios from "axios";
import { AxiosUtils } from "./Axios.Utils.js";
export default async function apiGetter(axiosParams, finalUrl) {
    try {
        const options = AxiosUtils.makeOptionsJson(axiosParams, finalUrl);
        const response = await axios.request(options);
        const responseData = response.data;
        return responseData;
    }
    catch (error) {
        return null;
    }
}
