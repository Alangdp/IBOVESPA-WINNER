import { StockProtocol } from "../interfaces/StockProtocol.type";
import Database from "../utils/Stockdatabase.js";
import { InstanceStock } from "./instanceStock.js";

export class StockDataBase {
  private db = new Database<StockProtocol>('json/stocks.json');

  constructor() {
    return this
  }

  async getStock(ticker: string) {
    const stock = this.exists(ticker)
    if(!stock) return await this.createOnDatabase(ticker);  
    return stock;
  }

  exists(ticker: string): StockProtocol | null {
    const finded = this.db.find( ( stock ) => {
      return stock.ticker === ticker;
    })

    if(finded) {
      if(this.validTime(finded)) return finded;
      
      this.deleteOnDatabase(ticker);
      return null
    }; 

    return null; 
  }
  
  validTime(stock: StockProtocol): boolean {
    if(!stock) return false;
    
    const milliseconds = new Date().getTime() - (stock.instanceTime ?? 0);
    return (milliseconds < 1);
  }
  
  async createOnDatabase(ticker: string) {
    const stock = await InstanceStock.execute(ticker);
    this.db.add(stock, true);
    this.db = this.db.commit();
    
    return stock;
  }

  deleteOnDatabase(ticker: string) {
    this.db.deleteBy( (stock) => stock.ticker === ticker);
    this.db = this.db.commit();
  }
}