interface TickerIconProps {
  img: string;
}

export function TickerIcon({img}: TickerIconProps) {
  const AVATAR_IMAGES_URL = import.meta.env.VITE_AVATAR_IMAGES_URL

  return (
    <div className="icon p-2 rounded-df bg-[#31353F] overflow-hidden h-fit w-fit">
      <img
        className="w-8 h-8 rounded-df"
        src={img}
        alt="STOCK ICON"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = `http://${AVATAR_IMAGES_URL}/NO-IMAGE.png`
        }}
      />
    </div>
  );
}
