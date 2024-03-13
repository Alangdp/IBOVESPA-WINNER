import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface VariationProps {
    img: string;
    ticker: string;
    name: string;
    variation: number;
    value: number;
    type: "up" | "down"
}


export function VariationItem({ img, name, ticker, type, value, variation }: VariationProps) {
    return (
        <div className="item rounded-df grid grid-cols-[3fr,8fr] h-max m-2 p-2 bg-df">
            <img
                src={img}
                className="overflow-hidden rounded-df lg:h-16"
                alt=""
            />
            <div className="info flex flex-col items-stretch  w-full justify-around ml-2">
                <div className="name flex items-center gap-3">
                    <h5 className="font-semibold">{ticker}</h5>
                    <p className="text-xs opacity-60">{name}</p>
                </div>
                <div className="variation flex lg:gap-2 xl:gap-8 2xl:gap-24 items-center">
                    <div className="porcent flex  items-center">
                        {type === "down" ? <ArrowDownIcon className="text-red-700 w-6 h-6" /> : <ArrowUpIcon className="text-green-700 w-6 h-6" />}
                        <div className="text-sm">{variation}%</div>
                    </div>
                    <div className="price text-sm opacity-40">R${value}</div>
                </div>
            </div>
        </div>
    )
}