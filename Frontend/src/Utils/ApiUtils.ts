import { PriceData } from "@/types/Price.type";
import { ResponseProps } from "@/types/Response.type";
import axios from "axios";


const dataAPI: string = import.meta.env.VITE_STOCK_API_URL;

export const validateTicker = async (ticker: string) => {
  try {
    const response = await axios.get(`http://${dataAPI}/stock/validticker/${ticker}`);
    const status = response.status;
    if(status === 200) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export const getPrice = async (ticker: string) => {
  try {
    const validTicker = await validateTicker(ticker);
    if(!validTicker) throw new Error("Invalid Ticker")

    const response = await axios.post(`http://${dataAPI}/stock/price`, {
      ticker
    })
    if(!response.data.data || !response.data) throw new Error("internal Error")
    const data: ResponseProps<PriceData> = (response).data;
    return data.data!;
  } catch (error) {
    throw new Error("Invalid Ticker or internal Error")
  }
}