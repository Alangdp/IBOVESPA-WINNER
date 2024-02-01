import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import './database/index.js';
dotenv.config();
class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    routes() {
        this.app.use('/users', userRoutes);
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}
export default new App().app;
