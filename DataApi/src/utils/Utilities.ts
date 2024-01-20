// Alter import type
import cheerio from 'cheerio';
import { index } from 'cheerio/lib/api/traversing';

export default class Utilities {
  private $?: cheerio.Root;

  constructor(html?: string) {
    if (html) this.$ = cheerio.load(html);
  }

  static range(n: Number): Array<number> {
    return [...Array(n).keys()];
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
