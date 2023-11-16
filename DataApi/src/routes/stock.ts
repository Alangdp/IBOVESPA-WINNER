import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/stock', (req: Request, res: Response) => {});

export default router;
