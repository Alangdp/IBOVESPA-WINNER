import { RequestHandler } from "express";
import { StockProps } from "../types/stock.types.js";
import TickerFetcher from "../utils/Fetcher.js";
import { StockDataBase } from "../useCases/stockDataBase.jts";
import { errorResponse, response } from "../utils/Responses.js";


export const index: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await StockDataBase.getStock(ticker);

    return response(res, {status: 200, data: stock})
  } catch (error: any) {
    return errorResponse(res, error)
  }
}

export const indexGet: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.params.ticker;
    const stock: StockProps = await StockDataBase.getStock(ticker);

    return response(res, { status: 200, data: stock})
  } catch (error: any) {
    return errorResponse(res, error)
  }
}

export const indexPrices: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await StockDataBase.getStock(ticker);

    return response(res, {status: 200, data: {
      price: stock.priceHistory,
      actual: stock.actualPrice,
      name: stock.name,
      ticker: stock.ticker
    }})
  } catch (error: any) {
    return errorResponse(res, error);
  }
}

export const indexDividends: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await StockDataBase.getStock(ticker);

    const returnData = {
      lastDividends: stock.lastDividendsValue,
      actual: stock.actualDividendYield,
      lastDividendsYieldYear: stock.lastDividendsYieldYear,
      lastDividendsValueYear: stock.lastDividendsValueYear
    }

    return response(res, {status: 200, data: returnData})
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const indexIndicators: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await StockDataBase.getStock(ticker);

    return response(res, {status: 200, data: stock.indicators})
  } catch (error: any) {
    return errorResponse(res, error)
  }
}

export const indexTickers: RequestHandler = async (req, res, next) => {
  try {
    const tickers = await TickerFetcher.getAllTickers()
    return response(res, {status: 200, data: tickers})
  } catch (error: any) {
    return errorResponse(res, error);
  }
}

export const validTicker: RequestHandler = async(req, res, next) => {
  try {
    const { ticker } = req.params;
    const fetcher = new TickerFetcher(ticker);
    await fetcher.initialize();
    return response(res, {status: 200})
  } catch (error: any) {
    return response(res, {status: 404})
  }
}