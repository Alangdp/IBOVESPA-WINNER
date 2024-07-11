interface RankingCardProps {}

export default function RankingCard() {
  return (
    <div className="w-full h-80 rounded-xl text-[#808080] bg-white shadow-lg text-sm">
      <div className="top w-full rounded-t-xl h-[18%] flex items-center justify-center px-4 pt-2">
        <div className="flex-[0.33]">Ranking 1</div>
        <div className="flex-[0.33] flex flex-col items-center">
          <p>BBAS3</p>
          <p>Banco do Brasil</p>
        </div>
        <div className="flex-[0.33]"></div>
      </div>
      <div className="w-full h-[40%] grid grid-cols-2">
        <div className="w-full h-full flex flex-col p-2">
          <img
            src="http://statusinvest.com.br/img/company/cover/331.jpg?v=78"
            className="w-[165px] h-[55px] rounded-[55px]"
            alt=""
          />
          <div className="flex flex-col justify-center items-start p-2 gap-1">
            <h5 className="flex gap-2 items-center">
              Cotação <p className="p-1 bg-[#F7A800] text-white">50.43R$</p>
            </h5>
            <h5 className="flex gap-2 items-center">
              Preço teto <p className="p-1 bg-[#008000] text-white">50.43R$</p>
            </h5>
          </div>
        </div>

        <div className="w-full h-full flex flex-col p-2 px-4 gap-2 items-end">
          <div className=" text-center p-1 bg-[#E9E9E9] w-16 rounded-lg text-black">
            DY 20%
          </div>
          <div className=" text-center p-1 bg-[#E9E9E9] w-16 rounded-lg text-black flex items-center gap-2 justify-center">
            MDI <p className="w-2 h-2 rounded-full bg-green-500"></p>
          </div>

          <div className="flex flex-col items-center text-[14px] mt-2">
            <h4>Margem de Segurança</h4>
            <p className="text-black font-bold text-base">100%</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-[14px] mt-2">
        <h4>MDI</h4>
        <div className="grid grid-cols-6 grid-rows-2 gap-1 bg-[#808080] rounded-lg text-white p-1">
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
