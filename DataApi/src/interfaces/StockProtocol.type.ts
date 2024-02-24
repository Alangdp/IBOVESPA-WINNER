import { Variable } from '../Entities/Variable';
import {
  StockProps,
} from '../types/stock.types';

export interface StockProtocol extends Variable, StockProps{
  calculateRentability(actualPrice: number, referencePrice: number): number;
}
