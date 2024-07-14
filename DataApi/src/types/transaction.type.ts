// DEFAULT DATE FORMAT "11/12/2023"

export const validTypes = ['BUY', 'SELL', 'JCP', 'DIVIDEND'];

export interface TransactionsProps {
  id: number;
  ticker: string;
  transactionDate: Date;
  price: number;
  quantity: number;
  totalValue: number;
  type: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
