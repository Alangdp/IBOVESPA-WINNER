import { RequestHandler } from "express";
import { StockProps } from "../types/stock.types.js";
import TickerFetcher from "../utils/Fetcher.js";
import { StockDataBase } from "../useCases/stockDataBase.js";
import Database from "../utils/JsonDatabase.js";
import { errorResponse, response } from "../utils/Responses.js";


export const index: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await StockDataBase.getStock(ticker);

    return res.status(200).json({ stock })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const indexGet: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.params.ticker;
    const stock: StockProps = await StockDataBase.getStock(ticker);

    return res.status(200).json({ stock })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const indexPrices: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await StockDataBase.getStock(ticker);

    return res.status(200).json({ price: stock.priceHistory, actual: stock.actualPrice, name: stock.name})
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
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

    return res.status(200).json(returnData)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const indexIndicators: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await StockDataBase.getStock(ticker);

    return res.status(200).json({ indicators: stock.indicators})
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const indexTickers: RequestHandler = async (req, res, next) => {
  try {
    const tickers = await TickerFetcher.getAllTickers()
    return res.status(200).json({ tickers })
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const validTicker: RequestHandler = async(req, res, next) => {
  try {
    const { ticker } = req.params
    const fetcher = new TickerFetcher(ticker);
    await fetcher.initialize();
    return response(res, {status: 200})
  } catch (error) {
    return response(res, {status: 404})
  }
}