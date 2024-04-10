import { TickerIcon } from "./CardTickerIcon";

interface PortifolioCardProps {
  ticker: string;
  totalValue: number;
  quantity: number;
  actualValue: number;
  variation: number;
}

export function PortifolioCard({
  actualValue,
  quantity,
  ticker,
  totalValue,
  variation,
}: PortifolioCardProps) {

  const AVATAR_IMAGES_URL = import.meta.env.VITE_AVATAR_IMAGES_URL

  return (
    <div className="card grid grid-cols-5 items-center">
      <TickerIcon img={`http://${AVATAR_IMAGES_URL}/BBAS3-logo.jpg`} />
      <div className="grid grid-rows-2">
        <h4 className="text-white font-semibold text-lg">{ticker}</h4>
        <p className="opacity-60 text-white text-lg text-nowrap ">
          R$ {totalValue}
        </p>
      </div>
      <div className="grid grid-rows-2 col-span-2 content-center text-white mx-6">
        <div className="flex items-center gap-1">
          {quantity} <p className="text-sm opacity-65">QTD</p>
        </div>
        <div className="flex items-center gap-1">
          {actualValue} <p className="text-sm opacity-65">R$</p>
        </div>
      </div>
      <div className="">
        <p className={variation < 0 ? "text-[#F46D22]" : "text-[#1ECB4F]"}>{variation}</p>
      </div>
    </div>
  );
}
