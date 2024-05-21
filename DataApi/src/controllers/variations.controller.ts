import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/Responses';
import TickerFetcher from '../utils/Fetcher';
import { HomeItens } from '../types/HomeItens.type';
import CacheJSON from '../utils/CacheJson';
import { downloadImage } from 'plotly.js';

const getVariations: RequestHandler = async (req, res, next) => {
  try {
    const cache = new CacheJSON<HomeItens, CacheProps<HomeItens>>({
      duration: 60,
      path: "./json/HomeCache.json"
    });


    console.log(cache.validDuration())    
    if(!cache.validDuration()) {
      const variations = await TickerFetcher.getHighsAndLows();
      if(!variations) throw new Error("Error Getting Variations");    
      cache.replaceData(variations, "HomeItems");
    }

    return response(res, {status: 200, data: cache.get()[0].data[0]});
  } catch (error: any) {
    return errorResponse(res, error);
  }
};

export { getVariations };
