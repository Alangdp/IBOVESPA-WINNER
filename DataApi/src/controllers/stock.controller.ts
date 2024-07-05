import { RequestHandler } from 'express';
import { StockProps } from '../types/stock.types.js';
import TickerFetcher from '../utils/Fetcher.js';
import { errorResponse, response } from '../utils/Responses.js';
import { StockDataBase } from '../useCases/stockDataBase.js';
import { data } from 'cheerio/lib/api/attributes.js';
import { FinancialIndicators } from '../types/indicators.type.js';
import { InstanceStock } from '../useCases/instanceStock.js';
import MathUtils from '../utils/MathUtils.js';
import { News } from '../types/News.type.js';
import CacheJSON from '../utils/CacheJson.js';

export const index: RequestHandler = async (req, res, next) => {
  const { getStockWithoutTime, getStock } = await StockDataBase.startDatabase();

  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await getStock(ticker);

    return response(res, { status: 200, data: stock });
  } catch (error: any) {
    const stock = await getStockWithoutTime(req.body.ticker);
    return response(res, { status: 200, data: stock });
  }
};

export const indexGet: RequestHandler = async (req, res, next) => {
  const {
    createStock,
    deleteStock,
    existsStock,
    findStock,
    getStock,
    updateStock,
  } = await StockDataBase.startDatabase();

  try {
    const ticker: string = req.params.ticker;
    const stock: StockProps = await getStock(ticker);

    return response(res, { status: 200, data: stock });
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export const indexPrices: RequestHandler = async (req, res, next) => {
  const { getStock, getStockWithoutTime } = await StockDataBase.startDatabase();

  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await getStock(ticker);

    return response(res, {
      status: 200,
      data: {
        price: stock.priceHistory,
        actual: stock.actualPrice,
        name: stock.name,
        ticker: stock.ticker,
      },
    });
  } catch (error: any) {
    const stock = await getStockWithoutTime(req.body.ticker);

    console.log(stock, 'TENTANO ACHAR SEM TEMPO');
    if (stock) {
      return response(res, {
        status: 200,
        data: {
          price: stock.priceHistory,
          actual: stock.actualPrice,
          name: stock.name,
          ticker: stock.ticker,
        },
      });
    }
    return errorResponse(res, error);
  }
};

export const indexDividends: RequestHandler = async (req, res, next) => {
  const { getStock } = await StockDataBase.startDatabase();

  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await getStock(ticker);

    const returnData = {
      lastDividends: stock.lastDividendsValue,
      actual: stock.actualDividendYield,
      lastDividendsYieldYear: stock.lastDividendsYieldYear,
      lastDividendsValueYear: stock.lastDividendsValueYear,
    };

    return response(res, { status: 200, data: returnData });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const indexIndicators: RequestHandler = async (req, res, next) => {
  const { getStock } = await StockDataBase.startDatabase();

  try {
    const ticker: string = req.body.ticker;
    const stock: StockProps = await getStock(ticker);

    return response(res, { status: 200, data: stock.indicators });
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export const indexTickers: RequestHandler = async (req, res, next) => {
  try {
    const tickers = await TickerFetcher.getAllTickers();
    return response(res, { status: 200, data: tickers });
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export const validTicker: RequestHandler = async (req, res, next) => {
  try {
    const { ticker } = req.params;
    const fetcher = new TickerFetcher(ticker);
    await fetcher.initialize();
    return response(res, { status: 200 });
  } catch (error: any) {
    return response(res, { status: 404 });
  }
};

export const indexNews: RequestHandler = async (req, res, next) => {
  async function updateCache(cache: CacheJSON<News[], CacheProps<News[]>>) {
    const news = await TickerFetcher.getNews();
    if (!news) throw new Error('Error Getting Variations');
    cache.replaceData(news, 'News');
  }

  try {
    const cache = new CacheJSON<News[], CacheProps<News[]>>({
      duration: 60,
      path: './json/NewsCache.json',
    });

    if (!cache.validDuration()) {
      const cachedData = cache.get();
      if (
        cachedData.length > 0 &&
        cachedData[0].data &&
        cachedData[0].data[0]
      ) {
        response(res, { status: 200, data: cachedData[0].data[0] });
        await updateCache(cache);
        return;
      }

      await updateCache(cache);
    }

    return response(res, { status: 200, data: cache.get()[0].data[0] });
  } catch (error: any) {
    console.log(error);
    return errorResponse(res, error);
  }
};
