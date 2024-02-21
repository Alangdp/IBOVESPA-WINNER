import { RequestHandler } from "express";
import { StockDataBase } from "../useCases/stockDataBase.js";
import { resp } from "../utils/resp.js";


export const index: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock = await new StockDataBase().getStock(ticker);

    return resp(200, 'Stock found', stock, null)
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}

export const indexPrices: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock = await new StockDataBase().getStock(ticker);

    return resp(200, 'Stock found', { prices: stock.priceHistory, actual: stock.actualPrice }, null)
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}

export const indexDividends: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock = await new StockDataBase().getStock(ticker);

    const returnData = {
      lastDividends: stock.lastDividendsValue,
      actual: stock.actualDividendYield,
      lastDividendsYieldYear: stock.lastDividendsYieldYear,
      lastDividendsValueYear: stock.lastDividendsValueYear
    }
  
    return resp(200, 'Stock found', {...returnData}, null)
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}

export const indexIndicators: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock = await new StockDataBase().getStock(ticker);

    return resp(200, 'Stock found', stock.indicators, null)
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}

export const remakeStock: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock = await new StockDataBase().remakeStock(ticker);

    return resp(200, 'Stock found', stock, null)
  } catch (error: any) {
    return resp(400, error.message, null, error)
  }
}