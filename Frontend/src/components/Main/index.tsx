import { DashBoard } from "../Dashboard";
import { Header } from "../Header";
import { NavBar } from "../Nav";
import { TransactionTable } from "../Transactions";
import { SideBar } from "../SideBar";
import { useSelected } from "../SideBar/SideContext";
import BuySellModal from "../Transactions/buySellModal";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { ChartProps, getEmptyChart } from "@/types/Chart.type";
import { getHistory, getTickers } from "@/Utils/ApiUtils";
import { AnimatePresence } from "framer-motion";
import { SimplifiedDataHistory } from "@/types/History.type";
import { Ranking } from "../Ranking";
import Wallet from "../Wallet";
import NewsComponent from "../Noticias";

export default function MainDashBoard() {
  const { selected } = useSelected();
  const { token } = useAuth();
  const [chart, setChart] = useState<ChartProps>()
  const [history, setHistory] = useState<SimplifiedDataHistory>()
  const [tickers, setTickers] = useState<string[]>([])
 
  const fetchData = async () => {
    if(!tickers) setTickers(await getTickers())
    if(!history) {
      const history = await getHistory(token!)
      setHistory(history);
      setChart(history.chart);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, tickers]);

  const empty: SimplifiedDataHistory = {
    historyData: {},
    chart: {
      globalRentability: 0,
      globalStockQuantity: 0,
      globalStockValue: 0,
      globalDividendValue: 0,
      globalTotalValue: 0,
      globalInvested: 0,
      individualRentability: {},
      portifolio: {}
    }
  }

  return (
    <div className="content bg-[#1e1e1e] flex h-screen overflow-hidden w-screen flex-col lg:flex-row overflow-x-hidden">
      <SideBar className="hidden lg:grid" />
      <NavBar className="lg:hidden gap-4"/>
      <div className="container w-full h-full p-4 overflow-y-scroll no-scrollbar">
        <Header title={selected} />
        <AnimatePresence mode="popLayout">
          {selected === "Overview" ? <DashBoard chart={chart!} history={history || empty}/>: <></>}
          {selected === "Carteira" ? <Wallet tickers={tickers} chart={chart ? chart : getEmptyChart() }/> : <></>}
          {selected === "Transações" ? <TransactionTable chart={chart!}/> : <></>}
          {selected === "Ranking" ? <Ranking/> : <></>}
          {selected === "Noticias" ? <NewsComponent/> : <></>}
        </AnimatePresence>
      </div>
    </div>
  );
}
