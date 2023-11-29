import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

import userController from '../controllers/user.controller.js';
import loginRequired from '../middlewares/login.middleware.js';

dotenv.config();

const router = express.Router();

router.get('/', loginRequired, userController.index);
router.post('/', userController.store);
router.delete('/', loginRequired, userController.delete);
router.post('/login', userController.login);
router.get('/admin/:id', userController.turnToAdmin);
export default router;
