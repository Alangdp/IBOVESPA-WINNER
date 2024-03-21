import { StockDataBase } from "../useCases/stockDataBase.js";
import { GetStockImage } from "../useCases/getStockImage.js";
import JSON from '../utils/Json.js'
import TickerFetcher from "./Fetcher.js";
import { PontuationDataBase } from "../useCases/PontuationDatabase.js";

interface DatabaseSeedProps {
  tickers: string[]
}

class DatabaseSeed {
  private tickers: string[];
  private invalidTicker: string[] = [];

  constructor(props: DatabaseSeedProps) {
    this.tickers = props.tickers;
    return this;
  }

  async execute() {
    for(const ticker of this.tickers) {
      console.log(ticker)
      try {
        await this.getData(ticker);
      } catch (error: any) {
        this.invalidTicker.push(error.message);
      }
    }

    JSON.saveJSONToFile(this.invalidTicker, 'invalidTickers.json');
  }

  async getData (ticker: string) {
    try {
      const stock = await StockDataBase.getStock(ticker)
      await PontuationDataBase.get({ticker: stock.ticker, type: "BAZIN"})
      await PontuationDataBase.get({ticker: stock.ticker, type: "GRAHAM"})
      return true
    } catch (error) {
        console.log(error)
      throw new Error(ticker)
    }
    
  }
}

async function teste() {
  const tickers = await TickerFetcher.getAllTickers();
  const seed  = new DatabaseSeed({tickers}); 
  seed.execute()
}

teste()