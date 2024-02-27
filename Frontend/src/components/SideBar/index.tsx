import {
  Component2Icon as Squares,
  PieChartIcon,
  CardStackIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";

import Logo from "../../assets/Logo.svg";
import { SideButton } from "../SideButton";
import { SelectedProvider } from "./SideContext";

export function SideBar() {
  return (
    <SelectedProvider>
      <div className="w-[256px] bg-[#1B2028] h-screen rounded-r text-white">
        <div className="title flex flex-col justify-center items-center py-4">
          <img src={Logo} className=" w-44" alt="" />
        </div>
      
        <div className="buttons flex flex-col justify-center items-center gap-4 mt-8">
          {/* <ButtonIcon text='Overview' active={true} icon={Squares}/>    */}

          <SideButton
            text="Overview"
            active={false}
            icon={Squares}
          />
          <SideButton
            text="Carteira"
            active={false}
            icon={PieChartIcon}
          />
          <SideButton
            text="Transações"
            active={false}
            icon={CardStackIcon}
          />
          <SideButton
            text="Noticias"
            active={false}
            icon={FileTextIcon}
          />
        </div>
      </div>
    </SelectedProvider>
  );
}
