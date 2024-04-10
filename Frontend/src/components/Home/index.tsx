import {
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import { DividendItem } from "./Stocks/Dividend";

import newImage from "../../assets/imgs/news.png";
import OficialLogo from "../../assets/OficialLog.svg";
import { VariationItem } from "./Stocks/Variation";
import { Register } from "../sign";
import { NavBar } from "../Nav";

export default function Home() {
  const mockUrlImage =
    "https://investidor10.com.br/storage/companies/5f19c3e7e124c.jpeg";



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

          <div className="cards grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 w-85 transition-all flex- flex-col justify-center">
            <div className="altas rounded-df inline w-full bg-blue-700">
              <div className="title">
                <h3 className="font-bold text-2xl m-4">Altas</h3>
              </div>
              <div className="content">
                <div className="info flex flex-col">
                  <VariationItem
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                    type="up"
                    value={16.8}
                    variation={1}
                  />
                  <VariationItem
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                    type="up"
                    value={16.8}
                    variation={1}
                  />
                  <VariationItem
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                    type="up"
                    value={16.8}
                    variation={1}
                  />
                  <VariationItem
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                    type="up"
                    value={16.8}
                    variation={1}
                  />
                  <VariationItem
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                    type="up"
                    value={16.8}
                    variation={1}
                  />
                </div>
              </div>
            </div>
            <div className="baixas rounded-df inline w-full bg-blue-700">
              <div className="title">
                <h3 className="font-bold text-2xl m-4">Baixas</h3>
              </div>
              <div className="info flex flex-col">
                <VariationItem
                  img={mockUrlImage}
                  name="Banco do Brasil"
                  ticker="BBAS3"
                  type="down"
                  value={16.8}
                  variation={1}
                />

                <VariationItem
                  img={mockUrlImage}
                  name="Banco do Brasil"
                  ticker="BBAS3"
                  type="down"
                  value={16.8}
                  variation={1}
                />

                <VariationItem
                  img={mockUrlImage}
                  name="Banco do Brasil"
                  ticker="BBAS3"
                  type="down"
                  value={16.8}
                  variation={1}
                />

                <VariationItem
                  img={mockUrlImage}
                  name="Banco do Brasil"
                  ticker="BBAS3"
                  type="down"
                  value={16.8}
                  variation={1}
                />

                <VariationItem
                  img={mockUrlImage}
                  name="Banco do Brasil"
                  ticker="BBAS3"
                  type="down"
                  value={16.8}
                  variation={1}
                />
              </div>
              <div className="content"></div>
            </div>
            <div className="dividendos rounded-df inline w-full bg-blue-700">
              <h3 className="font-bold text-2xl m-4">Dividendos</h3>
              <div className="content">
                <div className="info flex flex-col">
                  <DividendItem
                    dividendDate={new Date("03/13/2024")}
                    dividendType="JCP"
                    dividendValue={0.41}
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                  />

                  <DividendItem
                    dividendDate={new Date("03/13/2024")}
                    dividendType="JCP"
                    dividendValue={0.41}
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                  />

                  <DividendItem
                    dividendDate={new Date("03/13/2024")}
                    dividendType="JCP"
                    dividendValue={0.41}
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                  />

                  <DividendItem
                    dividendDate={new Date("03/13/2024")}
                    dividendType="JCP"
                    dividendValue={0.41}
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                  />

                  <DividendItem
                    dividendDate={new Date("03/13/2024")}
                    dividendType="JCP"
                    dividendValue={0.41}
                    img={mockUrlImage}
                    name="Banco do Brasil"
                    ticker="BBAS3"
                  />
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
