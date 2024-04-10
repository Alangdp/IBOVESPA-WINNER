import { capitalizeFirstLetter } from "@/Utils/String";
import { useParams } from "react-router-dom";

interface MarketProps {
  marketName: string;
}

import BrazilFlag from "../../assets/svg/flags/Brazil.svg";
import B3 from "../../assets/svg/B3.svg";
import { CaretDownIcon, CaretRightIcon } from "@radix-ui/react-icons";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import { getPrice } from "@/Utils/ApiUtils";
import { useEffect, useRef, useState } from "react";
import { PriceData } from "@/types/Price.type";
import LocalStorage from "@/Utils/LocalStorage";
import { validateToleranceTime } from "@/Utils/Math";

export default function Market({ marketName }: MarketProps) {
  const localStorage = new LocalStorage<PriceData, PriceData[]>({
    key: "prices",
  });
  const [prices, setPrices] = useState<PriceData>();

  const { stockTicker } = useParams();
  const UpperStockTicker = stockTicker?.toUpperCase();

  const fetchPrices = async () => {
    const updateStorage = async () => {
      const pricesData = await getPrice(UpperStockTicker!);
      pricesData.timestamp = new Date().getTime();
      localStorage.addItem(pricesData);
      setPrices(pricesData);
    };

    const items = localStorage.get() || [];

    const filteredItems = items.filter(
      (item) => item.ticker === UpperStockTicker
    );

    if (
      filteredItems.length > 1 &&
      validateToleranceTime(filteredItems[0].timestamp)
    ) {
      setPrices(filteredItems[0]);
      return;
    }

    updateStorage();
  };

  useEffect(() => {
    fetchPrices();
  }, []);

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
              src={BrazilFlag}
              alt={`${capitalizeFirstLetter(marketName)} Flag`}
              className="w-12 rounded-full"
            />
            {capitalizeFirstLetter(marketName?.toLowerCase())}
            <CaretDownIcon className="w-12 h-8 group-hover:h-12 transition-all duration-300" />
          </div>
        </div>
        <div className="indexes px-6 py-12 w-full">
          <div className="title text-3xl flex items-center hover:text-bl duration-300 cursor-pointer">
            Principais Índices do{" "}
            {capitalizeFirstLetter(marketName?.toLowerCase())}
            <CaretRightIcon className="w-12 h-8" />
          </div>
          <div className="cards grid grid-cols-4 m-4 gap-2">
            <div className="card grid grid-cols-4 items-center justify-center cursor-pointer hover:bg-[#1B2028] duration-300 py-2 rounded-df">
              {/* {Foto Indicie} */}
              <div className="img flex justify-center">
                <img src={B3} alt="" className="w-12 rounded-full" />
              </div>
              <div className="flex flex-col col-span-2">
                <p>{/* {Nome indiice} */} Indice Ibovespa</p>
                <span className="text-sm flex gap-1">
                  {" "}
                  <p className="opacity-60">126759,12</p> BRL{" "}
                  <p className="text-red-500 opacity-80">-12%</p>
                </span>
              </div>
            </div>

            <div className="card grid grid-cols-4 items-center justify-center cursor-pointer hover:bg-[#1B2028] duration-300 py-2 rounded-df">
              {/* {Foto Indicie} */}
              <div className="img flex justify-center">
                <img src={B3} alt="" className="w-12 rounded-full" />
              </div>
              <div className="flex flex-col col-span-2">
                <p>{/* {Nome indiice} */} Indice Ibovespa</p>
                <span className="text-sm flex gap-1">
                  {" "}
                  <p className="opacity-60">126759,12</p> BRL{" "}
                  <p className="text-red-500 opacity-80">-12%</p>
                </span>
              </div>
            </div>

            <div className="card grid grid-cols-4 items-center justify-center cursor-pointer hover:bg-[#1B2028] duration-300 py-2 rounded-df">
              {/* {Foto Indicie} */}
              <div className="img flex justify-center">
                <img src={B3} alt="" className="w-12 rounded-full" />
              </div>
              <div className="flex flex-col col-span-2">
                <p>{/* {Nome indiice} */} Indice Ibovespa</p>
                <span className="text-sm flex gap-1">
                  {" "}
                  <p className="opacity-60">126759,12</p> BRL{" "}
                  <p className="text-red-500 opacity-80">-12%</p>
                </span>
              </div>
            </div>

            <div className="card grid grid-cols-4 items-center justify-center cursor-pointer hover:bg-[#1B2028] duration-300 py-2 rounded-df">
              {/* {Foto Indicie} */}
              <div className="img flex justify-center">
                <img src={B3} alt="" className="w-12 rounded-full" />
              </div>
              <div className="flex flex-col col-span-2">
                <p>{/* {Nome indiice} */} Indice Ibovespa</p>
                <span className="text-sm flex gap-1">
                  {" "}
                  <p className="opacity-60">126759,12</p> BRL{" "}
                  <p className="text-red-500 opacity-80">-12%</p>
                </span>
              </div>
            </div>
          </div>
          <div className="graph w-full">
            <ResponsiveContainer width="100%" height={400} className="p-2" >
              <LineChart
                width={730}
                height={250}
                data={prices?.price.map((item) => {
                  return { date: item.date.split(" ")[0], price: item.price };
                })}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis  dataKey="date" interval={300}/>
                <Tooltip trigger="hover" label={"Teste"}/>
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  activeDot={false}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
