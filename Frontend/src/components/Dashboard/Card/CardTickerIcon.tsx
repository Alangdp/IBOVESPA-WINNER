import { cn } from "@/lib/utils";

interface TickerIconProps {
  img: string;
  className?: string;
  ticker: string;
}

export function TickerIcon({ img, className, ticker }: TickerIconProps) {
  const AVATAR_IMAGES_URL = import.meta.env.VITE_AVATAR_IMAGES_URL;

  return (
    <a
      href={"/market/brasil/" + ticker}
      className={cn(
        "icon rounded-df bg-[#31353F] overflow-hidden h-fit w-fit p-2",
        className
      )}
    >
      <img
        className="w-8 h-8 rounded-df"
        src={img}
        alt="STOCK ICON"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `http://${AVATAR_IMAGES_URL}/NO-IMAGE.png`;
        }}
      />
    </a>
  );
}
