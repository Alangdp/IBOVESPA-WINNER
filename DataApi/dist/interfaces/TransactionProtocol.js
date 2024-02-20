import { randomUUID } from 'crypto';
import { DateFormatter } from '../utils/DateFormater.js';
export class Transaction {
    userId;
    quantity;
    type;
    price;
    transactionDate;
    trasactionDateString;
    description;
    id;
    constructor({ price, quantity, transactionDate, trasactionDateString, type, userId, }) {
        this.id = randomUUID();
        this.price = price;
        this.quantity = quantity;
        this.transactionDate = transactionDate;
        this.trasactionDateString = DateFormatter.dateToString(transactionDate);
        this.type = type;
        this.userId = userId;
        this.makeDescription();
    }
    makeDescription() {
        this.description = `
      Está uma transaçao do tipo ${this.type} \n
      Envoldendo ${this.quantity} de itens no valor total de ${this.quantity * this.price} \n
      Registrado sobre o identificador ${this.id}
    `;
    }
    getType() {
        return this.type;
    }
    totalValue() {
        const { quantity, price } = this;
        return quantity * price;
    }
    getTransactionDate() {
        return this.transactionDate;
    }
    getTransactionDateString() {
        return this.trasactionDateString;
    }
}
