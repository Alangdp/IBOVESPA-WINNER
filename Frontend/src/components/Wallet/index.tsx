import { AnimatePresence, motion } from "framer-motion";

import walletIcon from "../../assets/svg/Wallet-icon.svg";
import mathPlus from "../../assets/svg/Plus Math.svg";

import BuySellModal from "../Transactions/buySellModal";
import { ChartProps } from "@/types/Chart.type";
import { useEffect, useState } from "react";
import { StockProps } from "@/types/Stock.type";
import { PriceData } from "@/types/Price.type";
import { getPrice } from "@/Utils/ApiUtils";
import { PortifolioChart } from "./Portifolio";

interface WalletProps {
  tickers: string[];
  chart: ChartProps;
}

export default function Wallet({tickers, chart}: WalletProps) {
  const [stocks, setStocks] = useState<PriceData[]>()
  const tickersChart = chart ? Object.keys(chart.individualRentability) : []

  const fetchStocks = async () => {
    if(!stocks && tickersChart.length !== 0) {
      const pricePromises = tickersChart.map(ticker => getPrice(ticker));
      const prices = await Promise.all(pricePromises);
  
      setStocks(prices);
    }

  }

  useEffect( () => {
    fetchStocks()
  }, [tickersChart])

  return (
    <AnimatePresence>
      <motion.main
        className="p-4 flex flex-col gap-4 h-[90vh] relative"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
      >
        <div className="  h-[200px] bg-df rounded-df drop-shadow-lg text-white">
          <div className="p-4 flex flex-col justify-center h-full">
            <h2 className="text-2xl font-bold">Lista de observação</h2>
            <p className="text-sm font-light opacity-60">
              Atualizado 23/06/2024
            </p>

            <div className="mt-[20px] h-full flex justify-between">
              <div className="left">
                <div className="flex gap-2 items-center">
                  <img
                    src={walletIcon}
                    alt="Wallet Icon"
                    className="w-8 h-auto"
                  />
                  <p className="text-xl font-bold">Saldo Da Carteira</p>
                </div>
                <h4 className="font-medium text-xl px-12">R$ 202,01</h4>
              </div>

              <div className="cards grid grid-cols-3 gap-8 mr-20">
                <div className="card bg-bl w-[170px] h-24 rounded-df">
                  <span className="p-2 flex gap-2">
                    <img
                      src={walletIcon}
                      alt="Wallet Icon"
                      className="w-6 h-auto"
                    />
                    <h3 className="font-medium">Total Investido</h3>
                  </span>
                  <p className="p-2 mt-4">R$ {chart.globalInvested}</p>
                </div>

                <div className="card bg-[#FFA800] w-[170px] h-24 rounded-df">
                  <span className="p-2 flex gap-2">
                    <img
                      src={walletIcon}
                      alt="Wallet Icon"
                      className="w-6 h-auto"
                    />
                    <h3 className="font-medium">Retorno Total</h3>
                  </span>
                  <p className="p-2 mt-4">R$ {chart.globalTotalValue > chart.globalInvested ? (chart.globalTotalValue - chart.globalInvested).toFixed(2) : `-${(chart.globalInvested - chart.globalTotalValue).toFixed(2)}`}</p>
                </div>

                <div className="card bg-[#12B76A] w-[170px] h-24 rounded-df">
                  <span className="p-2 flex gap-2">
                    <img
                      src={walletIcon}
                      alt="Wallet Icon"
                      className="w-6 h-auto"
                    />
                    <h3 className="font-medium">Rentabilidade</h3>
                  </span>
                  <p className="p-2 mt-4">{(chart.globalRentability * 100).toFixed(2)} %</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[620px] grid text-white grid-cols-4 gap-4">
          <div className="col-span-1 h-[620px] bg-df rounded-df drop-shadow-lg p-4">
            <h2 className="text-2xl font-bold">Patrimônio</h2>
            <div className="values flex flex-col">
              <p className="text-[#1ECB4F] font-medium text-xl">R$ {chart.globalTotalValue.toFixed(2)}</p>
              <p className="text-[16px] flex gap-2">
                Aportado <p className="font-medium">{chart.globalInvested.toFixed(2)}</p>
              </p>
              <p className="text-[16px] flex gap-2">
                Variação <p className="font-medium">{chart.globalRentability > 0 ? "+" : "" }{(chart.globalInvested * chart.globalRentability).toFixed(2)} ({chart.globalRentability > 0 ? `+${(chart.globalRentability * 100).toFixed(2)}`: `-${(chart.globalRentability * 100).toFixed(2)}`})</p>
              </p>
            </div>
            <PortifolioChart data={[{name: 'Ações', value: Number(chart.globalTotalValue.toFixed(2))}]} />
          </div>
          <div className="col-span-3 h-[620px] bg-df rounded-df drop-shadow-lg p-4 w-">
            <h2 className="text-2xl font-bold">Patrimônio</h2>
            <div className="h-[500px] w-full overflow-hidden">
              <div className="overflow-y-auto no-scrollbar h-full">
                <table className="min-w-full divide-y divide-gray-200/20 divide-opacity-50">
                  <thead className="">
                    <tr>
                      <th className="text-center px-6 py-3">Ticker/valor</th>
                      <th className="text-center px-6 py-3">Quantidade</th>
                      <th className="text-center px-6 py-3">P.Médio</th>
                      <th className="text-center px-6 py-3">Preço</th>
                      <th className="text-center px-6 py-3">Retorno</th>
                      <th className="text-center px-6 py-3">% Ações</th>
                      <th className="text-center px-6 py-3">% Carteira</th>
                      <th className="text-center px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/20 divide-opacity-50">
                    {Object.keys(chart.individualRentability).map((ticker, index) => (
                      <tr key={index}>
                        <td className="text-center px-6 py-4">
                          <div className="flex flex-col items-center justify-center text-center">
                            <p className="font-medium text-lg">{ticker}</p>
                            <p className="text-bl font-medium">{chart.individualRentability[ticker].valueTotal.toFixed(2)} R$</p>
                          </div>
                        </td>
                        <td className="text-center px-6 py-4">{chart.individualRentability[ticker].quantity}</td>
                        <td className="text-center px-6 py-4">{chart.individualRentability[ticker].medianPrice.toFixed(2)}</td>
                        <td className="text-center px-6 py-4">{stocks ? stocks[tickersChart.findIndex(index => index === ticker)].actual : "-"} </td>
                        <td className="text-center px-6 py-4">
                          <div className="flex flex-col items-center justify-center">
                            <p>{stocks ? (((stocks[tickersChart.findIndex(index => index === ticker)].actual - chart.individualRentability[ticker].medianPrice) / chart.individualRentability[ticker].medianPrice) * chart.individualRentability[ticker].quantity).toFixed(2) +"R$" : "-"} </p>
                            <p>{stocks ? ((stocks[tickersChart.findIndex(index => index === ticker)].actual - chart.individualRentability[ticker].medianPrice) / chart.individualRentability[ticker].medianPrice * 100).toFixed(2) + "%" : "-"}</p>
                          </div>
                        </td>
                        <td className="text-center px-6 py-4">{((chart.individualRentability[ticker].valueTotal / chart.globalTotalValue) * 100).toFixed(2) + "%"}</td>
                        <td className="text-center px-6 py-4">100%</td>
                        <td className="text-center px-6 py-4">
                          <BuySellModal tickers={tickers} className="" ticker={ticker} Text={<img src={mathPlus} alt="Add" className="hover:opacity-50 duration-300"/>}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
