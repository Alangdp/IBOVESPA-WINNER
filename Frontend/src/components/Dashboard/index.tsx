import { CaretDownIcon } from "@radix-ui/react-icons";
import { VariationCard } from "./Card";
import { TickerIcon } from "./Card/CardTickerIcon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ButtonSelectable } from "./ButtonSelectable";
import { SimpleLineChart } from "./SimpleChart";
import { useMock } from "../SideBar/SideContext";
import { PortifolioCard } from "./Card/CardPortifolio";

export function DashBoard() {
  const [selectedOption, setSelectedOption] = useState<string>("1hr");
  // const { selected, setSelected } = useSelected();
  const { mockData } = useMock();

  return (
    <main className="p-4 flex flex-col gap-4 h-fit">

      <div className="top-cards xl:flex grid-cols-2 grid w-full h-fit gap-7">
        <VariationCard
          className="p-2 md:w-full"
          variation={2.32}
          price={52.9}
          name="Banco do Brasil"
          ticker="BBAS3"
        />
        <VariationCard
          className="p-2 md:w-full"
          variation={2.32}
          price={52.9}
          name="Banco do Brasil"
          ticker="TAEE11"
        />
        <VariationCard
          className="p-2 md:w-full"
          variation={-2.32}
          price={52.9}
          name="Banco do Brasil"
          ticker="KLBN3"
        />
        <VariationCard
          className="p-2 md:w-full"
          variation={-2.32}
          price={52.9}
          name="Banco do Brasil"
          ticker="PSSA3"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 py-4 rounded-df gap-4 grid-rows-4 h-full">
        <div className="grid col-span-1 gap-7 row-span-4 grid-rows-6 ">

          <div className="wallet bg-[#3A6FF8] rounded-df h-fit row-span-1">
            <h4 className="text-xl text-white p-4 font-semibold">Carteira</h4>
            <div className="flex p-4 items-center gap-4">
              <p className="text-2xl font-semibold text-white">R$ 56.312,23</p>
              <p className="text-[#1ECB4F] font-semibold">+0.25%</p>
            </div>
          </div>

          <div className="portifolio bg-[#1B2028] rounded-df row-span-4">
            <h4 className="text-xl text-white p-4 font-semibold">Portifolio</h4>
            <div className="cards p-4 flex flex-col gap-2">
              <PortifolioCard actualValue={10} quantity={1000} totalValue={10000} ticker="BBAS3" variation={0} />
              <PortifolioCard actualValue={10} quantity={1000} totalValue={10000} ticker="BBAS3" variation={0} />
              <PortifolioCard actualValue={10} quantity={1000} totalValue={10000} ticker="BBAS3" variation={0} />
              <PortifolioCard actualValue={10} quantity={1000} totalValue={10000} ticker="BBAS3" variation={0} />
              <PortifolioCard actualValue={10} quantity={1000} totalValue={10000} ticker="BBAS3" variation={0} />
              <PortifolioCard actualValue={10} quantity={1000} totalValue={10000} ticker="BBAS3" variation={0} />
              <PortifolioCard actualValue={10} quantity={1000} totalValue={10000} ticker="BBAS3" variation={0} />

            </div>
          </div>

        </div>

        <div className="grid col-span-2 grid-rows row-span-3 gap-4">
          <div className="row-span-3 bg-[#1B2028] rounded-df w-full h-full">
            <div className="flex w-full p-4 items-center justify-between">
              <h4 className="text-xl text-white font-semibold">Carteira</h4>
              <div className="options items-center flex gap-4">
                <div className="op p-2 border border-[#31353F] rounded-df cursor-pointer hover:bg-[#454b58] transition-all duration-200 w-fit h-fit flex">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.875 17.0625C4.5675 17.0625 4.3125 16.8075 4.3125 16.5V11.25C4.3125 10.9425 4.5675 10.6875 4.875 10.6875C5.1825 10.6875 5.4375 10.9425 5.4375 11.25V16.5C5.4375 16.8075 5.1825 17.0625 4.875 17.0625Z"
                          fill="#9E9E9E"
                        />
                        <path
                          d="M4.875 4.3125C4.5675 4.3125 4.3125 4.0575 4.3125 3.75V1.5C4.3125 1.1925 4.5675 0.9375 4.875 0.9375C5.1825 0.9375 5.4375 1.1925 5.4375 1.5V3.75C5.4375 4.0575 5.1825 4.3125 4.875 4.3125Z"
                          fill="#9E9E9E"
                        />
                        <path
                          d="M13.125 17.0625C12.8175 17.0625 12.5625 16.8075 12.5625 16.5V14.25C12.5625 13.9425 12.8175 13.6875 13.125 13.6875C13.4325 13.6875 13.6875 13.9425 13.6875 14.25V16.5C13.6875 16.8075 13.4325 17.0625 13.125 17.0625Z"
                          fill="#9E9E9E"
                        />
                        <path
                          d="M13.125 7.3125C12.8175 7.3125 12.5625 7.0575 12.5625 6.75V1.5C12.5625 1.1925 12.8175 0.9375 13.125 0.9375C13.4325 0.9375 13.6875 1.1925 13.6875 1.5V6.75C13.6875 7.0575 13.4325 7.3125 13.125 7.3125Z"
                          fill="#9E9E9E"
                        />
                        <path
                          d="M5.625 11.8125H4.125C2.835 11.8125 2.0625 11.04 2.0625 9.75V5.25C2.0625 3.96 2.835 3.1875 4.125 3.1875H5.625C6.915 3.1875 7.6875 3.96 7.6875 5.25V9.75C7.6875 11.04 6.915 11.8125 5.625 11.8125ZM4.125 4.3125C3.4575 4.3125 3.1875 4.5825 3.1875 5.25V9.75C3.1875 10.4175 3.4575 10.6875 4.125 10.6875H5.625C6.2925 10.6875 6.5625 10.4175 6.5625 9.75V5.25C6.5625 4.5825 6.2925 4.3125 5.625 4.3125H4.125Z"
                          fill="#9E9E9E"
                        />
                        <path
                          d="M13.875 14.8125H12.375C11.085 14.8125 10.3125 14.04 10.3125 12.75V8.25C10.3125 6.96 11.085 6.1875 12.375 6.1875H13.875C15.165 6.1875 15.9375 6.96 15.9375 8.25V12.75C15.9375 14.04 15.165 14.8125 13.875 14.8125ZM12.375 7.3125C11.7075 7.3125 11.4375 7.5825 11.4375 8.25V12.75C11.4375 13.4175 11.7075 13.6875 12.375 13.6875H13.875C14.5425 13.6875 14.8125 13.4175 14.8125 12.75V8.25C14.8125 7.5825 14.5425 7.3125 13.875 7.3125H12.375Z"
                          fill="#9E9E9E"
                        />
                      </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Configurações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="currency flex gap-2 items-center text-white border border-[#31353F] p-2 h-9 rounded-df">
                  <svg
                    width="10"
                    height="18"
                    viewBox="0 0 10 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.025 18V15.85C3.14166 15.65 2.37916 15.2667 1.7375 14.7C1.09583 14.1333 0.624997 13.3333 0.324997 12.3L2.175 11.55C2.425 12.35 2.79583 12.9583 3.2875 13.375C3.77916 13.7917 4.425 14 5.225 14C5.90833 14 6.4875 13.8458 6.9625 13.5375C7.4375 13.2292 7.675 12.75 7.675 12.1C7.675 11.5167 7.49166 11.0542 7.125 10.7125C6.75833 10.3708 5.90833 9.98333 4.575 9.55C3.14166 9.1 2.15833 8.5625 1.625 7.9375C1.09166 7.3125 0.824997 6.55 0.824997 5.65C0.824997 4.56667 1.175 3.725 1.875 3.125C2.575 2.525 3.29166 2.18333 4.025 2.1V0H6.025V2.1C6.85833 2.23333 7.54583 2.5375 8.0875 3.0125C8.62916 3.4875 9.025 4.06667 9.275 4.75L7.425 5.55C7.225 5.01667 6.94166 4.61667 6.575 4.35C6.20833 4.08333 5.70833 3.95 5.075 3.95C4.34166 3.95 3.78333 4.1125 3.4 4.4375C3.01666 4.7625 2.825 5.16667 2.825 5.65C2.825 6.2 3.075 6.63333 3.575 6.95C4.075 7.26667 4.94166 7.6 6.175 7.95C7.325 8.28333 8.19583 8.8125 8.7875 9.5375C9.37916 10.2625 9.675 11.1 9.675 12.05C9.675 13.2333 9.325 14.1333 8.625 14.75C7.925 15.3667 7.05833 15.75 6.025 15.9V18H4.025Z"
                      fill="#F7A800"
                    />
                  </svg>

                  <div className="currency-name">USD</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="focus:outline-none">
                      <CaretDownIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Moeda</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>BRL</DropdownMenuItem>
                      <DropdownMenuItem>USD</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="graph h-2/3 lg:pb-14 lg:mb-10">
              <div className="options flex items-center justify-between p-4">
                <div className="value">
                  <p className="text-2xl font-semibold text-white">
                    R$ 56.312,23
                  </p>
                </div>

                <div className="buttons flex gap-2 text-white">
                  <ButtonSelectable
                    text="1d"
                    selectedOption={selectedOption}
                    setter={setSelectedOption}
                  />
                  <ButtonSelectable
                    text="1w"
                    selectedOption={selectedOption}
                    setter={setSelectedOption}
                  />
                  <ButtonSelectable
                    text="1y"
                    selectedOption={selectedOption}
                    setter={setSelectedOption}
                  />
                </div>
              </div>
              <SimpleLineChart data={mockData} x={true} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
