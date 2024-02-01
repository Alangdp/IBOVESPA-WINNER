// Alter import type
export default class Utilities {
    static formateNumber(stringToFormat) {
        const stringToFormatArray = stringToFormat.split('.');
        if (stringToFormatArray.length > 2)
            return Number(stringToFormatArray.join(''));
        stringToFormat = stringToFormat.replace(/[^\d,.]/g, '');
        stringToFormat = stringToFormat.replace(',', '.');
        try {
            return Number(stringToFormat);
        }
        catch (err) {
            throw new Error('Invalid String');
        }
    }
    static msToHours(ms) {
        return ms / (1000 * 60 * 60);
    }
    static uniqueElements(array) {
        return array.filter((value, index, self) => self.indexOf(value) === index);
    }
}
