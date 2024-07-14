import express from 'express';
import dotenv from 'dotenv';
import { index } from '../controllers/transaction.controller';
dotenv.config();

const router = express.Router();

router.post('/', index);

export default router;
