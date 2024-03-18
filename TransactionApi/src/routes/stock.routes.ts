import express from 'express';
import dotenv from 'dotenv';
import { makeTransaction, deleteTransaction } from '../controller/stock.controller';

dotenv.config();

const router = express.Router();

router.post("/", makeTransaction);
router.delete("/:id", deleteTransaction);


export default router;
