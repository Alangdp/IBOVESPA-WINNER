import { RequestHandler } from "express";
import { StockProps } from "../types/stock.types.js";
import TickerFetcher from "../utils/Fetcher.js";
import { errorResponse, response } from "../utils/Responses.js";
import { StockDataBase } from "../useCases/stockDataBase.js";
import { data } from "cheerio/lib/api/attributes.js";
import { FinancialIndicators } from "../types/indicators.type.js";
import { InstanceStock } from "../useCases/instanceStock.js";
import MathUtils from "../utils/MathUtils.js";


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

type indicatorType = {
  marketValue: string;
  netProfit: string;
  dividendYield: string;
  profit: string;
  p_l: number;
  stockVariability: number;
  // Earn for stock
  eps: number;
  // variability based on Ibovespa
  beta: number;
} 

// Indicator data to especific Stock
export const indicatorData: RequestHandler = async(req, res, next) => {
  try {
    const actualDate = new Date();
    const ticker: string | undefined = req.body.ticker;
    if(!ticker) throw new Error("Invalid ticker");
    const stock = await InstanceStock.execute(ticker);

    let totalDividendsLastYear = 0
    stock.lastDividendsValue.forEach(item => {
      const splitedDate = item.dataCom.split("/");
      if(Number(splitedDate[splitedDate.length - 1]) === actualDate.getFullYear() - 1) totalDividendsLastYear += item.value;
    })
    totalDividendsLastYear = (totalDividendsLastYear * (stock.shareQuantity * (stock.freeFloat / 100))) / (stock.shareQuantity);

    const data: indicatorType = {
      marketValue: MathUtils.abbreviateNumber(stock.lpa * stock.shareQuantity),
      netProfit: MathUtils.abbreviateNumber(stock.netLiquid[0].value),
      profit: MathUtils.abbreviateNumber(stock.dreData['ReceitaLiquida'].actual || 0) ,
      dividendYield: stock.dividendYield + '%',
      p_l: stock.indicators['p_l'].actual,
      stockVariability: 0,
      eps: 0, 
      beta: 0
    }
    return response(res, {status: 200, data})
  } catch (error) {

    console.log(error)
    return errorResponse(res, error);
  }
}