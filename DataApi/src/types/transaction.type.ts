// DEFAULT DATE FORMAT "11/12/2023"

import { CodesNumber, CodesString } from './codes.type';
interface TransactionRequirements {
  ticker: string;
  quantity: number;
  price: number;
  typeCode: 0 | 1 | 2;
  total_value: number;
  broker_code?: number;
  transaction_date: Date;
  user_id: number;
}

type TransactionCodes = CodesNumber & CodesString;

export { TransactionCodes, TransactionRequirements };
