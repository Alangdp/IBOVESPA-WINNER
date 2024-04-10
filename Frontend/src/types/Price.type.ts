export interface PriceData {
  price: Omit<Price[], '_id'>
  actual: number
  name: string
  ticker: string
  timestamp: number
}

export interface Price {
  date: string
  price: number
  _id: string
}
