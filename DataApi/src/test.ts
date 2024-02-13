import { MainPrices } from "./types/prices.type";
import apiGetter from "./utils/ApiGetter.js";

async function name() {
  const data = await apiGetter<MainPrices[]>({
    method: "POST",
    params: {
      'ticker': 'BBAS3',
      'type': 4,
      'currences[]': '1',
    },
    headers: {
      "Content-Type": "application/json",
    },
  },
  'tickerprice'
  )

  console.log(data)
}

name()