import axios from 'axios';
import TickerFetcher from '../utils/Fetcher.js';
export class MacroInfo {
    static firstStart = true;
    static version = '1.0.0';
    static CDI;
    static IPCA;
    static tickers;
    static stocks = [];
    static async getCDI() {
        const response = await axios.get("http://ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PAN12_TJOVER12')");
        const data = response.data;
        return Number(data.value[data.value.length - 1].VALVALOR.toFixed(2));
    }
    static async getIPCA() {
        const response = await axios.get("http://ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PAN12_IPCAG12')");
        const data = response.data;
        return Number(data.value[data.value.length - 1].VALVALOR.toFixed(2));
    }
    static async initialize() {
        if (!MacroInfo.firstStart)
            return;
        MacroInfo.firstStart = false;
        console.log('Version: ' + this.version + '\n');
        this.getCDI().then((result) => {
            this.CDI = result;
            console.log(`CDI: ${this.CDI}`);
        });
        this.getIPCA().then((result) => {
            this.CDI = result;
            console.log(`IPCA: ${this.CDI}`);
        });
        this.tickers = await TickerFetcher.getAllTickers();
    }
}
MacroInfo.initialize();
