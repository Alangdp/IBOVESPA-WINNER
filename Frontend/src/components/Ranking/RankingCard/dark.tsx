const logoURL = import.meta.env.VITE_LOGO_IMAGES_URL;

interface RankingCardProps {
  rankingNumber: number;
  ticker: string;
  name: string;
  price: number;
  maxPrice: number;
  dy: number;
}

export default function RankingCardDark({
  maxPrice,
  name,
  price,
  rankingNumber,
  ticker,
  dy,
}: RankingCardProps) {
  return (
    <div className="w-full h-80 rounded-xl text-white bg-df shadow-sm shadow-white/5 text-sm p-1">
      <div className="top w-full rounded-t-xl h-[18%] flex items-center justify-center px-4 pt-2">
        <div className="flex-[0.33] text-gray-400">Ranking {rankingNumber}</div>
        <div className="flex-[0.33] flex flex-col items-center">
          <p>{ticker.toUpperCase()}</p>
          <p>{name}</p>
        </div>
        <div className="flex-[0.33]"></div>
      </div>
      <div className="w-full h-[40%] grid grid-cols-2">
        <div className="w-full h-full flex flex-col p-2">
          <a
            href={`/market/brasil/${ticker}`}
            className="w-20 h-20 rounded-full bg-cover bg-center border-2 border-gray-400 bg-white cursor-pointer hover:opacity-60 duration-300"
            style={{
              backgroundImage: `url('http://${logoURL}/${ticker}-logo.jpg')`,
            }}
          ></a>
          <div className="flex flex-col justify-center items-start p-2 gap-1">
            <h5 className="flex gap-2 items-center">
              Cotação <p className="px-1 bg-yellow-400 text-black">{price}R$</p>
            </h5>
            <h5 className="flex gap-2 items-center">
              Preço teto{" "}
              <p className="px-1 bg-green-500 text-black">
                {maxPrice.toFixed(2)}R$
              </p>
            </h5>
          </div>
        </div>

        <div className="w-full h-full flex flex-col p-2 px-4 gap-2 items-end">
          <div className="text-center p-1 bg-gray-700 w-16 rounded-lg text-white">
            {dy ? dy.toFixed(2) + "%" : "-"}
          </div>
          <div className="text-center p-1 bg-gray-700 w-16 rounded-lg text-white flex items-center gap-2 justify-center">
            MDI <p className="w-2 h-2 rounded-full bg-green-500"></p>
          </div>

          <div className="flex flex-col items-center text-gray-400 mt-2">
            <h4>Margem de Segurança</h4>
            <p className="text-white font-bold text-base">
              {((maxPrice / price - 1) * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-gray-400 mt-2">
        <h4>MDI</h4>
        <div className="grid grid-cols-6 grid-rows-2 gap-1 bg-gray-700 rounded-lg text-white p-1">
          <p>Jan</p>
          <p>Fev</p>
          <p>Mar</p>
          <p>Abr</p>
          <p>Mai</p>
          <p>Jun</p>
          <p>Jul</p>
          <p>Ago</p>
          <p>Set</p>
          <p>Out</p>
          <p>Nov</p>
          <p>Dez</p>
        </div>
      </div>
    </div>
  );
}
