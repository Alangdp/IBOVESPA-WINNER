import { randomUUID } from 'crypto';
import { TransactionProps } from '../types/transaction.type';
import { DateFormatter } from '../utils/DateFormater.js'

export abstract class Transaction implements TransactionProps {
  userId: number;
  quantity: number;
  type: string;
  price: number;
  transactionDate: Date;
  trasactionDateString: string;
  description?: string | undefined;
  id?: string;

  constructor({
    price,
    quantity,
    transactionDate,
    trasactionDateString,
    type,
    userId,
  }: TransactionProps) {
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
