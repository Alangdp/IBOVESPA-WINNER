import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TransactionsProps } from "@/types/Transaction.type";
import { deleteTransaction, getTransaction } from "@/Utils/ApiUtils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { TransactionEdit } from "./editModal";
import { ChartProps } from "@/types/Chart.type";
import { motion } from "framer-motion";

const AVATAR_URL: string = import.meta.env.VITE_AVATAR_IMAGES_URL;

interface TransactionTableProps {
  chart: ChartProps;
}

export function TransactionTable({ chart }: TransactionTableProps) {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<TransactionsProps[]>();
  const [selected, setSelected] = useState<string>("Histórico");

  const handleClickOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const button = e.target as HTMLButtonElement;
    setSelected(button.innerText);
  };

  const fetchData = async () => {
    if (!transactions) setTransactions(await getTransaction(token!));
  };

  const deleteTransactionUpdateState = async (
    transactionId: number,
    token: string
  ) => {
    const transactionIdPro = await deleteTransaction(transactionId, token);
    if (!transactionIdPro) return null;

    setTransactions(
      transactions?.filter((item) => item.id !== transactionIdPro)
    );
  };

  useEffect(() => {
    fetchData();
  }, [transactions]);

  return (
    <motion.div
      className="h-full"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
    >
      <div className="menu px-8 flex items-center gap-4 w-full mt-8">
        <button
          onClick={(event) => {
            handleClickOption(event);
          }}
          className={cn(
            "relative text-white text-xl font-bold duration-300 flex",
            selected === "Histórico" ? "text-blue-500" : ""
          )}
        >
          <span className="relative z-10">Histórico</span>
          <span
            className={cn(
              "absolute left-1/2 -translate-x-1/2 bottom-0 top-7 w-5/6 h-1 bg-bl rounded-df transition-all duration-300 line-on-hover",
              selected !== "Histórico" ? "hidden" : ""
            )}
          ></span>
        </button>

        <button
          onClick={(event) => {
            handleClickOption(event);
          }}
          className={cn(
            "relative text-white text-xl font-bold duration-300 flex",
            selected === "Agendadas" ? "text-blue-500" : ""
          )}
        >
          <span className="relative z-10">Agendadas</span>
          <span
            className={cn(
              "absolute left-1/2 -translate-x-1/2 bottom-0 top-7 w-5/6 h-1 bg-bl rounded-df transition-all duration-300 line-on-hover",
              selected !== "Agendadas" ? "hidden" : ""
            )}
          ></span>
        </button>
      </div>
      <div className="h-5/6 container rounded-df w-full mt-4 p-0 shadow-lg bg-df">
        <Table className="rounded-df bg-df text-white shadow-gray-700 w-full p-0 h-full">
          <TableHeader className="rounded-df">
            <TableRow className="text-white font-bold rounded-df h-2">
              <TableHead className="w-[200px] text-center font-bold text-lg">
                Ticker
              </TableHead>
              <TableHead className="text-center font-bold text-lg">
                Nome
              </TableHead>
              <TableHead className="text-center font-bold text-lg">
                Quantidade
              </TableHead>
              <TableHead className="text-center font-bold text-lg">
                Valor
              </TableHead>
              <TableHead className="text-center font-bold text-lg">
                Valor total
              </TableHead>
              <TableHead className="text-center font-bold text-lg">
                Data
              </TableHead>
              <TableHead className="text-center font-bold text-lg"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="rounded-df">
            {transactions &&
              transactions.map((transaction, index) => (
                <TableRow key={index} className="">
                  <TableCell className="flex justify-start items-center gap-2 ml-4">
                    <img
                      src={`http://${AVATAR_URL}/${transaction.ticker}-logo.jpg`}
                      alt=""
                      className="rounded w-14 h-14"
                    />
                    <div className="col flex flex-col">
                      <h4>{transaction.ticker}</h4>
                      <h2>{transaction.type}</h2>
                    </div>
                  </TableCell>
                  <TableCell className="text-lg text-center h-fit">
                    {transaction.ticker}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.quantity}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.price}
                  </TableCell>
                  <TableCell className="text-center">
                    {transaction.price * transaction.quantity}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="justify-center gap-4">
                    <Button
                      variant={"destructive"}
                      onClick={async () =>
                        await deleteTransactionUpdateState(
                          transaction.id,
                          token!
                        )
                      }
                      className="mb-2 w-20 hover:opacity-70 duration-300"
                    >
                      Deletar
                    </Button>
                    <TransactionEdit
                      props={transaction}
                      token={token!}
                      transactions={transactions}
                      state={setTransactions}
                    >
                      <Button
                        variant={"default"}
                        className=" w-20 bg-[#3A6FF8]"
                      >
                        Editar
                      </Button>
                    </TransactionEdit>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
