
import OficialLogo from "../../assets/OficialLog.svg";
import { Register } from "../sign";

export function NavBar() {
  
  return(
    <div className="nav h-14 bg-df flex justify-around items-center p-4 text-white">
        <div className="company flex items-center justify-between w-fit gap-4 text-white">
          <a href="">
            <img src={OficialLogo} alt="Logo" className=" " />
          </a>
          <div className="text-lg ">CPI</div>
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
          <Register >
            <p className="p-1  bg-bl rounded cursor-pointer">
              Registro
            </p>
          </Register>
        </div>
      </div>
  )
}