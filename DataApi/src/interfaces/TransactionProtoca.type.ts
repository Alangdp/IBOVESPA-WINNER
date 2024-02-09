import { TransactionCodes } from '../types/transaction.type';

// TODO ALTERAR O SITEMA DE CODIGOS USAR SOMENTE OS NUMEROS

export default interface TransactionProtocol {
  codes: TransactionCodes;

  getTicker(): string;
  getQuantity(): number;
  getPrice(): number;
  getTotalValue(): number;
  getTransactionDate(): string;
  getUserId(): number;
  getType(): string;
  // TODO: IMPLEMENTAR BROKER
  // _broker_code: string

  isBuy(): boolean;
  isSell(): boolean;
  isDividend(): boolean;
  totalValue(): number;
}

export { TransactionProtocol };
