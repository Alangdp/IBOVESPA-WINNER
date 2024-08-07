import express from 'express';
import dotenv from 'dotenv';
import { index, indexGet, indexDividends, indexIndicators, indexPrices, indexTickers, validTicker, indexNews } from '../controllers/stock.controller.js';
import { getRank } from '../controllers/ranking.controller.js';
import { getHistory, getPortifolio } from '../controllers/history.controller.js';

dotenv.config();

const router = express.Router();

router.post('/stock', index);
router.get('/stock/get/:ticker', indexGet);
router.post('/stock/price', indexPrices);
router.post('/stock/dividend', indexDividends);
router.post('/stock/indicators', indexIndicators);
router.get('/stock/tickers', indexTickers);
router.get('/stock/ranking', getRank);
router.post('/stock/history', getHistory);
router.post('/stock/chart', getPortifolio);
router.get('/stock/validTicker/:ticker', validTicker);
router.get('/stock/news/', indexNews);

export default router;