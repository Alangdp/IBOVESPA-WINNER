import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors, { CorsOptions } from 'cors';

import './database/index.js';

import stockRoutes from './routes/stock.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET, POST',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
};

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
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    console.log(path.join(__dirname, '..', 'assets'));
    this.app.use(cors(corsOptions));

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
