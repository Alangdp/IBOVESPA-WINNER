import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/Responses';
import TickerFetcher from '../utils/Fetcher';

const getVariations: RequestHandler = async (req, res, next) => {
  try {
    const variations = await TickerFetcher.getHighsAndLows();
    if(!variations) throw new Error("Error Getting Variations");

    return response(res, {status: 200, data: variations});
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export { getVariations };
