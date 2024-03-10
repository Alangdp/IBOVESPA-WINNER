import { VariationCard } from "./Card";
import { TickerIcon } from "./Card/CardTickerIcon";

export function DashBoard() {
  // const { selected, setSelected } = useSelected();

  return (
    <main className="p-4 flex flex-col gap-4 h-full">
      <div className="top-cards flex w-full h-fit gap-7">
        <VariationCard
          className="w-1/3 p-2"
          variation={2.32}
          price={52.9}
          name="Banco do Brasil"
          ticker="BBAS3"
        />
        <VariationCard
          className="w-1/3 p-2"
          variation={2.32}
          price={52.9}
          name="Banco do Brasil"
          ticker="BBAS3"
        />
        <VariationCard
          className="w-1/3 p-2"
          variation={-2.32}
          price={52.9}
          name="Banco do Brasil"
          ticker="BBAS3"
        />
        <VariationCard
          className="w-1/3 p-2"
          variation={-2.32}
          price={52.9}
          name="Banco do Brasil"
          ticker="BBAS3"
        />
      </div>

      <div className="grid grid-cols-3 h-full py-4 rounded-df gap-4">
        <div className="grid col-span-1 grid-rows-3 h-full gap-4">
          <div className="wallet bg-[#3A6FF8] rounded-df">
            <h4 className="text-xl text-white p-4 font-semibold">Carteira</h4>
            <div className="flex p-4 items-center gap-4">
              <p className="text-2xl font-semibold text-white">R$ 56.312,23</p>
              <p className="text-[#1ECB4F] font-semibold">+0.25%</p>
            </div>
          </div>
          <div className="portifolio bg-[#1B2028] row-span-2 rounded-df">
            <h4 className="text-xl text-white p-4 font-semibold">Portifolio</h4>
            <div className="cards p-4 flex flex-col gap-2">
              <div className="card grid grid-cols-4 items-center">
                <TickerIcon img="http://localhost:3002/images/avatar/BBAS3-logo.jpg"/>
                <div className="grid grid-rows-2 ">
                  <h4 className="text-white font-semibold text-lg">BBAS3</h4>
                  <p className="opacity-60 text-white text-lg">R$ 4.231,23</p>
                </div>
                <div className="grid grid-rows-2 text-white mx-6">
                  <div className="flex items-center gap-1">100 <p className="text-sm opacity-65">QTD</p></div>
                  <div className="">42,31</div>
                </div>
                <div className=""><p className="text-[#F46D22]">-6.00%</p></div>
              </div>

              <div className="card grid grid-cols-4 items-center">
                <TickerIcon img="http://localhost:3002/images/avatar/BBAS3-logo.jpg"/>
                <div className="grid grid-rows-2 ">
                  <h4 className="text-white font-semibold text-lg">BBAS3</h4>
                  <p className="opacity-60 text-white text-lg">R$ 4.231,23</p>
                </div>
                <div className="grid grid-rows-2 text-white mx-6">
                  <div className="flex items-center gap-1">100 <p className="text-sm opacity-65">QTD</p></div>
                  <div className="">42,31</div>
                </div>
                <div className=""><p className="text-[#F46D22]">-6.00%</p></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid col-span-2 grid-rows-4 h-full gap-4">
          <div className="row-span-3 bg-[#1B2028] rounded-df"></div>
          <div className="row-span-1 bg-[#1B2028] rounded-df"></div>
        </div>
      </div>
    </main>
  );
}
