import express, { Application } from 'express';
import dotenv from 'dotenv';

import tokenRoutes from './routes/tokenRoutes.js';

import './database/index.js';

dotenv.config();
class App {
  app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private routes(): void {
    this.app.use('/token', tokenRoutes);
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

export default new App().app;
