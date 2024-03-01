import logo from "../../assets/Logo.svg";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from "@radix-ui/react-icons"

export default function Home() {
  return (
    <div className="bg-[#3F3F3F] w-screen h-screen text-white">
      {/* nav */}
      <div className="nav h-14 bg-df flex justify-around items-center p-4">
        <div className="company flex items-center justify-between w-fit">
          <img src="12" alt="Logo" className=" " />
          <div className="text-lg">CPI</div>
        </div>

        <div className="main-buttons flex items-center gap-8">
          <a href="">Home</a>
          <a href="">Contato</a>
          <a href="">Ações</a>
        </div>

        <div className="sign flex gap-4 items-center">
          <a href="" className="">
            Login
          </a>
          <a href="" className="p-1  bg-bl rounded">
            Registro
          </a>
        </div>
      </div>

      {/* main */}

      <main>
        <div className="news h-[360px] bg-red-900 relative w-100 h-">
          <div className="home-buttons w-fit bg-df bottom-6 rounded-df p-2 absolute left-1/2 transform -translate-x-1/2 ">
            <div className="buttons flex items-center gap-4 w-fit">
              <a href="" className="p-1 bg-bl rounded w-max">
                Ver Todos
              </a>
              <a href="" className="p-1">Ações</a>
              <a href="" className="p-1">Crypto</a>
              <a href="" className="p-1">Fiis</a>
            </div>
          </div>
        </div>

        <div className="selected-data">
          {/* Stock */}
          <div className="header flex items-center justify-around w-full h-40 bg-red-600">
            <div className="title w-fit">
              <h2 className="text-3xl font-bold">Ações</h2>
              <div className="text-bl ml-8 text-lg">Ibovespa</div>
            </div>

            <div className="card w-56 h-20 rounded-et bg-df flex items-center justify-around">
              <div className="main flex flex-col">
                <h4>Bovepsa</h4>
                <div className="updated flex">
                  <div className="u"><ArrowUpIcon className="text-green-700"/></div>
                  <div className="text-sm opacity-60">4,12 %</div>
                </div>
              </div>
              <h3><ArrowRightIcon className="cursor-pointer"/> </h3>
            </div>

            <div className="card w-56 h-20 rounded-et bg-df flex items-center justify-around">
              <div className="main flex flex-col">
                <h4>Empresas</h4>
                <div className="updated">
                  <div className="text-sm opacity-60">422</div>
                </div>
              </div>
              <h3></h3>
            </div>

            <div className="card w-56 h-20 rounded-et bg-df flex items-center justify-around">
              <div className="main flex flex-col">
                <h4>Segmentos</h4>
                <div className="updated">
                <div className="text-sm opacity-60">96</div>
                </div>
              </div>
              <h3></h3>
            </div>

            <div className="card w-56 h-20 rounded-et bg-df flex items-center justify-around">
              <div className="main flex flex-col">
                <h4>IPO</h4>
                <div className="updated">
                  <div className="text-sm opacity-60">100</div>
                </div>
              </div>
                <h3></h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
