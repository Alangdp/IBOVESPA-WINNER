import express from 'express';
import dotenv from 'dotenv';
import { index, indexGet, indexDividends, indexIndicators, indexPrices, indexTickers } from '../controllers/stock.controller.js';
import { getRank } from '../controllers/ranking.controller.js';
import { getHistory } from '../controllers/history.controller.js';

dotenv.config();

const router = express.Router();

router.post('/stock', index)
router.get('/stock/:ticker', indexGet)
router.post('/stock/price', indexPrices)
router.post('/stock/dividend', indexDividends)
router.post('/stock/indicators', indexIndicators)
router.get('/stock/tickers', indexTickers)
router.get('/stock/rank', getRank)
router.post('/stock/history', getHistory)

export default router;