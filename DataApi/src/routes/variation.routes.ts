import express from 'express';
import { getVariations } from '../controllers/variations.controller';

const router = express.Router();

router.get('/stock/variations', getVariations);

export default router;