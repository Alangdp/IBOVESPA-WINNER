import { DashBoard } from "../Dashboard";
import { Header } from "../Header";
import { NavBar } from "../Nav";
import { TransactionTable } from "../Transactions";
import { SideBar } from "../SideBar";
import { useSelected } from "../SideBar/SideContext";
import BuySellModal from "../Transactions/buySellModal";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { ChartProps } from "@/types/Chart.type";
import { getChart } from "@/Utils/ApiUtils";
import { AnimatePresence, motion } from "framer-motion";

export default function MainDashBoard() {
  const { selected } = useSelected();
  const { token } = useAuth();
  const [chart, setChart] = useState<ChartProps>()
 
  const fetchData = async () => {
    if(!chart) setChart(await getChart(token!))
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div className="content bg-[#1e1e1e] flex h-screen overflow-hidden w-screen flex-col lg:flex-row">
      <SideBar className="hidden lg:grid" />
      <NavBar className="lg:hidden gap-4"/>
      <div className="container w-full h-full p-4 overflow-y-scroll no-scrollbar">
        <Header title="Dashboard" />
        <AnimatePresence mode="popLayout">
          {selected === "Overview" ? <DashBoard chart={chart!}/>: <></>}
          {selected === "Carteira" ? <BuySellModal text="Teste"/> : <></>}
          {selected === "Transações" ? <TransactionTable chart={chart!}/> : <></>}
        </AnimatePresence>
      </div>
    </div>
  );
}
