import { ArrowRightIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { DividendItem } from "./Stocks/Dividend";

import newImage from "../../assets/imgs/news.png";
import { VariationItem } from "./Stocks/Variation";
import { NavBar } from "../Nav";
import { useEffect, useState } from "react";
import { HomeItens } from "@/types/HomeItens.type";
import { getVariations } from "@/Utils/ApiUtils";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const location = useLocation();
  const [variations, setVariations] = useState<HomeItens>();

  const fetchData = async () => {
    if (!variations) setVariations(await getVariations());
  };

  useEffect(() => {
    const message = location.state?.redirectMessage as string | undefined;
    if(message) {
      toast.error(message);
      location.state = {};
    }

    fetchData();
  });

  return (
    <div className="bg-[#3F3F3F] w-screen h-screen text-white">
      {/* nav */}
      <NavBar />

      {/* main */}
      <main className="bg-[#3F3F3F]">
        <div
          className="news h-[360px] relative w-100 bg-cover bg-no-repeat"
          style={{ backgroundImage: "url(" + newImage + ")" }}
        >
          <div className="home-buttons w-fit bg-df bottom-6 rounded-df p-2 absolute left-1/2 transform -translate-x-1/2 ">
            <div className="buttons flex items-center gap-4 w-fit">
              <a href="" className="p-1 bg-bl rounded w-max">
                Ver Todos
              </a>
              <a href="" className="p-1">
                Ações
              </a>
              <a href="" className="p-1">
                Crypto
              </a>
              <a href="" className="p-1">
                Fiis
              </a>
            </div>
          </div>
        </div>

        <div className="selected-data flex flex-col items-center">
          {/* Stock */}
          <div className="header flex items-center justify-center w-full h-40 gap-12">
            <div className="title w-fit">
              <h2 className="text-3xl font-bold">Ações</h2>
              <div className="text-bl ml-8 text-lg">Ibovespa</div>
            </div>

            <div className="card w-56 h-20 rounded-et bg-df flex items-center  justify-around">
              <div className="main flex flex-col">
                <h4>Bovepsa</h4>
                <div className="updated flex">
                  <div className="u">
                    <ArrowUpIcon className="text-green-700" />
                  </div>
                  <div className="text-sm opacity-60">4,12 %</div>
                </div>
              </div>
              <h3>
                <ArrowRightIcon className="cursor-pointer" />{" "}
              </h3>
            </div>

            <div className="card w-56 h-20 rounded-et bg-df flex items-center justify-around">
              <div className="main flex flex-col">
                <h4>Empresas</h4>
                <div className="updated">
                  <div className="text-sm opacity-60">422</div>
                </div>
              </div>
              <h3></h3>
            </div>

            <div className="card w-56 h-20 rounded-et bg-df flex items-center justify-around">
              <div className="main flex flex-col">
                <h4>Segmentos</h4>
                <div className="updated">
                  <div className="text-sm opacity-60">96</div>
                </div>
              </div>
              <h3></h3>
            </div>

            <div className="card w-56 h-20 rounded-et bg-df flex items-center justify-around">
              <div className="main flex flex-col">
                <h4>IPO</h4>
                <div className="updated">
                  <div className="text-sm opacity-60">100</div>
                </div>
              </div>
              <h3></h3>
            </div>
          </div>

          <div className="cards grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 w-4/5 transition-all flex- flex-col justify-center">
            <div className="altas rounded-df inline w-full bg-blue-700">
              <div className="title">
                <h3 className="font-bold text-2xl m-4">Altas</h3>
              </div>
              <div className="content">
                <div className="info flex flex-col">
                  {variations &&
                    variations.high.map((item, index) => {

                      if(index >5 ) return (<></>)
                      return((

                        <>
                          <VariationItem
                            name={item.ticker.split(item.ticker.split(" ")[0])[1]}
                            ticker={item.ticker.split(" ")[0]}
                            type="up"
                            value={Number(
                              item.currentPrice
                                .split("R$")[1]
                                .trim()
                                .replace(",", ".")
                            )}
                            variation={Number(
                              item.variation
                                .split("arrow_upward")[1]
                                .replace("%", "")
                                .replace(",", ".")
                            )}
                          />
                        </>
                      ))
                    })}
                </div>
              </div>
            </div>
            <div className="baixas rounded-df inline w-full bg-blue-700">
              <div className="title">
                <h3 className="font-bold text-2xl m-4">Baixas</h3>
              </div>
              <div className="info flex flex-col">
                {variations &&
                  variations.lows.map((item, index) => (
                    <>
                      <VariationItem
                        name={item.ticker.split(item.ticker.split(" ")[0])[1]}
                        ticker={item.ticker.split(" ")[0]}
                        type="down"
                        value={Number(
                          item.currentPrice
                            .split("R$")[1]
                            .trim()
                            .replace(",", ".")
                        )}
                        variation={Number(
                          item.variation
                            .split("arrow_downward")[1]
                            .replace("%", "")
                            .replace(",", ".")
                        )}
                      />
                    </>
                  ))}
              </div>
              <div className="content"></div>
            </div>
            <div className="dividendos rounded-df inline w-full bg-blue-700">
              <h3 className="font-bold text-2xl m-4">Dividendos</h3>
              <div className="content">
                <div className="info flex flex-col">
                  {variations &&
                    variations.dividends.map((item, index) => (
                      <>
                        <DividendItem
                          name={item.ticker.split(item.ticker.split(" ")[0])[1]}
                          ticker={item.ticker.split(" ")[0]}
                          dividendValue={Number(item.variation.split("R$")[1].replace(",", "."))}
                          dividendDate={item.currentPrice.split("\n")[0]}
                          dividendType={item.currentPrice.split("\n")[3]}
                        />
                      </>
                    ))}
                </div>
              </div>
            </div>
            <div className="comunicados rounded-df inline w-full bg-blue-700">
              <h3 className="font-bold text-2xl m-4">Comunicados</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
