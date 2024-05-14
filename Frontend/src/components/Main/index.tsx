import { DashBoard } from "../Dashboard";
import { Header } from "../Header";
import { NavBar } from "../Nav";
import { TransactionTable } from "../Transactions";
import { SideBar } from "../SideBar";
import { useSelected } from "../SideBar/SideContext";
import BuySellModal from "../Transactions/buySellModal";

export default function MainDashBoard() {
  const { selected } = useSelected();
 
  return (
    <div className="content bg-[#1e1e1e] flex h-screen overflow-hidden w-screen flex-col lg:flex-row">
      <SideBar className="hidden lg:grid" />
      <NavBar className="lg:hidden gap-4"/>
      <div className="container w-full h-full p-4 overflow-y-scroll no-scrollbar">
        <Header title="Dashboard" />
        {selected === "Overview" ? <DashBoard />: <></>}
        {selected === "Transações" ? <TransactionTable /> : <></>}
      </div>
    </div>
  );
}
