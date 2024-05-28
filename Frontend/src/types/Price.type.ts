export interface PriceData {
  price: Price[]
  actual: number
  name: string
  ticker: string
}

export interface Price {
  date: string
  price: number
}
