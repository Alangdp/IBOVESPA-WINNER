import { DreData } from "@/types/Dre.type";
import { HomeItens } from "@/types/HomeItens.type";
import { PriceData } from "@/types/Price.type";
import { ResponseProps } from "@/types/Response.type";
import axios from "axios";


const dataAPI: string = import.meta.env.VITE_STOCK_API_URL;
const tokenAPI: string = import.meta.env.VITE_TOKEN_API_URL;
const secretToken: string = import.meta.env.VITE_SECRET_TOKEN;

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

export const validateToken = async (token: string | undefined) => {
  try {
    if(!token) return false;
    const response = await axios.post(`http://${tokenAPI}/token/user`, {
      token,
      authorization: secretToken
    });

    const status = response.status;
    if(status === 200) return true;
    return false;
  } catch (error) {
    console.log(error)
    return false;
  }
}

export const getVariations = async () => {
  try {
    const response = await axios.get(`http://${dataAPI}/stock/variations`);
    const data: ResponseProps<HomeItens> = response.data;
    return data.data;
  } catch (error) {
    throw new Error("Error getting variation items");
  }
}

export const getDre = async (ticker: string) => {
  try {
    const response = await axios.post(`http://${dataAPI}/stock/stockInfo/`, {
      ticker
    });
    const data: ResponseProps<DreData> = response.data;
    return data.data;
  } catch (error) {
    throw new Error("Invalid Ticker or internal Error")
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