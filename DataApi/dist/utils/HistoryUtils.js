export default class HistoryUtils {
    static convertLastDividendToDividend(lastDividendPayment) {
        const { dataCom, dataEx, dividendType, dividendTypeName, ticker, value } = lastDividendPayment;
        const dividend = {
            date: dataEx,
            ticker: ticker,
            value: value,
            type: dividendType,
        };
        return dividend;
    }
    static dateToString(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const addZero = (value) => {
            return value < 10 ? '0' + value : value;
        };
        return `${addZero(day)}/${addZero(month + 1)}/${year}`;
    }
    static stringToDate(dataString) {
        const partes = dataString.split('/');
        if (partes.length !== 3) {
            console.error('Date format invalid, use: "dd/mm/yyyy".');
            return null;
        }
        const [day, month, year] = partes.map(Number);
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return null;
        }
        const date = new Date(year, month - 1, day);
        return date;
    }
    static formatPriceDate(date) {
        try {
            const [day, month, year] = date.split('/');
            return `${day}/${month}/20${year.split(' ')[0]}`;
        }
        catch (error) {
            return '';
        }
    }
    static indexHistoryPrice(historyPrice, ticker, reusableObject) {
        for (const info of historyPrice) {
            const { date, price } = info;
            const formatedDate = HistoryUtils.formatPriceDate(date);
            if (!reusableObject[formatedDate]) {
                reusableObject[formatedDate] = {};
            }
            reusableObject[formatedDate][ticker] = {
                price: price,
            };
        }
        return reusableObject;
    }
    static indexDividend(dividends, reusableObject) {
        for (const dividend of dividends) {
            const { date, ticker } = dividend;
            if (!reusableObject[date]) {
                reusableObject[date] = {};
            }
            else {
                if (!reusableObject[date][ticker]) {
                    reusableObject[date][ticker] = dividend;
                }
            }
            if (!reusableObject[date][ticker]) {
                reusableObject[date][ticker] = dividend;
            }
            else {
                if (reusableObject[date][ticker].value < dividend.value) {
                    reusableObject[date][ticker] = dividend;
                }
            }
        }
        return reusableObject;
    }
}
