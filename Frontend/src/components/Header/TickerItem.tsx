interface TickerItemProps {
  ticker: string;
  index: number;
  onClick?: () => void;
}

export function TickerItem({ index, ticker, onClick }: TickerItemProps) {
  return (
    <span
      className="item flex gap-4 items-center p-2 bg-zinc-200 rounded-df hover:bg-zinc-400 transition-all duration-300 cursor-pointer z-20"
      onClick={onClick ? onClick : () => {}}
    >
      <img
        src={`http://localhost:3002/images/avatar/${ticker}-logo.jpg`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "http://localhost:3002/images/avatar/NO-IMAGE.png";
        }}
        alt="Ticker Logo"
        className="w-14 h-14 rounded-df"
      />
      <h1 className="text-zinc-800" key={index}>
        {ticker}
      </h1>
    </span>
  );
}
