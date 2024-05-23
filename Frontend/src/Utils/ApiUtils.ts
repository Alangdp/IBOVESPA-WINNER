import { DreData } from "@/types/Dre.type";
import { HomeItens } from "@/types/HomeItens.type";
import { PriceData } from "@/types/Price.type";
import { ResponseProps } from "@/types/Response.type";
import { toast } from "react-toastify";
import { TransactionFilterSchema, TransactionsProps } from "@/types/Transaction.type";
import axios from "axios";
import { ChartProps } from "@/types/Chart.type";
import { FinancialIndicators } from "@/types/Indicators.type";
import { SimplifiedDataHistory, SimplifiedHistoryData } from "@/types/History.type";
import { PontuationProps, PontuationReturn } from "@/types/rank.type";

const dataAPI: string = import.meta.env.VITE_STOCK_API_URL;
const tokenAPI: string = import.meta.env.VITE_TOKEN_API_URL;
const transactionAPI: string = import.meta.env.VITE_TRANSACTION_API_URL
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
      token: token,
      authorization: secretToken,
    });

    const status = response.status;
    if(status === 200) return true;
    return false;
  } catch (error) {
    console.log()
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

    if(!response.data.data || !response.data) throw new Error("internal Error");
    const data: ResponseProps<PriceData> = (response).data;

    return data.data!;
  } catch (error) {
    throw new Error("Invalid Ticker or internal Error")
  }
}

export const getTransaction = async (token: string) => {
  try {
    const response = await axios.post(`http://${transactionAPI}/transactions`, {
      token
    });
    
    const transactions: ResponseProps<TransactionsProps[]> = response.data;

    return transactions.data || []
  } catch (error) {
    throw new Error("Invalid Token or internal Error")
  }
}

export const deleteTransaction = async (transactionId: number, token: string) => {
  try {
    const response = await axios.delete(`http://${transactionAPI}/stock/${transactionId}`, {
      data: {
        token
      }
    });
    
    const responseData: ResponseProps<null> = response.data;
    if(responseData.status === 200) {
      toast.success("Transação deletada com sucesso");
      return transactionId;
    }
    
    toast.error("Erro ao apagar transação");
    return null;
  } catch (error) {
    throw new Error("Invalid Token or internal Error")
  }
}

export const editTransaction = async (transactionId: number, token: string, transactionData: TransactionsProps) => {
  try {
    const response = await axios.post(`http://${transactionAPI}/stock/${transactionId}`, {
      transaction: transactionData,
      token
    });
    
    const responseData: ResponseProps<TransactionsProps> = response.data;
    toast.success("Transação editada com sucesso");
    return responseData
  } catch (error) {
    throw new Error("Invalid Token or internal Error")
  }
}


export const registerTransaction = async (transactionData: TransactionFilterSchema, token: string, type: "BUY" | "SELL") => {
  try {
    const response = await axios.post(`http://${transactionAPI}/stock/`, {
      transaction: {
        ticker: transactionData.ticker,
        transactionDate: transactionData.transactionDate,
        quantity: transactionData.quantity,
        price: transactionData.value,
        type: type
      },
      token
    });
    const responseData: ResponseProps<TransactionsProps> = response.data;
    console.log(responseData)
    toast.success("Transação Registrada com sucesso");
    return responseData
  } catch (error) {
    throw new Error("Invalid Token or internal Error")
  }
}

export const getChart = async (token: string) => {
  try {
    const response = await axios.post(`http://${dataAPI}/stock/chart`, {
      token
    });

    const responseData: ResponseProps<ChartProps> = response.data;
    if(!responseData.data) throw new Error("Erro getting Data")
    return responseData.data
  } catch (error) {
    console.log(error, "ERRORR")
    throw new Error("Invalid Token or internal Error")
  }
}

export const getHistory = async (token: string) => {
  try {
    const response = await axios.post(`http://${dataAPI}/stock/history`, {
      token
    });

    const responseData: ResponseProps<SimplifiedDataHistory> = response.data;
    if(!responseData.data) throw new Error("Erro getting Data")
    return responseData.data
  } catch (error) {
    throw new Error("Invalid Token or internal Error")
  }
}

export const getIndicators = async (ticker: string) => {
  try {
    const response = await axios.post(`http://${dataAPI}/stock/indicators`, {
      ticker
    });

    const responseData: ResponseProps<FinancialIndicators> = response.data;
    if(!responseData.data) throw new Error("Erro getting Data")
    return responseData.data
  } catch (error) {
    throw new Error("Invalid Token or internal Error")
  }
}

export const getTickers = async () => {
  try {
    const response = await axios.get(`http://${dataAPI}/stock/tickers`);
    const responseData: ResponseProps<string[]> = response.data;
    if(!responseData.data) throw new Error("Erro getting Data")
    return responseData.data
  } catch (error) {
    throw new Error("Invalid Token or internal Error")
  }
}

export const getRanking = async() => {
  try {
    const response = await axios.get(`http://${dataAPI}/stock/rank`);
    const responseData: ResponseProps<PontuationReturn> = response.data;
    if(!responseData.data) throw new Error("Erro getting Data")
      console.log(responseData)
    return responseData.data
  } catch (error) {
    console.log(error)
    throw new Error("Invalid Token or internal Error")
  }
}