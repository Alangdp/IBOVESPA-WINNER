import { ElementType } from "react";

interface IndexCardProps {
  Icon: ElementType | string
}

export default function IndexCard({ Icon }: IndexCardProps) {
  return (
    <div className="card grid grid-cols-4 items-center justify-center cursor-pointer hover:bg-[#1B2028] duration-300 py-2 rounded-df">
      {/* {Foto Indicie} */}
      <div className="img flex justify-center">
        <div className="w-12 rounded-full">
          {typeof Icon === "string" ? <img src={Icon} alt="" className="w-12 rounded-full" /> : <Icon className="w-12 rounded-full"/>
        }
        </div>
      </div>
      <div className="flex flex-col col-span-2">
        <p>{/* {Nome indiice} */} Indice Ibovespa</p>
        <span className="text-sm flex gap-1">
          {" "}
          <p className="opacity-60">126759,12</p> BRL{" "}
          <p className="text-red-500 opacity-80">-12%</p>
        </span>
      </div>
    </div>
  );
}
