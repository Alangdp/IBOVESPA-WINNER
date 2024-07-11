import { News } from "@/types/News.type";
import { getNews } from "@/Utils/ApiUtils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import NewsModal from "./dialog";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default function NewsComponent() {
  const [selectedNews, setSelectedNews] = useState<News>();
  const [news, setNews] = useState<News[]>();

  const fetchData = async () => {
    if (!news) setNews(await getNews());
  };

  useEffect(() => {
    if (!news) fetchData();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="container mx-auto p-4"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
      >
        <div className="header h-16 bg-df w-full rounded-df my-4 shadow-[0_4px_6px_rgba(255,255,255,0.05)]"></div>
        <Table className="min-w-full bg-df  rounded-df text-white shadow-[0_4px_6px_rgba(255,255,255,0.05)]">
          <TableHeader className="rounded-df">
            <TableRow>
              <TableHead className="py-2 px-4 border-b w-[5%] ">Hora</TableHead>
              <TableHead className="py-2 px-4 border-b w-[6%] ">
                Simbolos
              </TableHead>
              <TableHead className="py-2 px-4 border-b w-2/6 ">
                Título
              </TableHead>
              <TableHead className="py-2 px-4 border-b w-1/12 ">
                Provedor
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news?.map((n) => (
              <TableRow
                key={n.published}
                className="hover:bg-zinc-600 cursor-pointer"
                onClick={() => {
                  setSelectedNews(n);
                }}
              >
                <TableCell className="py-2 px-4 border-b w-1/6">
                  {dayjs().to(new Date().getTime() - n.published)}
                </TableCell>
                <TableCell className="py-2 px-4 border-b w-full flex items-center gap-1">
                  {n.symbols.map((item, index) => {
                    if (index > 3) return;
                    return (
                      <a href="#">
                        <img
                          key={index}
                          src={`http://s3-symbol-logo.tradingview.com/${n.symbolsSVG?.[index]}.svg`}
                          alt="Logo"
                          className={`w-7 h-7 rounded-full`}
                          decoding="async"
                        />
                      </a>
                    );
                  })}
                </TableCell>

                <TableCell className="py-2 px-4 border-b w-2/6">
                  {n.title}
                </TableCell>
                <TableCell className="py-2 px-4 border-b w-1/6">
                  {n.sponsor.substring(0, 1).toLocaleUpperCase() +
                    n.sponsor.substring(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
      {selectedNews && (
        <NewsModal
          news={selectedNews!}
          open={selectedNews ? true : false}
          onClose={() => {
            setSelectedNews(undefined);
          }}
        />
      )}
    </AnimatePresence>
  );
}
