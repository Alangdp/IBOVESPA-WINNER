import { capitalizeFirstLetter } from "@/Utils/String";
import { useParams } from "react-router-dom";
import B3 from "../../assets/svg/B3.svg";
import { CaretDownIcon, CaretRightIcon } from "@radix-ui/react-icons";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";
import { getPrice } from "@/Utils/ApiUtils";
import { useEffect, useState } from "react";
import { PriceList } from "@/types/Price.type";
import LocalStorage from "@/Utils/LocalStorage";
import { validateToleranceTime } from "@/Utils/Math";
import IndexCard from "./index-card";
import { GridStockPage } from "./StockData";
import TimeOptions from "./timeOptions";
import { IndicatorsData } from "./StockData/indicatorsData";

interface TimeLimits {
  [key: string]: number;
}

interface MarketProps {
  marketName: string;
}

const timeLimits: TimeLimits = {
  "1week": 7,
  "1month": 30,
  "3month": 90,
  "6month": 180,
  "1year": 365,
};

export default function Market({ marketName }: MarketProps) {
  const localStorage = new LocalStorage<PriceList>({
    key: "prices",
  });

  let [priceList, setPriceList] = useState<PriceList>(localStorage.get());
  const [interval, setInteval] = useState<string>("1year");
  const { stockTicker } = useParams();
  const upperStockTicker = stockTicker?.toUpperCase()!;

  let pricesFiltered = priceList[upperStockTicker!]
    ? priceList[upperStockTicker!].price
        .reverse()
        .filter((_, index) => index <= timeLimits[interval])
    : [];

  const fetchPrices = async () => {
    const updateStorage = async () => {
      const pricesData = await getPrice(upperStockTicker!);
      pricesData.timestamp = new Date().getTime();
      const newItem: PriceList = { [`${upperStockTicker}`]: pricesData };
      localStorage.addItem(newItem);
      setPriceList({ ...priceList, ...newItem });
    };

    const item = localStorage.get();

    if (
      item &&
      upperStockTicker &&
      validateToleranceTime((item as PriceList)[upperStockTicker]?.timestamp) &&
      upperStockTicker
    ) {
      return;
    }

    updateStorage();
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const growthOrDown = (priceList: PriceList | null) => {
    if (!priceList) return "#fff";
    const priceData = priceList[upperStockTicker!];
    if (!priceData) return "#fff";
    const price = priceData.price
      .filter((_, index) => index <= timeLimits[interval])
      .map((item) => ({
        date: item.date.split(" ")[0],
        price: item.price,
      }));

    if (price[price.length - 1].price - price[0].price < 0) {
      return "#1ECB4F";
    }

    return "#F46D22";
  };

  return (
    <div className="w-[90%] bg-[#1E1E1E] rounded h-full">
      <div className="info flex flex-col ">
        <div className="selected-market flex p-6 gap-2 text-sm">
          Mercados /
          <p className="opacity-60">{capitalizeFirstLetter(marketName)} / </p>
          <p className="opacity-60">{stockTicker?.toUpperCase()}</p>
        </div>
        <div className="w-full h-full flex justify-center">
          <div className="flag px-4 py-2 text-white w-fit h-fit text-4xl bg-df hover:bg-bl duration-300 rounded-df flex gap-2 items-center group cursor-pointer">
            <img
              src={`http://192.168.1.111:3002/images/avatar/${stockTicker}-logo.jpg`}
              alt={`${capitalizeFirstLetter(marketName)} Flag`}
              className="w-12 rounded-full"
            />
            {capitalizeFirstLetter(marketName?.toLowerCase())}
            <CaretDownIcon className="w-12 h-8 group-hover:h-12 transition-all duration-300" />
          </div>
        </div>
        <div className="indexes px-6 py-12 w-full">
          <div className="title text-3xl flex items-center hover:text-bl duration-300 cursor-pointer w-fit">
            Principais Índices do{" "}
            {capitalizeFirstLetter(marketName?.toLowerCase())}
            <CaretRightIcon className="w-12 h-8" />
          </div>
          <div className="cards grid grid-cols-4 m-4 gap-2">
            <IndexCard Icon={B3} />
            <IndexCard Icon={B3} />
            <IndexCard Icon={B3} />
            <IndexCard Icon={B3} />
          </div>
          <div className="graph w-full flex flex-col justify-center items-center">
            <ResponsiveContainer
              width="90%"
              height={400}
              className="p-2 z-10 bg-zinc-700 rounded-df font-bold"
            >
              <LineChart
                width={730}
                height={250}
                data={pricesFiltered.reverse().map((item) => ({
                  date: item.date.split(" ")[0],
                  price: item.price,
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey="date"
                  interval={Math.round(
                    timeLimits[interval] / (timeLimits[interval] < 91 ? 6 : 9)
                  )}
                />
                <YAxis tickCount={10} domain={['auto', 'auto']}/>
                <Tooltip trigger="hover" />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke={growthOrDown(priceList)}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <TimeOptions interval={interval} setInteval={setInteval} />
          </div>

          <div className="p-4 w-full flex flex-col gap-2">
            <a href="" className="w-fit">
              <div className="title text-2xl flex items-center hover:text-bl duration-300 cursor-pointer w-fit">
                Principais Estatiscas
                <CaretRightIcon className="w-12 h-8" />
              </div>
            </a>
            
            <div className="p-2 bg-[#3F3F3F] rounded border-opacity-60 shadow-xl">
              <GridStockPage ticker={upperStockTicker!}/>
            </div>
          </div>

          <div className="p-4 w-full flex flex-col gap-2">
            <a href="" className="w-fit">
              <div className="title text-2xl flex items-center hover:text-bl duration-300 cursor-pointer w-fit">
                Indicadores Fundamentalistas
                <CaretRightIcon className="w-12 h-8" />
              </div>
            </a>


            <div className="p-2 bg-[#3F3F3F] rounded border-opacity-60 shadow-xl">
              <IndicatorsData ticker={stockTicker!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
