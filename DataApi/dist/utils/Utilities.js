// Alter import type
// Não existe funções ou váriavies em interfaces Typescript
// Logo torna inviável a criação de um Protocol para a classe de utilidades.
// FIXME Revisar SOLID mais tarde
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
    static findIndexOfGreatest(array) {
        var greatest;
        var indexOfGreatest = -1;
        for (var i = 0; i < array.length; i++) {
            if (!greatest || array[i] > greatest) {
                greatest = array[i];
                indexOfGreatest = i;
            }
        }
        return indexOfGreatest;
    }
}
