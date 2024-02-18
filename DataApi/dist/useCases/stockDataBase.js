import Database from "../utils/Stockdatabase.js";
import { InstanceStock } from "./instanceStock.js";
export class StockDataBase {
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
        return (milliseconds < 1);
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
