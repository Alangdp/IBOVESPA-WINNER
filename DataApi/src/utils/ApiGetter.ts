
import axios from "axios";
import { AxiosOptions } from "../types/AxiosOptions.type";
import { AxiosUtils } from "./Axios.Utils";

export default async function apiGetter<T>(type: T, axiosParams: AxiosOptions, finalUrl: string): Promise<T | null> {
  try {
    const options = AxiosUtils.makeOptionsJson(
      axiosParams,
      finalUrl 
    ); 
  
    const responseData: T = (await axios.request(options)).data;
    return responseData;
  } catch (error) {
    console.log(error);
    return null;
  }
}