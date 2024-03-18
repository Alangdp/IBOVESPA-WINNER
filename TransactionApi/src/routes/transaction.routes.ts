import express from 'express';
import dotenv from 'dotenv';
import { index } from '../controller/transaction.controller';

dotenv.config();

const router = express.Router();

router.post("/", index);

export default router;
