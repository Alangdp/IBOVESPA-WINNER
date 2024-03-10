import { useMock } from "@/components/SideBar/SideContext";
import { Upper } from "../../../assets/svg/Upper";
import { SimpleLineChart } from "../SimpleChart";
import { cn } from "@/lib/utils";
import { TickerIcon } from "./CardTickerIcon";

interface VariationCardProps {
  ticker: string;
  name: string;

  variation: number;
  price: number;
  className?: string;
}

export function VariationCard({ name, ticker, price, variation, className}: VariationCardProps) {
  // TODO TROCAR O SISTEMA DE MOCK POR UM SISTEMA OFFICIAL
  const { mockData } = useMock();
  const type = variation < 0 ? "down" : "up"

  return (
    <div className={cn("rounded-2xl p-4card w-[256px] bg-[#1B2028] h-44", className)}>
      <div className="info flex gap-2">
        {/* TODO FAZER HERENCA DA IMAGEM */}
        <TickerIcon img="http://localhost:3002/images/avatar/BBAS3-logo.jpg"/>
        <span className="flex">
          <div className="grid grid-cols-3 overflow-hidden">
            <div className="name col-span-2">
              <h4 className="text-white break-keep ">{name}</h4>
              <p className="text-white opacity-60">{ticker}</p>
            </div>
            <div className="flex items-center justify-end px-2">
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={type === "up" ? "rotate-0": "rotate-180"}
              >
                <Upper fill={type === "up" ? "#1ECB4F": "#F46D22"}/>
              </svg>
            </div>
          </div>
        </span>
      </div>
      <div className="economic grid grid-cols-3 mx-1 my-2 h-2/3">
        <div className="prices col-span-1 flex flex-col gap-6 justify-center">
          <h3 className="font-semibold text-white">R$ {price}</h3>
          <p className={`font-semibold ${type === "up" ? "text-[#1ECB4F]": "text-[#F46D22]"} text-sm`} >{variation}%</p>
        </div>
        <div className="prices col-span-2  h-full rounded-df">
          <SimpleLineChart data={mockData} x={true}/>
        </div>
      </div>
    </div>
  );
}
