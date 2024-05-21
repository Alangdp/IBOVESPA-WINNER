import { useState, useEffect } from "react";
import axios from "axios";

import {
  MagnifyingGlassIcon,
  BellIcon,
  ArrowDownIcon,
} from "@radix-ui/react-icons";
import { TickerItem } from "./TickerItem";
import { ResponseProps } from "@/types/Response.type";

interface headerProps {
  title: string;
}

export function Header({ title }: headerProps) {
  const STOCK_API_URL = import.meta.env.VITE_STOCK_API_URL

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [finded, setFinded] = useState<string[]>([]);
  const [tickers, setTickers] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://${STOCK_API_URL}/stock/tickers`);
      const data:ResponseProps<string[]> = response.data;

      setTickers(data.data ?? []);
    };
    fetchData();
  }, []);

  function searchTickers(toFind: string) {
    const filtredTickers: string[] = [];
    if (toFind.length < 2) {
      setFinded([]);
      return;
    }
    for (let i = 0; i < tickers.length; i++) {
      if (tickers[i].includes(toFind)) filtredTickers.push(tickers[i]);
      continue;
    }

    setFinded(filtredTickers);
  }

  return (
    <nav className="w-full">
      <nav className="Header flex items-center justify-around mt-2">
        <h2 className="font-semibold text-3xl text-white">{title}</h2>
        <div className="relative search p-2 bg-df text-[#9E9E9E] rounded-df w-1/4 flex items-center justify-between">
          <div className="flex w-max">
            <input
              type="text"
              placeholder="Digite para buscar..."
              onBlur={() => setShowResults(false)}
              onFocus={() => setShowResults(true)}
              onChange={(e) => {
                const value = e.target.value.toUpperCase();
                setSearchTerm(value);
                searchTickers(value);
              }}
              className=" bg-df outline-none w-max"
              value={searchTerm}
            />
            {finded.length > 0 && showResults && (
              <div className="grid grid-cols-1 absolute top-14 overflow-hidden w-full gap-1 right-0 divide-x-y divide-zinc-600">
                {finded.map((item, index) => {
                  if (item.includes(searchTerm) && showResults) {
                    if (index >= 5) return;
                    return <TickerItem index={index} ticker={item} />;
                  }
                })}
              </div>
            )}
          </div>
          <MagnifyingGlassIcon className="w-6 h-6" />{" "}
        </div>

        <div className="notify-user flex justify-between items-center gap-12">
          <div className="notification p-2 rounded-df bg-df cursor-pointer">
            <BellIcon className="w-6 h-6 text-white" />
          </div>
          <div className="user flex p-2 items-center justify-around">
            <div className="user-photo bg-[#9E9E9E] p-5 rounded-df  cursor-pointer"></div>
            <div className="user-name text-white ml-2 text-base flex gap-2 items-center  cursor-pointer">
              <p>User</p>
              <ArrowDownIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </nav>
    </nav>
  );
}
