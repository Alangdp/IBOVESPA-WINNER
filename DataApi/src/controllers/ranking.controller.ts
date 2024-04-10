import { RequestHandler } from 'express';
import { Comparator } from '../Entities/Comparator.js';
import Database from '../utils/JsonDatabase.js';
import { Pontuation } from '../Entities/Pontuation.js';
import { errorResponse, response } from '../utils/Responses.js';

const getRank: RequestHandler = async (req, res, next) => {
  try {
    const db = new Database<Pontuation[]>('../../json/Ranking.json');
    return response(res, { status: 200, data: db.get() });
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export { getRank };
