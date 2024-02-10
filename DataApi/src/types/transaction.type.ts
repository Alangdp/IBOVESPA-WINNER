// DEFAULT DATE FORMAT "11/12/2023"

export interface TransactionProps {
  id?: string;
  userId: number;
  quantity: number;
  type: string;
  price: number;
  transactionDate: Date;
  trasactionDateString?: string;
  description?: string;
}
