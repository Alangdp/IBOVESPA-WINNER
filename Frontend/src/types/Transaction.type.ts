export type TransactionType  = "BUY" | "SELL";

export interface TransactionsProps {
  id: number
  ticker: string
  transactionDate: string
  price: number
  quantity: number
  totalValue: number
  type: string
  userId: number
}