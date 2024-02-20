import { RequestHandler } from "express";
import { StockDataBase } from "../useCases/stockDataBase.js";
import { resp } from "../utils/resp.js";


export const index: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock = await new StockDataBase().getStock(ticker);

    return res.status(200).json(stock);
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}

export const indexPrices: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock = await new StockDataBase().getStock(ticker);

    return res.status(200).json({ prices: stock.priceHistory, actual: stock.actualPrice });
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}

export const indexDividends: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock = await new StockDataBase().getStock(ticker);

    return res.status(200).json({ lastDividends: stock.lastDividendsValue, actual: stock.actualDividendYield, lastDividendsYieldYear: stock.lastDividendsYieldYear, lastDividendsValueYear: stock.lastDividendsValueYear });
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}

export const indexIndicators: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock = await new StockDataBase().getStock(ticker);

    return res.status(200).json(stock.indicators);
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}