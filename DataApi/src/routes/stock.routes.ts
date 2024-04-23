import express from 'express';
import dotenv from 'dotenv';
import { index, indexGet, indexDividends, indexIndicators, indexPrices, indexTickers, validTicker, indicatorData } from '../controllers/stock.controller.js';
import { getRank } from '../controllers/ranking.controller.js';
import { getHistory } from '../controllers/history.controller.js';

dotenv.config();

const router = express.Router();

router.post('/stock', index)
router.get('/stock/get/:ticker', indexGet)
router.post('/stock/price', indexPrices)
router.post('/stock/dividend', indexDividends)
router.post('/stock/indicators', indexIndicators)
router.post('/stock/stockInfo', indicatorData)
router.get('/stock/tickers', indexTickers)
router.get('/stock/rank', getRank)
router.post('/stock/history', getHistory)
router.get('/stock/validTicker/:ticker', validTicker);


export default router;