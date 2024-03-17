import { RequestHandler } from "express";
import { StockProps } from "../types/stock.types.js";
import TickerFetcher from "../utils/Fetcher.js";
import { StockDataBase } from "../useCases/stockDataBase.js";


export const index: RequestHandler = async (req, res, next) => {
  try {
    const ticker: string = req.body.ticker;
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