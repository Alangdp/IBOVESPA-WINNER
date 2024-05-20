import { VariationCard } from "./Card";

import { useEffect, useState } from "react";
import { useMock } from "../SideBar/SideContext";
import { PortifolioCard } from "./Card/CardPortifolio";
import { useAuth } from "@/contexts/AuthContext";
import { ChartProps } from "@/types/Chart.type";
import { AnimatePresence, motion } from "framer-motion";
import HistoryChart from "./HistoryChart";
import ChartHeader from "./HistoryChart/header";
import { SimplifiedDataHistory } from "@/types/History.type";
import { getVariations } from "@/Utils/ApiUtils";
import { HomeItens } from "@/types/HomeItens.type";

interface DashBoardProps {
  chart: ChartProps;
  history: SimplifiedDataHistory;
}

export function DashBoard({ chart, history }: DashBoardProps) {
  const { token } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string>("1hr");
  const [variations, setVariations] = useState<HomeItens>();

  const fetchHomeData = async () => {
    if (!variations) setVariations(await getVariations());
    console.log(variations)
  };

  useEffect(() => {
    fetchHomeData();
  }, []);
  return (
    <AnimatePresence>
      <motion.main
        className="p-4 flex flex-col gap-4 h-[90vh]"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
      >
        <div className="top-cards xl:flex grid-cols-2 grid w-full h-fit gap-7">
          {variations?.high &&
            variations.high.map((item, index) => {
              if (index > 1) return <></>;
              return (
                <VariationCard
                  key={item.ticker}
                  className="p-2 md:w-full"
                  variation={Number(
                    item.currentPrice.split("R$")[1].trim().replace(",", ".")
                  )}
                  price={Number(
                    item.variation
                      .split("arrow_upward")[1]
                      .replace("%", "")
                      .replace(",", ".")
                  )}
                  name={item.ticker}
                  ticker={item.ticker.split(" ")[0]}
                />
              );
            })}

          {variations?.lows &&
            variations.lows.map((item, index) => {
              if (index > 1) return <></>;
              return (
                <VariationCard
                  className="p-2 md:w-full"
                  variation={-Number(
                    item.currentPrice.split("R$")[1].trim().replace(",", ".")
                  )}
                  price={Number(
                    item.variation
                      .split("arrow_downward")[1]
                      .replace("%", "")
                      .replace(",", ".")
                  )}
                  name={item.ticker}
                  ticker={item.ticker.split(" ")[0]}
                />
              );
            })}
        </div>

        <div className="w-full h-[64vh] grid grid-cols-6 gap-4">
          <div className="col-span-2 grid grid-rows-6 h-[65vh] gap-4">
            <div className="row-span-1 h-full bg-blue-500 rounded-df shadow-lg">
              <h4 className="text-xl text-white pl-4 pt-2 font-semibold">
                Carteira
              </h4>
              <div className="flex pl-4 items-center gap-4">
                <p className="text-2xl font-semibold text-white">
                  R$ {chart ? chart.globalTotalValue.toFixed(2) : ""}
                </p>
                <p className="text-[#1ECB4F] font-semibold">
                  {chart
                    ? `${(chart.globalRentability * 100).toFixed(2)}%`
                    : ""}
                </p>
              </div>
            </div>
            <div className="row-span-5 h-full bg-[#1B2028] shadow-lg rounded-df">
              <h4 className="text-xl text-white p-4 font-semibold">
                Portifolio
              </h4>
              <div className="cards p-4 flex flex-col gap-2 overflow-y-scroll h-[88%] no-scrollbar">
                {chart &&
                  Object.keys(chart.individualRentability).map((ticker) => (
                    <PortifolioCard
                      actualValue={
                        chart.individualRentability[ticker].valueInvested
                      }
                      quantity={chart.individualRentability[ticker].quantity}
                      totalValue={Number(
                        chart.individualRentability[ticker].valueTotal.toFixed(
                          2
                        )
                      )}
                      ticker={ticker}
                      variation={Number(
                        (
                          chart.individualRentability[ticker].rentability * 100
                        ).toFixed(2)
                      )}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="col-span-4 bg-[#1B2028] grid-rows-6 shadow-lg rounded-df">
            <div className="p-4 w-full flex items-center justify-between">
              <ChartHeader />
            </div>
            <HistoryChart
              history={history}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
