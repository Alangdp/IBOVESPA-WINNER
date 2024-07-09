interface TickerItemProps {
  ticker: string;
  index: number;
  onClick?: () => void;
}

export function TickerItem({ index, ticker, onClick }: TickerItemProps) {
  const AVATAR_IMAGES_URL = import.meta.env.VITE_AVATAR_IMAGES_URL;

  return (
    <a
      href={"/market/brasil/" + ticker}
      className="item flex gap-4 items-center p-2 bg-zinc-200 rounded-df hover:bg-zinc-400 transition-all duration-300 cursor-pointer z-20"
      onClick={onClick ? onClick : () => {}}
    >
      <img
        src={`http://${AVATAR_IMAGES_URL}/${ticker}-logo.jpg`}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `http://${AVATAR_IMAGES_URL}/NO-IMAGE.png`;
        }}
        alt="Ticker Logo"
        className="w-14 h-14 rounded-df"
      />
      <h1 className="text-zinc-800" key={index}>
        {ticker}
      </h1>
    </a>
  );
}
