import { z } from "zod";

export type TransactionType = "BUY" | "SELL";

export interface TransactionsProps {
  id: number;
  ticker: string;
  transactionDate: string;
  price: number;
  quantity: number;
  totalValue: number;
  type: string;
  userId: number;
}

export const transactionFilterSchema = z.object({
  quantity: z.number().min(1, "Quantidade mínima é 1"),
  value: z.number().min(1, "Valor mínimo é 1"),
  ticker: z
    .string()
    .regex(new RegExp(/^[A-Z0-9]{5,6}$/i), "Ticker inválido")
    .default("A"),
  transactionDate: z.date({
    errorMap: ({ code }, { defaultError }) => {
      if (code == "invalid_date") return { message: "Data inválida" };
      return { message: defaultError };
    },
  }),
});

export type TransactionFilterSchema = z.infer<typeof transactionFilterSchema>;
