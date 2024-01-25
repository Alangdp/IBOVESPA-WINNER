import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import TokenController from '../controllers/TokenController.js';

dotenv.config();

const router = express.Router();

router.post('/user', TokenController.getUserByToken);
router.post('/', TokenController.store);

export default router;
