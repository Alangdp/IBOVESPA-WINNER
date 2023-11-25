import fs, { stat } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Alter import type
import cheerio from 'cheerio';
import { chartDataType } from '../types/get';

class Utilities {
  private $?: cheerio.Root;

  constructor(html?: string) {
    if (html) this.$ = cheerio.load(html);
  }

  static getLastYears(x = 0) {
    const actualYear = new Date();
    const lastYears = [];

    for (let index of Utilities.range(x)) {
      lastYears.push(actualYear.getFullYear() - index);
    }

    return lastYears;
  }

  static range(n: Number): Array<number> {
    return [...Array(n).keys()];
  }

  static breakArrayIntoGroups(arr: any[], groupSize: number): Array<any> {
    const result = [];
    for (let i = 0; i < arr.length; i += groupSize) {
      const group = arr.slice(i, i + groupSize);
      result.push(group);
    }
    return result;
  }

  static getLastFiveYears() {
    const actualYear = new Date();
    const lastFiveYears = [];

    for (let index of Utilities.range(5)) {
      lastFiveYears.push(actualYear.getFullYear() - index);
    }

    return lastFiveYears;
  }

  static formateNumber(stringToFormat: string): number {
    stringToFormat = stringToFormat.replace(/[^\d,.]/g, '');
    stringToFormat = stringToFormat.replace(',', '.');

    try {
      return Number(stringToFormat);
    } catch (err: any) {
      throw new Error('Invalid String');
    }
  }

  static readJSONFromFile(filename: string) {
    const absolutePath = path.resolve(__dirname, '..', 'json', filename);
    try {
      const jsonData = fs.readFileSync(absolutePath, 'utf8');
      return JSON.parse(jsonData);
    } catch (err) {
      console.error('Erro ao ler o arquivo JSON:', err);
      return null;
    }
  }

  static saveJSONToFile(jsonData: Array<any> | any, filename: string) {
    const absolutePath = path.resolve(__dirname, '..', '..', 'json', filename);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    fs.writeFile(
      absolutePath,
      JSON.stringify(jsonData, null, 2),
      'utf8',
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  }

  static formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (new String(month).length === 1) {
      return `${year}/0${month}/${day}`;
    }

    year = year % 100;
    return `${day}/${month}/${year}`;
  }

  static existTickerInChart(charData: chartDataType, ticker: string) {
    return charData.stocks.some((stock) => stock.ticker === ticker);
  }

  static makeRentabilyDaily(actualPrice: number, anteriroPrice: number) {
    return ((actualPrice - anteriroPrice) / anteriroPrice) * 100;
  }

  extractText(selector: string): string {
    if (!this.$) throw new Error('Invalid $');
    const element = this.$(selector) || null;
    if (!element) return '';
    return element.text() || '';
  }

  extractElement(selector: string) {
    if (!this.$) throw new Error('Invalid $');
    const element = this.$(selector);
    if (element === null) {
      return undefined;
    }
    return element;
  }

  extractImage(selector: string): string {
    if (!this.$) throw new Error('Invalid $');
    const element = this.$(selector);
    if (element === null) return '';
    try {
      let img = element.attr('data-img') || '';
      img = img.split('(')[1].split(')')[0];
      img = `https://statusinvest.com.br/${img}`;
      return img;
    } catch (err: any) {
      return 'https://spassodourado.com.br/wp-content/uploads/2015/01/default-placeholder.png';
    }
  }

  extractNumber(selector: string): number {
    return Utilities.formateNumber(this.extractText(selector));
  }
}

export default Utilities;
