import { PriceHistory } from "./Stock.type";

export interface VariableProps {
  ticker: string,
  name: string,
  activeValue: number,
  shareQuantity: number,
  actualPrice: number,
  priceHistory: PriceHistory[]
}