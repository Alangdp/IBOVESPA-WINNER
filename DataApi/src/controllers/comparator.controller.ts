import { RequestHandler } from "express";
import { resp } from "../utils/resp.js";
import { Comparator } from '../Entities/Comparator.js'


const compare: RequestHandler = async (req, res, next) => {
  try {
    const tickers: string[] = req.body.tickers;
    const compareData = await Comparator.execute(tickers);

    return resp(200, 'Stocks compared', compareData, null)
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}