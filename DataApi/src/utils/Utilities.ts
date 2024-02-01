// Alter import type
export default class Utilities {
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

  static msToHours(ms: number): number {
    return ms / (1000 * 60 * 60);
  }

  static uniqueElements<T>(array: T[]): T[] {
    return array.filter((value, index, self) => self.indexOf(value) === index);
  }
}
