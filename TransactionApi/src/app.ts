import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from "cors"

import './database/index.js';
import transactionRouter from './routes/transaction.routes.js';
import stocksRouter from './routes/stock.routes.js'

dotenv.config();

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private routes(): void {
    this.app.use("/transactions", transactionRouter)
    this.app.use("/stock", stocksRouter)
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('*', cors())
    this.app.options('*', cors())
  }
}

export default new App().app;
