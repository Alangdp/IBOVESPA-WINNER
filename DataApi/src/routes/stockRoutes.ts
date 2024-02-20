import express from 'express';
import dotenv from 'dotenv';
import { index, indexDividends, indexIndicators, indexPrices } from '../controllers/stock.controller.js';

dotenv.config();

const router = express.Router();

router.post('/stock', index)
router.post('/stock/price', indexPrices)
router.post('/stock/dividend', indexDividends)
router.post('/stock/indicators', indexIndicators)

export default router;