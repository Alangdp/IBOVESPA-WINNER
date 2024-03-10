import {
  Component2Icon as Squares,
  PieChartIcon,
  CardStackIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";

import { useNavigate } from "react-router-dom";
import { SideButton } from "../SideButton";
import OfficialLog from "../../assets/OficialLog.svg";

export function SideBar() {
  const navigate = useNavigate()

  return (
      <nav className="w-[256px] text-white flex flex-col h-full justify-between bg-[#1B2028]">
        <div className="title flex justify-center items-center gap-4 py-4">
          <img src={OfficialLog} className="w-16 h-16" alt="" />
          <div className="text-2xl text-white font-bold">CPI</div>
        </div>

        <div className="buttons flex flex-col justify-center items-center gap-4 mt-8">
          <SideButton text="Overview" active={true} icon={Squares} />
          <SideButton text="Carteira" active={false} icon={PieChartIcon}/>
          <SideButton text="Transações" active={false} icon={CardStackIcon} />
          <SideButton text="Noticias" active={false} icon={FileTextIcon} />
        </div>


        <div className="flex flex-col m-8 gap-4">
          <SideButton text="Configurações" active={false} icon={FileTextIcon} />
          <SideButton text="Sair" active={false} icon={FileTextIcon} onClick={() =>  navigate("/")} />
        </div>
      </nav>
  );
}
