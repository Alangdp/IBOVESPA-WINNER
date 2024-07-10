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
import { useState } from "react";

interface SideBarProps {
  className?: string;
}

export default function SideBar({ className }: SideBarProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        "w-full lg:w-[256px] text-white h-fit lg:h-full justify-between bg-df flex flex-col",
        className
      )}
    >
      <div className="flex justify-around lg:justify-between items-center p-4 md:p-0 w-full">
        <a
          href="/"
          className="title flex justify-center items-center gap-4 lg:w-full lg:gap-4 lg:py-4 md:py-0 flex-col lg:flex-row md:gap-0 md:row-span-2"
        >
          <img src={OfficialLog} className="w-12 lg:w-12 h-12 lg:h-12" alt="" />
          <div className="text-2xl text-white font-bold">CPI</div>
        </a>
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      <div
        className={`buttons grid grid-cols-3 justify-items-center p-4 flex-col ${
          menuOpen ? "grid" : "hidden"
        } lg:flex justify-center items-center gap-4 md:row-span-6`}
      >
        <SideButton
          text="Overview"
          className="w-fit lg:w-full"
          active={true}
          icon={Squares}
        />
        <SideButton
          text="Ranking"
          className="w-fit lg:w-full"
          active={false}
          icon={FileTextIcon}
        />
        <SideButton
          text="Carteira"
          className="w-fit lg:w-full"
          active={false}
          icon={PieChartIcon}
        />
        <SideButton
          text="Transações"
          className="w-fit lg:w-full"
          active={false}
          icon={CardStackIcon}
        />
        <SideButton
          text="Noticias"
          className="w-fit lg:w-full"
          active={false}
          icon={FileTextIcon}
        />
      </div>

      <div
        className={`lg:flex-col justify-center flex-row ${
          menuOpen ? "flex" : "hidden"
        } m-8 gap-4 md:row-span-2`}
      >
        <SideButton
          text="Configurações"
          active={false}
          icon={FileTextIcon}
          className="flex-[0.5]"
        />
        <SideButton
          text="Sair"
          active={false}
          icon={FileTextIcon}
          onClick={() => navigate("/")}
          className="flex-[0.5]"
        />
      </div>
    </nav>
  );
}
