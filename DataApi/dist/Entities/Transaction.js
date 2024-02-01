import HistoryUtils from '../utils/HistoryUtils.js';
export default class Transaction {
    static codes = {
        0: 'BUY',
        1: 'SELL',
        2: 'DIVIDEND',
        BUY: 0,
        SELL: 1,
        DIVIDEND: 2,
    };
    _ticker;
    _quantity;
    _price;
    _total_value;
    _transaction_date;
    _user_id;
    _type;
    // TODO: IMPLEMENTAR BROKER
    // _broker_code: string
    isBuy() {
        return this._type === Transaction.codes[0];
    }
    isSell() {
        return this._type === Transaction.codes[1];
    }
    isDividend() {
        return this._type === Transaction.codes[2];
    }
    calculeteTransactionValue() {
        return this._quantity * this._price;
    }
    constructor(requirements) {
        const { typeCode } = requirements;
        this._ticker = requirements.ticker;
        this._type = Transaction.codes[typeCode];
        this._quantity = requirements.quantity;
        this._price = requirements.price;
        this._total_value = this.calculeteTransactionValue();
        this._transaction_date = HistoryUtils.dateToString(requirements.transaction_date);
        this._user_id = requirements.user_id;
    }
    get ticker() {
        return this._ticker;
    }
    get quantity() {
        return this._quantity;
    }
    get price() {
        return this._price;
    }
    get total_value() {
        return this._total_value;
    }
    get transaction_date() {
        return this._transaction_date;
    }
    get user_id() {
        return this._user_id;
    }
    get type() {
        return this._type;
    }
}
function makeRequirements(ticker, quantity, price, typeCode, transaction_date, user_id) {
    return {
        ticker: ticker,
        quantity: quantity,
        price: price,
        typeCode: typeCode,
        transaction_date: transaction_date,
        user_id: user_id,
    };
}
export { Transaction };
