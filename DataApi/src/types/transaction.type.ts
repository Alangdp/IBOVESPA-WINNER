// DEFAULT DATE FORMAT "11/12/2023"
interface CodesNumber {
  0: 'BUY';
  1: 'SELL';
  2: 'DIVIDEND';
}

interface CodesString {
  BUY: 0;
  SELL: 1;
  DIVIDEND: 2;
}

type TransactionCodes = CodesNumber & CodesString;

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

export { TransactionCodes, TransactionRequirements };
