// export interface TransactionsProps {
//   ticker: string
//   transactionDate: Date
//   transactionDateString: Date
//   quantity: number
//   price: number
//   type: "BUY" | "SELL";
// }

export interface TransactionsProps {
  id: number
  ticker: string
  transactionDate: Date
  price: number
  quantity: number
  totalValue: number
  type: string
  userId: number
  createdAt: string
  updatedAt: string
}
