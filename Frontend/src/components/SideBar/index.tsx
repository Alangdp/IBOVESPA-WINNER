import {
  Component2Icon as Squares,
  PieChartIcon,
  CardStackIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";

import { useNavigate } from "react-router-dom";
import { SideButton } from "../SideButton";
import OfficialLog from "../../assets/OficialLog.svg";
import { cn } from "@/lib/utils";

interface SideBarProps {
  className?: string;
}

export function SideBar({ className }: SideBarProps) {
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        "w-[256px] text-white grid grid-rows-10 h-full justify-between bg-[#1B2028]",
        className
      )}
    >
      <div className="title flex row-span-2 justify-center items-center gap-4 py-4 ">
        <img src={OfficialLog} className="w-16 h-16" alt="" />
        <div className="text-2xl text-white font-bold">CPI</div>
      </div>

      <div className="buttons flex flex-col justify-center items-center gap-4 row-span-6">
        <SideButton text="Overview" active={true} icon={Squares} />
        <SideButton text="Carteira" active={false} icon={PieChartIcon} />
        <SideButton text="Transações" active={false} icon={CardStackIcon} />
        <SideButton text="Noticias" active={false} icon={FileTextIcon} />
      </div>

      <div className="flex flex-col m-8 gap-4 row-span-2">
        <SideButton text="Configurações" active={false} icon={FileTextIcon} />
        <SideButton
          text="Sair"
          active={false}
          icon={FileTextIcon}
          onClick={() => navigate("/")}
        />
      </div>
    </nav>
  );
}
