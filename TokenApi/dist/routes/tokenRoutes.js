import express from 'express';
import dotenv from 'dotenv';
import TokenController from '../controllers/TokenController.js';
import authorizationMiddleware from '../middlewares/serverAuthorization.middleware.js';
dotenv.config();
const router = express.Router();
router.post('/user', authorizationMiddleware, TokenController.getUserByToken);
router.post('/', authorizationMiddleware, TokenController.store);
export default router;
