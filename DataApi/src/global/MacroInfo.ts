import axios from 'axios';
import Utilities from '../utils/Utilities.js';
import TickerFetcher from '../utils/getFuncions.js';

export interface RootCDI {
  '@odata.context': string;
  value: Value[];
}

export interface RootIPCA {
  '@odata.context': string;
  value: Value[];
}

export interface Value {
  SERCODIGO: string;
  VALDATA: string;
  VALVALOR: number;
  NIVNOME: string;
  TERCODIGO: string;
}

export class MacroInfo {
  static readonly version: string = '1.0.0';
  static CDI: number;
  static IPCA: number;
  static tickers: string[];

  static async getCDI() {
    const response = await axios.get(
      "http://ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PAN12_TJOVER12')"
    );
    const data: RootCDI = response.data;
    return Number(data.value[data.value.length - 1].VALVALOR.toFixed(2));
  }

  static async getIPCA() {
    const response = await axios.get(
      "http://ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PAN12_IPCAG12')"
    );
    const data: RootIPCA = response.data;
    return Number(data.value[data.value.length - 1].VALVALOR.toFixed(2));
  }

  static async initialize() {
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
