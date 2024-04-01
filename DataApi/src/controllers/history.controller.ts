import { RequestHandler } from 'express';
import axios from 'axios';
import { ResponseProps } from '../types/responses.type';
import { History } from '../Entities/History';
import { TransactionsProps } from '../types/transaction.type';
import { errorResponse, response } from '../utils/Responses';

const getHistory: RequestHandler = async (req, res, next) => {
  try {
    const token: string = req.body.token;
    const responseData = await axios.post(
      'http://localhost:3004/transactions',
      {
        authorization: process.env.SECRET_TOKEN,
        token,
      }
    )

    const data: ResponseProps<TransactionsProps[]> = responseData.data;
    if(!data.data) throw new Error("Invalid Token");
    const transactions = data.data;

    console.log(new Date(transactions[0].transactionDate), typeof transactions[0].transactionDate)

    const history = await History.instanceHistory(transactions);
    return response(res, { status: 200, data: history });
  } catch (error: any) {
    console.log(error)
    return errorResponse(res, error);
  }
};

export { getHistory };
