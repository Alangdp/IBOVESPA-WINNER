export type TransactionType  = "BUY" | "SELL";

export interface TransactionsProps {
  img?: string
  ticker: string
  name: string
  transactionDate: Date
  transactionDateString: string
  quantity: number
  price: number
  type: TransactionType
}