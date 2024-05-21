import { AnimatePresence, motion } from "framer-motion";
// import RankingCard from "./RankingCard";
import RankingCardDark from "./RankingCard/dark";

export function Ranking() {
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
          <RankingCardDark maxPrice={14} name="Banco do Brasil" price={12} rankingNumber={1} ticker="BBAS3"/>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
