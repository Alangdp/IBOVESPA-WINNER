import { StockDataBase } from "../useCases/stockDataBase.js";
import { resp } from "../utils/resp.js";
export const index = async (req, res, next) => {
    try {
        const ticker = req.body.ticker;
        const stock = await new StockDataBase().getStock(ticker);
        return res.status(200).json(stock);
    }
    catch (error) {
        return res.status(400).json(resp(400, error.message, null, error));
    }
};
export const indexPrices = async (req, res, next) => {
    try {
        const ticker = req.body.ticker;
        const stock = await new StockDataBase().getStock(ticker);
        return res.status(200).json({ prices: stock.priceHistory, actual: stock.actualPrice });
    }
    catch (error) {
        next(error);
    }
};
export const indexDividends = async (req, res, next) => {
    try {
        const ticker = req.body.ticker;
        const stock = await new StockDataBase().getStock(ticker);
        return res.status(200).json({ lastDividends: stock.lastDividendsValue, actual: stock.actualDividendYield, lastDividendsYieldYear: stock.lastDividendsYieldYear, lastDividendsValueYear: stock.lastDividendsValueYear });
    }
    catch (error) {
        next(error);
    }
};
export const indexIndicators = async (req, res, next) => {
    try {
        const ticker = req.body.ticker;
        const stock = await new StockDataBase().getStock(ticker);
        return res.status(200).json(stock.indicators);
    }
    catch (error) {
        next(error);
    }
};
