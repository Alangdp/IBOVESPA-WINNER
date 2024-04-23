import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import {
  getUserByToken,
  store,
} from '../controllers/TokenController.js';
import authorizationMiddleware from '../middlewares/serverAuthorization.middleware.js';

dotenv.config();

const router = express.Router();

router.post('/user', getUserByToken);
router.post('/', authorizationMiddleware, store);

export default router;
