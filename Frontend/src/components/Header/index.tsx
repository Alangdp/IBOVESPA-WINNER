import { useState, useEffect } from "react";
import axios from "axios";

import {
  MagnifyingGlassIcon,
  BellIcon,
  ArrowDownIcon,
} from "@radix-ui/react-icons";

interface headerProps {
  title: string
}

export function Header({ title }: headerProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  let mockData: string[] = []
  
  function getTickers() {
    let executed = false;
  
    return async function() {
      if (!executed) {
        const response = await axios.get("http://localhost:3002/stock/tickers");
        const data: string[] = response.data.tickers;
        mockData = data;
        executed = true;
      }
    };
  }
  
  const getTickersFn = getTickers();
  
  useEffect(() => {
    getTickersFn();
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      const results = mockData.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <div className="content bg-zinc-900 flex w-full text-lg">
      <main className="w-full">
        <nav className="Header flex items-center justify-around mt-2">
          <h2 className="font-semibold text-3xl text-white">{title}</h2>
          <div className="search p-2 bg-[#1B2028] text-[#9E9E9E] rounded-df w-1/4 flex items-center justify-between">
            <div className="relative">
              <input
                type="text"
                placeholder="Digite para buscar..."
                value={searchTerm}
                onChange={handleChange}
                onBlur={() => setShowResults(false)}
                className=" bg-[#1B2028] outline-none"
              />
              {mockData}
              <div className="grid grid-cols-1 divide-y absolute top-10 overflow-hidden rounded w-fit">
                {showResults &&
                  searchResults.map((item, index) => (
                    <div
                      key={index}
                      className={"p-2 bg-[#1B2028] hover:bg-[#2C313C] cursor-pointer text-zinc-400 w-fit flex"}
                    >
                      <img src={`http://localhost:3002/static/imgs/logos/${item}-logo.jpg`} alt="" />
                      {item}
                    </div>
                  ))
                }
              </div>
            </div>
            <MagnifyingGlassIcon className="w-6 h-6" />{" "}
          </div>

          <div className="notify-user flex justify-between items-center gap-12">
            <div className="notification p-2 rounded-df bg-[#1B2028] ">
              <BellIcon className="w-6 h-6 text-white" />
            </div>
            <div className="user flex p-2 items-center justify-around">
              <div className="user-photo bg-[#9E9E9E] p-5 rounded-df"></div>
              <div className="user-name text-white ml-2 text-base flex gap-2 items-center">
                <p>User</p>
                <ArrowDownIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </nav>
      </main>
    </div>
  );
}
