interface TickerIconProps {
  img: string;
}

export function TickerIcon({img}: TickerIconProps) {
  return (
    <div className="icon p-2 rounded-df bg-[#31353F] overflow-hidden h-fit w-fit">
      <img
        className="w-8 h-8 rounded-df"
        src={img}
        alt="STOCK ICON"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "http://localhost:3002/images/avatar/NO-IMAGE.png";
        }}
      />
    </div>
  );
}