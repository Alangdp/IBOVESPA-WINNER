interface dividendItemProps {
  ticker: string;
  name: string;
  dividendValue: number;
  dividendDate: string;
  dividendType: string;
}

export function DividendItem({
  dividendDate,
  dividendType,
  dividendValue,
  name,
  ticker,
}: dividendItemProps) {
  const AVATAR_IMAGES_URL = import.meta.env.VITE_AVATAR_IMAGES_URL;

  return (
    <div className="item rounded-df grid grid-cols-[3fr,8fr] h-max m-2 p-2 bg-df">
      <a href={"/market/brasil/" + ticker}>
        <img
          src={`http://${AVATAR_IMAGES_URL}/${ticker}-logo.jpg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `http://${AVATAR_IMAGES_URL}/NO-IMAGE.png`;
          }}
          alt="Ticker Logo"
          className="overflow-hidden rounded-df lg:h-16"
        />
      </a>
      <div className="info grid grid-row-[1fr,2fr] items-stretch w-full  ml-2">
        <div className="name flex  items-center gap-3">
          <h5 className="font-semibold">{ticker}</h5>
          <p className="text-xs opacity-60">{name}</p>
        </div>
        <div className="grid grid-cols-[1fr,2fr] items-stretch w-full  ml-2">
          <div className="variation flex sm: ms: lg:gap-2 xl:gap-8 2xl:gap-24 items-center">
            <div className="porcent flex  items-center justify-center">
              <div className="text-md opacity-85">R${dividendValue}</div>
            </div>
          </div>
          <div className="dividend flex flex-col items-center justify-center ">
            <div className="data-com text-xs">{dividendDate}</div>
            <div className="type px-2 bg-green-500 w-fi rounded-df lg:text-xs xl:text-sm">
              {dividendType}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
