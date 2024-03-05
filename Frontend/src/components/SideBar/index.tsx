import {
  Component2Icon as Squares,
  PieChartIcon,
  CardStackIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";

import Logo from "../../assets/Logo.svg";
import { SideButton } from "../SideButton";
import { SelectedProvider } from "./SideContext";

import OfficialLog from "../../assets/OficialLog.svg";

export function SideBar() {
  return (
    <SelectedProvider>
      <nav className="w-[256px] bg-[#1B2028] h-screen text-white">
        <div className="title flex justify-center items-center gap-4 py-4">
          <img src={OfficialLog} className="w-16 h-16" alt="" />
          <div className="text-lg">CPI</div>
        </div>

        <div className="buttons flex flex-col justify-center items-center gap-4 mt-8 h-full">
          <SideButton text="Overview" active={false} icon={Squares} />
          <SideButton text="Carteira" active={false} icon={PieChartIcon} />
          <SideButton text="Transações" active={false} icon={CardStackIcon} />
          <SideButton text="Noticias" active={false} icon={FileTextIcon} />
        </div>

        <div className="blank m-8">

        </div>

        <div className="m-8">
          <SideButton text="Configurações" active={false} icon={FileTextIcon} />
          <SideButton text="Sair" active={false} icon={FileTextIcon} />
        </div>
      </nav>
    </SelectedProvider>
  );
}
