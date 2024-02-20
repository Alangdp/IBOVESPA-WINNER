import { Bazin } from '../Entities/Bazin.js';
import { InstanceStock } from '../useCases/instanceStock.js';
import Json from './Json.js';
class RankingSystyem {
    tickers;
    ranking;
    async execute() {
        for (const ticker of this.tickers) {
            try {
                const stock = await InstanceStock.execute(ticker);
                const bazin = new Bazin(stock);
                this.ranking[ticker] = { points: bazin.makePoints(stock) };
            }
            catch (error) {
                continue;
            }
        }
        Json.saveJSONToFile(this.ranking, 'Ranking.json');
    }
    constructor({ tickers }) {
        this.tickers = tickers;
        this.ranking = {};
    }
}
