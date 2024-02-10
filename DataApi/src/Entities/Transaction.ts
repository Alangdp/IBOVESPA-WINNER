export interface TransactionHistory {
  getTicker(): string;
  getTransactionDate(): Date;
  getTransactionDateString(): string;

  getQuantity(): number;
  getPrice(): number;
  getType(): string;
}
