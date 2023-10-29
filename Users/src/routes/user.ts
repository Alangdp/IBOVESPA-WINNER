import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

import userController from '../controllers/user.controller.js';

dotenv.config();

const router = express.Router();

router.get('/', userController.index);
router.post('/', userController.store);
router.delete('/', userController.delete);
router.post('/login', userController.login);
export default router;
