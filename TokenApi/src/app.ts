import express, { Application } from 'express';
import cors from 'cors';
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
    this.app.use(cors()); // Allow all origins by default
    this.app.use(express.json()); // Parse JSON bodies

    // Define config options for cors
    this.app.options('*', cors()); // Enable pre-flight across all routes
  }
}

export default new App().app;
