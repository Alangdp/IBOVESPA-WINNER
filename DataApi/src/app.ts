import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

import './database/index.js';
import './database/sequelize.js';

import stockRoutes from './routes/stock.routes.js';
import variationRoutes from './routes/variation.routes.js';
import userRoutes from './routes/user.routes.js';
import tokenRoutes from './routes/token.routes.js';
import transactionRouter from './routes/transaction.routes.js';
import transactionStocksRouter from './routes/transactionStock.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

class App {
  app;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  routes() {
    this.app.use('/', stockRoutes);
    this.app.use('/', variationRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/token', tokenRoutes);
    this.app.use('/transactions', transactionRouter);
    this.app.use('/transactions/stock', transactionStocksRouter);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('*', cors());
    this.app.options('*', cors());

    this.app.use(
      '/images/logos',
      express.static(path.join(__dirname, '..', 'assets', 'imgs', 'logos'))
    );

    this.app.use(
      '/images/avatar',
      express.static(path.join(__dirname, '..', 'assets', 'imgs', 'avatar'))
    );
  }
}
export default new App().app;
