import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import './database/index.js';
import stockRoutes from './routes/stockRoutes.js';
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
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        console.log(path.join(__dirname, '..', 'assets'));
        this.app.use('/static', express.static(path.join(__dirname, '..', 'assets')));
    }
}
export default new App().app;
