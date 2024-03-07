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

const transactions: TransactionsProps[] = [
  {
    img: "https://statusinvest.com.br/img/company/avatar/331.jpg?v=42",
    ticker: "AAPL",
    name:"Banco do Brasil", 
    transactionDate: new Date("2024-03-01"),
    transactionDateString: "2024-03-01",
    quantity: 100,
    price: 150.25,
    type: "BUY",
  },
  {
    img: "https://statusinvest.com.br/img/company/avatar/331.jpg?v=42",
    ticker: "GOOGL",
    name:"Banco do Brasil", 
    transactionDate: new Date("2024-03-03"),
    transactionDateString: "2024-03-03",
    quantity: 50,
    price: 2100.75,
    type: "SELL",
  },
  {
    img: "https://statusinvest.com.br/img/company/avatar/331.jpg?v=42",
    ticker: "MSFT",
    name:"Banco do Brasil", 
    transactionDate: new Date("2024-03-05"),
    transactionDateString: "2024-03-05",
    quantity: 75,
    price: 300.5,
    type: "BUY",
  },
  {
    img: "https://statusinvest.com.br/img/company/avatar/331.jpg?v=42",
    ticker: "AMZN",
    name:"Banco do Brasil", 
    transactionDate: new Date("2024-03-06"),
    transactionDateString: "2024-03-06",
    quantity: 25,
    price: 3500.0,
    type: "SELL",
  },
];

export function TransactionTable() {
  // TODO - FAZER SISTEMA PEGA AS TRANSAÇÕES VIA API

  return (
    <Table className="rounded-df bg-[#1B2028] text-white p-60 m-8 w-2/3 font-semibold shadow-md shadow-gray-700">
      <TableHeader>
        <TableRow className="text-white font-bold">
          <TableHead className="w-[200px] ">Ticker</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Valor total</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell className="flex justify-start items-center gap-2 ml-4">
              <img src={transaction.img} alt="" className="rounded w-14 h-14" />
              <div className="col flex flex-col">
                <h4>{transaction.ticker}3</h4>
                Tipo
              </div>
            </TableCell>
            <TableCell className="text-lg">{transaction.name}</TableCell>
            <TableCell>{transaction.quantity}</TableCell>
            <TableCell>{transaction.price}</TableCell>
            <TableCell>{transaction.price * transaction.quantity}</TableCell>
            <TableCell>{transaction.transactionDateString}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
