// TODO ALTERAR O SITEMA DE CODIGOS USAR SOMENTE OS NUMEROS
import { Transaction } from '../interfaces/TransactionProtocol.js';
export default class BuyTransaction extends Transaction {
    ticker;
    constructor(requirements, buyData) {
        super(requirements);
        this.ticker = buyData.ticker;
    }
    static create(requirements, sellData) {
        return new BuyTransaction(requirements, sellData);
    }
    getQuantity() {
        return this.quantity;
    }
    getPrice() {
        return this.price;
    }
    getTicker() {
        return this.ticker;
    }
}
export { BuyTransaction };
