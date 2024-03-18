export interface TransactionsProps {
  ticker: string
  transactionDate: Date
  transactionDateString: Date
  quantity: number
  price: number
  type: "BUY" | "SELL";
}

