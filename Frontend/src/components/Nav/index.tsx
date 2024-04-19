import OficialLogo from "../../assets/OficialLog.svg";
import { Register } from "../sign/register";
import { Login } from "../sign/login";
import { useAuth } from "@/contexts/AuthContext";

export function NavBar() {
  const { token } = useAuth();

  return (
    <div className="nav h-14 bg-df flex justify-around items-center p-4 text-white">
      <div className="company flex items-center justify-between w-fit gap-4 text-white">
        <a href="/" className="flex justify-center items-center gap-4">
          <img src={OficialLogo} alt="Logo" className=" " />
          <div className="text-lg ">CPI</div>
        </a>
      </div>

      <div className="main-buttons flex items-center gap-8">
        <a href="">Home</a>
        <a href="">Contato</a>
        <a href="">Ações</a>
      </div>

      <div className="sign flex gap-4 items-center">
        {token ? (
          <p>Logado</p>
        ) : (
          <>
            <Register>
              <p className="p-1  bg-bl rounded cursor-pointer">Registro</p>
            </Register>
            <Login>
              <p className="p-1 rounded cursor-pointer">Login</p>
            </Login>
          </>
        )}
      </div>
    </div>
  );
}
