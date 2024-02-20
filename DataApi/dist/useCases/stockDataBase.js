import Database from "../utils/Stockdatabase.js";
import { InstanceStock } from "./instanceStock.js";
import { configDotenv } from "dotenv";
configDotenv();
export class StockDataBase {
    toleranceTime = process.env.TOLERANCE_TIME_HOURS;
    db = new Database('json/stocks.json');
    constructor() {
        return this;
    }
    async getStock(ticker) {
        const stock = this.exists(ticker);
        if (!stock)
            return await this.createOnDatabase(ticker);
        return stock;
    }
    exists(ticker) {
        const finded = this.db.find((stock) => {
            return stock.ticker === ticker;
        });
        if (finded) {
            if (this.validTime(finded))
                return finded;
            this.deleteOnDatabase(ticker);
            return null;
        }
        ;
        return null;
    }
    validTime(stock) {
        if (!stock)
            return false;
        const milliseconds = new Date().getTime() - (stock.instanceTime ?? 0);
        return ((milliseconds / 3600000) < this.toleranceTime);
    }
    async createOnDatabase(ticker) {
        const stock = await InstanceStock.execute(ticker);
        this.db.add(stock, true);
        this.db = this.db.commit();
        return stock;
    }
    deleteOnDatabase(ticker) {
        this.db.deleteBy((stock) => stock.ticker === ticker);
        this.db = this.db.commit();
    }
}
