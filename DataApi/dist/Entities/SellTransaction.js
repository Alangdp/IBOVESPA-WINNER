// TODO ALTERAR O SITEMA DE CODIGOS USAR SOMENTE OS NUMEROS
import { Transaction } from '../interfaces/TransactionProtocol';
export default class SellTransaction extends Transaction {
    ticker;
    constructor(requirements, sellData) {
        super(requirements);
        this.ticker = sellData.ticker;
    }
    create(requirements, sellData) {
        return new SellTransaction(requirements, sellData);
    }
    getTicker() {
        return this.ticker;
    }
    getQuantity() {
        return this.quantity;
    }
    getPrice() {
        return this.price;
    }
}
export { SellTransaction };
