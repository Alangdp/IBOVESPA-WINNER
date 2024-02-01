import express from 'express';
import dotenv from 'dotenv';
import './database/index.js';
dotenv.config();
class App {
    app;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    routes() { }
    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}
export default new App().app;
