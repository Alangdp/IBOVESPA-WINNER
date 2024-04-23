import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionsProps } from "@/types/Transaction.type";
import { ButtonHTMLAttributes, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const transactions: TransactionsProps[] = [
  {
    img: "https://statusinvest.com.br/img/company/avatar/331.jpg?v=42",
    ticker: "AAPL",
    name: "Banco do Brasil",
    transactionDate: new Date("2024-03-01"),
    transactionDateString: "2024-03-01",
    quantity: 100,
    price: 150.25,
    type: "BUY",
  },
  {
    img: "https://statusinvest.com.br/img/company/avatar/331.jpg?v=42",
    ticker: "GOOGL",
    name: "Banco do Brasil",
    transactionDate: new Date("2024-03-03"),
    transactionDateString: "2024-03-03",
    quantity: 50,
    price: 2100.75,
    type: "SELL",
  },
  {
    img: "https://statusinvest.com.br/img/company/avatar/331.jpg?v=42",
    ticker: "MSFT",
    name: "Banco do Brasil",
    transactionDate: new Date("2024-03-05"),
    transactionDateString: "2024-03-05",
    quantity: 75,
    price: 300.5,
    type: "BUY",
  },
  {
    img: "https://statusinvest.com.br/img/company/avatar/331.jpg?v=42",
    ticker: "AMZN",
    name: "Banco do Brasil",
    transactionDate: new Date("2024-03-06"),
    transactionDateString: "2024-03-06",
    quantity: 25,
    price: 3500.0,
    type: "SELL",
  },
];

export function TransactionTable() {
  // TODO - FAZER SISTEMA PEGA AS TRANSAÇÕES VIA API
  const [selected, setSelected] = useState<string>("Histórico");

  const teste = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;
    setSelected(button.innerText);
  };

  return (
    <>
      <div className="menu px-8 flex items-center gap-4 w-full mt-8"> 
        <button
          onClick={(event) => {
            teste(event);
          }}
          className={cn(
            "relative text-white text-xl font-bold duration-300 flex",
            selected === "Histórico" ? "text-blue-500" : ""
          )}
        >
          <span className="relative z-10">Histórico</span>
          <span className={cn("absolute left-1/2 -translate-x-1/2 bottom-0 top-7 w-5/6 h-1 bg-bl rounded-df transition-all duration-300 line-on-hover", selected !== "Histórico" ? "hidden" : "")}></span>
        </button>

        <button
          onClick={(event) => {
            teste(event);
          }}
          className={cn(
            "relative text-white text-xl font-bold duration-300 flex",
            selected === "Agendadas" ? "text-blue-500" : ""
          )}
        >
          <span className="relative z-10">Agendadas</span>
          <span className={cn("absolute left-1/2 -translate-x-1/2 bottom-0 top-7 w-5/6 h-1 bg-bl rounded-df transition-all duration-300 line-on-hover", selected !== "Agendadas" ? "hidden" : "")}></span>
        </button>
      </div>
      <div className="container rounded-df w-full mt-4 p-0 shadow-lg ">
        <Table className="rounded-df bg-[#1B2028] text-white shadow-gray-700 w-full p-0">
          <TableHeader className="rounded-df">
            <TableRow className="text-white font-bold rounded-df">
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
            </TableRow>
          </TableHeader>
          <TableBody className="rounded-df">
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell className="flex justify-start items-center gap-2 ml-4">
                  <img
                    src={transaction.img}
                    alt=""
                    className="rounded w-14 h-14"
                  />
                  <div className="col flex flex-col">
                    <h4>{transaction.ticker}3</h4>
                    Tipo
                  </div>
                </TableCell>
                <TableCell className="text-lg text-center">
                  {transaction.name}
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
                  {transaction.transactionDateString}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}