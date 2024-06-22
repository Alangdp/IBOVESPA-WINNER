import { useParams } from "react-router-dom";
import { CaretRightIcon, QuoteIcon } from "@radix-ui/react-icons";
import { getStock } from "@/Utils/ApiUtils";
import LocalStorage from "@/Utils/LocalStorage";
import { validateToleranceTime } from "@/Utils/Math";
import PriceChart from "./PriceChart";
import { useEffect, useState } from "react";
import { StockProps } from "@/types/Stock.type";
import { FinancialIndicators } from "@/types/Indicators.type";
import ChartSvg from "@/assets/svg/Chart.svg";

interface MarketProps {
  marketName: string;
}

interface StockList {
  [key: string]: StockProps;
}

export default function Market({ marketName }: MarketProps) {
  const localStorage = new LocalStorage<StockList>({ key: "stocks" });
  const [stock, setStock] = useState<StockProps>();
  const { stockTicker } = useParams();
  const upperStockTicker = stockTicker?.toUpperCase()!;

  const prices = stock?.priceHistory || [];
  const indicators: FinancialIndicators = stock?.indicators ?? {};

  const fetchPrices = async () => {
    const updateStorage = async () => {
      const stockData = await getStock(upperStockTicker!);
      stockData.timestamp = new Date().getTime();
      localStorage.addItem({ [upperStockTicker!]: stockData });
      setStock(stockData);
    };

    const item = localStorage.get() as StockList;

    if (
      item &&
      upperStockTicker &&
      validateToleranceTime(item[upperStockTicker!]?.timestamp || 0)
    ) {
      setStock(item[upperStockTicker!]);
      return;
    }

    updateStorage();
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <>
      <div className="w-full h-14 drop-shadow-lg shadow bg-zinc-800 brightness-150 flex justify-center no-scrollbar">
        <div className="w-3/4 h-full p-4">
          <section className="flex gap-1 font-medium">
            {stockTicker?.toUpperCase()} -{" "}
            <p className="font-light">
              {stock?.name.split("-")[1].split("ON")[0].split("PM")[0].trim()}
            </p>
          </section>
        </div>
      </div>
      <div className="w-full lg:w-3/4 p-2 ">
        <div className="w-full h-36 flex divide-x divide-gray-500 gap-0.5 mt-6 text-white">
          <div className="PRICE flex-[0.25] bg-bl rounded">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="">
                <p className="font-light">Preço Atual</p>
                <p className="text-2xl flex items-center gap-0.5">
                  <p>R$</p>
                  <p className="font-bold text-3xl">{stock?.actualPrice}</p>
                </p>
              </div>
            </div>
          </div>

          <div className="MIN flex-[0.25] bg-df brightness-150">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="">
                <p className="font-light">Min. 52 Semanas</p>
                <p className="text-2xl flex items-center gap-0.5">
                  <p>R$</p>
                  <p className="font-bold text-3xl">
                    {Math.min(...prices.slice(-364).reverse().map(item => item.price))}
                  </p>
                </p>
                <div className="flex flex-col">
                  <p className="font-light text-sm">Min. Mês</p>
                  <p className="text-2xl flex items-center gap-0.5">
                    <p>R$</p>
                    <p className="font-bold">
                      {Math.min(...prices.slice(-31).reverse().map(item => item.price))}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="MAX flex-[0.25] bg-df brightness-150">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="">
                <p className="font-light">Max. 52 Semanas</p>
                <p className="text-2xl flex items-center gap-0.5">
                  <p>R$</p>
                  <p className="font-bold text-3xl">
                    {Math.max(...prices.slice(-364).reverse().map(item => item.price))}
                  </p>
                </p>
                <div className="flex flex-col">
                  <p className="font-light text-sm">Max. Mês</p>
                  <p className="text-2xl flex items-center gap-0.5">
                    <p>R$</p>
                    <p className="font-bold">
                      {Math.max(...prices.slice(-31).reverse().map(item => item.price))}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="DY flex-[0.25] bg-df brightness-150 rounded-r">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="">
                <p className="font-light">Dividend yield</p>
                <p className="text-2xl flex items-center gap-0.5">
                  <p className="font-bold text-3xl">
                    {indicators.dy?.actual.toFixed(4) ?? 0}
                  </p>
                  <p>%</p>
                </p>
                <div className="flex flex-col">
                  <p className="font-light text-sm">Últimos 12 Meses</p>
                  <p className="text-2xl flex items-center gap-0.5">
                    <p>R$</p>
                    <p className="font-bold">
                      {((((indicators.dy?.actual || 0) / 100) ?? 0) * (stock?.actualPrice ?? 0)).toFixed(2)}
                    </p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <PriceChart
            priceData={{
              actual: stock?.priceHistory[0].price || 0,
              name: stock?.name || "",
              price: stock?.priceHistory || [],
              ticker: stockTicker!.toUpperCase(),
            }}
          />
        </div>
        <div className="info flex flex-col ">
          <div className="indexes py-0 w-full">
            <div className="w-full flex flex-col gap-2">
              <a href="" className="w-fit">
                <div className="title text-3xl flex items-center text-bl duration-300 cursor-pointer w-fit font-bold ">
                  INDICADORES DA {stockTicker?.toUpperCase()}
                </div>
              </a>

              <div className="w-full">
                <h3 className="font-medium text-lg text-[#F46D22]">Indicadores de Valuation</h3>
                <div className="grid grid-cols-2 lg:grid-cols-5 items-center w-full gap-1">
                  {[
                    { label: "D.Y", value: indicators.dy?.actual.toFixed(2), unit: "%" },
                    { label: "P/L", value: indicators.p_l?.actual.toFixed(2) },
                    { label: "PEG RATIO", value: indicators.peg_Ratio?.actual.toFixed(2) },
                    { label: "P/VP", value: indicators.p_vp?.actual.toFixed(2) },
                    { label: "EV/EBIT", value: indicators.ev_ebit?.actual.toFixed(2) },
                    { label: "P/EBITDA", value: indicators.p_ebita?.actual.toFixed(2) },
                    { label: "P/EBIT", value: indicators.p_ebit?.actual.toFixed(2) },
                    { label: "VPA", value: indicators.vpa?.actual.toFixed(2) },
                    { label: "P/ATIVO", value: indicators.p_ativo?.actual.toFixed(2) },
                    { label: "LPA", value: indicators.lpa?.actual.toFixed(2) },
                    { label: "P/SR", value: indicators.p_sr?.actual.toFixed(2) },
                    { label: "P/CAP. GIRO", value: indicators.p_capitlgiro?.actual.toFixed(2) },
                    { label: "P/ATIVO CIRC. LIQ", value: indicators.p_ativocirculante?.actual.toFixed(2) }
                  ].map((indicator, index) => (
                    <div key={index} className="bg-df brightness-125 w-full h-full p-4 flex flex-col rounded">
                      <h4 className="hover:text-[#F46D22] duration-300 font-medium flex gap-1 items-center text-nowrap overflow-ellipsis">
                        {indicator.label} {<QuoteIcon className="scale-110" />}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="Value font-medium text-bl brightness-110 text-lg">{indicator.value}{indicator.unit}</div>
                        <img alt="chart" className="h-6" src={ChartSvg} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <h3 className="font-medium text-lg text-[#F46D22]">Indicadores de Endividamento</h3>
                <div className="grid grid-cols-2 lg:grid-cols-5 items-center w-full gap-1">
                  {[
                    { label: "DIV. LIQ/PL", value: indicators.dividaliquida_patrimonioliquido?.actual.toFixed(2) },
                    { label: "DIV. LIQ/EBITDA", value: indicators.dividaliquida_ebitda?.actual.toFixed(2) },
                    { label: "DIV. LIQ/EBIT", value: indicators.dividaliquida_ebit?.actual.toFixed(2) },
                    { label: "PASSIVO/ATIVOS", value: indicators.passivo_ativo?.actual.toFixed(2) },
                    { label: "LIQ. CORRENTE", value: indicators.liquidezcorrente?.actual.toFixed(2) }
                  ].map((indicator, index) => (
                    <div key={index} className="bg-df brightness-125 w-full h-full p-4 flex flex-col rounded">
                      <h4 className="hover:text-[#F46D22] duration-300 font-medium flex gap-1 items-center text-nowrap overflow-ellipsis">
                        {indicator.label} {<QuoteIcon className="scale-110" />}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="Value font-medium text-bl brightness-110 text-lg">{indicator.value}</div>
                        <img alt="chart" className="h-6" src={ChartSvg} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full grid grid-cols-3 gap-1">
                <div className="w-full">
                  <h3 className="font-medium text-lg text-[#F46D22]">Indicadores de Rentabilidade</h3>
                  <div className="flex items-center w-full">
                    <div className="grid grid-cols-2 gap-1 w-full">
                    {[
                      { label: "MARGEM BRUTA", value: indicators.margembruta?.actual.toFixed(2), unit: "%" },
                      { label: "MARGEM EBITDA", value: indicators.margemebitda?.actual.toFixed(2), unit: "%" },
                      { label: "MARGEM EBIT", value: indicators.margemebit?.actual.toFixed(2), unit: "%" },
                      { label: "MARGEM LÍQUIDA", value: indicators.margemliquida?.actual.toFixed(2), unit: "%" }
                    ].map((indicator, index) => (
                      <div key={index} className="bg-df brightness-125 w-full h-full p-4 flex flex-col rounded">
                        <h4 className="hover:text-[#F46D22] duration-300 font-medium flex gap-1 items-center overflow-hidden text-nowrap overflow-ellipsis">
                          {indicator.label} {<QuoteIcon className="scale-110" />}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="Value font-medium text-bl brightness-110 text-lg">{indicator.value}{indicator.unit}</div>
                          <img alt="chart" className="h-6" src={ChartSvg} />
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <h3 className="font-medium text-lg text-[#F46D22]">Indicadores de Rentabilidade</h3>
                  <div className="flex items-center w-full">
                    <div className="grid grid-cols-2 gap-1 w-full">
                    {[
                      { label: "ROE", value: indicators.roe?.actual.toFixed(2), unit: "%" },
                      { label: "ROA", value: indicators.roa?.actual.toFixed(2), unit: "%" },
                      { label: "ROIC", value: indicators.roic?.actual.toFixed(2), unit: "%" },
                      { label: "GIRO ATIVOS", value: indicators.giro_ativos?.actual.toFixed(2), unit: "%" },
                    ].map((indicator, index) => (
                      <div key={index} className="bg-df brightness-125 w-full h-full p-4 flex flex-col rounded">
                        <h4 className="hover:text-[#F46D22] duration-300 font-medium flex gap-1 items-center overflow-hidden text-nowrap overflow-ellipsis">
                          {indicator.label} {<QuoteIcon className="scale-110" />}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="Value font-medium text-bl brightness-110 text-lg">{indicator.value}{indicator.unit}</div>
                          <img alt="chart" className="h-6" src={ChartSvg} />
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <h3 className="font-medium text-lg text-[#F46D22]">Indicadores de Rentabilidade</h3>
                  <div className="flex items-center w-full">
                    <div className="grid grid-cols-2 gap-1 w-full">
                    {[
                      { label: "CAGR RECEITAS 5 ANOS", value: indicators.receitas_cagr5?.actual.toFixed(2), unit: "%" },
                      { label: "CAGR LUCRO 5 ANOS", value: indicators.liquidezcorrente?.actual.toFixed(2), unit: "%" },
                    ].map((indicator, index) => (
                      <div key={index} className="bg-df brightness-125 w-full h-full p-4 flex flex-col rounded">
                        <h4 className="hover:text-[#F46D22] duration-300 font-medium flex gap-1 items-center overflow-hidden text-nowrap overflow-ellipsis">
                          {indicator.label} {<QuoteIcon className="scale-110" />}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="Value font-medium text-bl brightness-110 text-lg">{indicator.value}{indicator.unit}</div>
                          <img alt="chart" className="h-6" src={ChartSvg} />
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
