import {
  Component2Icon as Squares,
  PieChartIcon,
  CardStackIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";

import { SideButton } from "@/components/SideButton";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  const navigate = useNavigate();

  return (
    <nav
      className={cn(
        "w-full bg-[#1B2028] flex items-center justify-center py-4",
        className
      )}
    >
      <Link to="/" className="flex items-center gap-4">
        <div className="text-2xl text-white font-bold">CPI</div>
      </Link>

      <div className="grid grid-cols-3 gap-2">
        <SideButton text="Overview" active={true} icon={Squares} activable={true} className="w-fit"/>
        <SideButton text="Carteira" active={false} icon={PieChartIcon} activable={true} className="w-fit"/>
        <SideButton text="Transações" active={false} icon={CardStackIcon} activable={true} className="w-fit"/>
        <SideButton text="Noticias" active={false} icon={FileTextIcon} activable={true} className="w-fit"/>
        <SideButton text="Configurações" active={false} icon={FileTextIcon} activable={true} className="w-fit"/>
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