import fs, { stat } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Alter import type
import cheerio from 'cheerio';
import { chartDataType } from '../types/get';
import { index } from 'cheerio/lib/api/traversing';

const __dirname = dirname(fileURLToPath(import.meta.url));
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
    const stringToFormatArray = stringToFormat.split('.');
    if (stringToFormatArray.length > 2)
      return Number(stringToFormatArray.join(''));
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

  static existTickerInChart(charData: chartDataType, ticker: string): boolean {
    if (charData.stocks.some((stock) => stock.ticker === ticker)) return true;
    return false;
  }

  static indexTickerInChart(charData: chartDataType, ticker: string): number {
    return charData.stocks.findIndex((stock) => stock.ticker === ticker);
  }

  static makeRentabilyDaily(actualPrice: number, anteriroPrice: number) {
    return ((actualPrice - anteriroPrice) / anteriroPrice) * 100;
  }

  static formatDateToString(date: Date): string {
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear() % 100;
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    const FDay: string = day < 10 ? '0' + day : day.toString();
    const FMonth: string = month < 10 ? '0' + month : month.toString();
    const FYear: string = year < 10 ? '0' + year : year.toString();
    const FHours: string = hours < 10 ? '0' + hours : hours.toString();
    const FMinutes: string = minutes < 10 ? '0' + minutes : minutes.toString();

    return `${FDay}/${FMonth}/${FYear} 00:00`;
  }

  static formatStringtoDate(dateEntry: string): Date {
    const parts = dateEntry.split(/[\s/:]/);

    const year = parseInt(parts[2]) + 2000;
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[0]);
    const hours = parseInt(parts[3]);
    const minutes = parseInt(parts[4]);
    return new Date(year, month, day, hours, minutes);
  }

  static findClosestDateKey(
    object: any,
    targetDate: string
  ): string | undefined {
    let closestDateKey: string | undefined;
    let smallestDifference: number | undefined;

    for (const dateKey in object) {
      const [dayA, monthA, yearA] = dateKey
        .split('/')
        .map((str) => parseInt(str, 10));
      const dateA = new Date(yearA, monthA - 1, dayA);
      dateA.setHours(0, 0, 0, 0);

      const [dayB, monthB, yearB] = targetDate
        .split('/')
        .map((str) => parseInt(str, 10));
      const dateB = new Date(yearB, monthB - 1, dayB);
      dateB.setHours(0, 0, 0, 0);

      const difference = Math.abs(dateA.getTime() - dateB.getTime());

      if (smallestDifference === undefined || difference < smallestDifference) {
        smallestDifference = difference;
        closestDateKey = dateKey;
      }
    }

    return closestDateKey;
  }

  public static breakArray(array: any[], parts: number) {
    const lastDividends = array.slice(0, parts);
    return lastDividends;
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
