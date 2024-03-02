interface dividendItemProps {
  img: string;
  ticker: string;
  name: string;
  dividendValue: number;
  dividendDate: Date;
  dividendType: string;
}

export function DividendItem({
  dividendDate,
  dividendType,
  dividendValue,
  img,
  name,
  ticker,
}: dividendItemProps) {
  return (
    <div className="item rounded-df grid grid-cols-[1fr,2fr,1fr] h-max m-2 p-2 bg-df">
      <img
        src={img}
        className="overflow-hidden rounded-df w-2/3"
        alt=""
      />
      <div className="info flex flex-col items-stretch w-full justify-around ml-2">
        <div className="name flex items-center gap-3">
          <h5 className="font-semibold text-lg">{ticker}</h5>
          <p className="text-xs opacity-60">{name}</p>
        </div>
        <div className="variation flex  2xl:gap-24 lg:gap-2 xl:gap-8 items-center">
          <div className="porcent flex  items-center">
            <div className="text-md opacity-85">R${dividendValue}</div>
          </div>
        </div>
      </div>

      <div className="dividend flex flex-col items-center justify-around">
        <div className="data-com text-lg">{dividendDate.toLocaleString("pt-BR", {
          dateStyle: "short"
        })}</div>
        <div className="type px-2 bg-green-500 w-fi rounded-df">{dividendType}</div>
      </div>
    </div>
  );
}
