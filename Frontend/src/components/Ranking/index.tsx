import { AnimatePresence, motion } from "framer-motion";
// import RankingCard from "./RankingCard";
import RankingCardDark from "./RankingCard/dark";
import { getRanking } from "@/Utils/ApiUtils";
import { useEffect, useState } from "react";
import { PontuationProps, PontuationReturn } from "@/types/rank.type";

export function Ranking() {
  const [ranking, setRanking] = useState<PontuationReturn>()

  const fetchData = async () => {
    const data = await getRanking()
    if(!ranking) setRanking(data)
  }

  useEffect( () => {
    if(!ranking) fetchData()

  }, [] )

  return (
    <AnimatePresence>
      <motion.div
        className="p-4 flex flex-col gap-4 h-[90vh] overflow-y-scroll no-scrollbar "
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }} 
      >
        <div className="header h-16 bg-df w-full rounded "></div>
        <div className="grid grid-cols-3 gap-4">
        {ranking && Object.keys(ranking).map( (ticker, index) => {
            return(
              <RankingCardDark ticker={ticker} name={ticker} maxPrice={10} price={10} rankingNumber={index + 1} key={`${ticker}`+ index}/>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
