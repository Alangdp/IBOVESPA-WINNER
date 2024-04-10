import { RequestHandler } from "express";
import { resp } from "../utils/resp.js";
import { Comparator } from '../Entities/Comparator.js'
import { errorResponse, response } from "../utils/Responses.js";


const compare: RequestHandler = async (req, res, next) => {
  try {
    const tickers: string[] = req.body.tickers;
    const compareData = await Comparator.execute(tickers);

    return response(res, {status: 200, data: compareData})
  } catch (error: any) {
    return errorResponse(res, error)
  }
}