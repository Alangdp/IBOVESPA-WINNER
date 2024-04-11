import { StockProtocol } from "../interfaces/StockProtocol.type.js";
import { configDotenv } from "dotenv";
import stockModel from "../database/mongodb/models/Stock.model.js";
import { InstanceStock } from "./instanceStock.js";

configDotenv();

const HOUR_IN_MILISECONDS = 3600000;

export class StockDataBase {
  private static toleranceTime: number = process.env.TOLERANCE_TIME_HOURS as unknown as number;
  
  static async createStock(ticker: string) {
    const stock = await InstanceStock.execute(ticker);
    return (await stockModel).create(stock);
  }

  static async findStock(ticker: string) {
    return (await stockModel).findOne({ ticker });
  }

  static async updateStock(stock: StockProtocol) {
    await (await stockModel).updateOne(stock);
  }

  static async deleteStock(stock: StockProtocol) {
    await (await stockModel).deleteOne(stock);
  }

  static async existsStock(ticker: string) {
    const stock = StockDataBase.findStock(ticker);
    if(!stock) return null;
    return stock
  }

  static validTime(time: number) {
    const milliseconds = new Date().getTime() - (time ?? 0);
    return ((milliseconds / HOUR_IN_MILISECONDS) < StockDataBase.toleranceTime);
  }

  static async getStock(ticker: string) {
    const stock = await StockDataBase.existsStock(ticker);
    if(!stock ) return StockDataBase.createStock(ticker);
    const time = stock.get('createdAt') as Date;
    if(!StockDataBase.validTime(time.getTime())) {
      await stock.deleteOne();
      return StockDataBase.createStock(ticker);
    }
    return stock;
  }
}
