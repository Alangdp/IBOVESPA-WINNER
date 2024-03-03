import { StockProtocol } from '../interfaces/StockProtocol.type';
import { Pontuation } from '../Entities/Pontuation';

// TODO - REFAZER TUDO

export interface BazinMethods {
  // PRIVATE
  // validate(stock: StockProtocol): void;
  constistentDividend(): boolean;
  crescentDividend(): boolean;
  makePoints(stock: StockProtocol): Pontuation;
}

export abstract class BazinProtocol {
  protected actualDividends: number = 0;
  protected points = 0;
  protected maxPrice?: number;
  protected dividendYieldMedian: number = 0;
  protected dividendYieldAverage: number = 0;
  protected lastDividendYieldBrute: number[] = [];

  protected lastDividendsValue: number[] = [];
  protected lastDividendsYield: number[] = [];
}
