import { editTransaction } from "@/Utils/ApiUtils";
import { capitalizeFirstLetter } from "@/Utils/String";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResponseProps } from "@/types/Response.type";
import { TransactionsProps } from "@/types/Transaction.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface TransactionModalProps {
  props: TransactionsProps;
  children: React.ReactNode;
  token: string;
  transactions: TransactionsProps[];
  state: React.Dispatch<React.SetStateAction<any>>
}

const transactionFilterSchema = z.object({
  quantity: z
    .number()
    .min(1, "Minimum quantity is 1")
    .max(100000, "Max quantity is 100000"),
  price: z.number().min(1, "Minimum quantity is 1").max(100000),
});

type TransactionFilterSchema = z.infer<typeof transactionFilterSchema>;

export function TransactionEdit({ props, children, token, transactions, state }: TransactionModalProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFilterSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(transactionFilterSchema),
  });

  const transactionKeys = Object.keys(
    errors
  ) as (keyof TransactionFilterSchema)[];

  async function handleUpdate(data: TransactionFilterSchema) {
    const status = toast.loading("Tentando atualizar transação!", {
      closeButton: Cross2Icon,
    });

    try {
      props = {...props, ...data};

      const newTransaction = await editTransaction(props.id, token, props)
      
      toast.update(status, {
        render: "Transação editada!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      state( transactions.map( transaction => {
        if(transaction.id === newTransaction.data?.id) {
          return newTransaction.data;
        }
        return transaction;
      }))

      setOpen(false);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.data) {
        const errors: ResponseProps<any> = error.response.data;
        errors.errors?.forEach((error) => {
          toast.update(status, {
            render: capitalizeFirstLetter(error.message),
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        });
      } else {
        toast.update(status, {
          render: "Erro ao criar conta",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  }

  useEffect(() => {
    if (transactionKeys.length > 1) {
      transactionKeys.forEach((item: keyof TransactionFilterSchema) => {
        toast.error(errors[item]?.message);
      });
    }
  }, [errors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1B2028] text-white">
        <DialogHeader>
          <DialogTitle>Edição transação</DialogTitle>
          <DialogDescription>
            Faz alteração na transação {props.id}, ticker {props.ticker}
          </DialogDescription>
        </DialogHeader>
        <form 
          onSubmit={handleSubmit(handleUpdate)}
          className="grid gap-4 py-4" 
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-start">
              Preço
            </Label>
            <Input
              id="price"
              type={"text"}
              defaultValue={props.price}
              className="col-span-3 border-gray-300 border rounded p-2 outline-none text-white"
              {...register("price", {
                setValueAs: (value: string) => Number(value),
              })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-start">
              Quantidade
            </Label>
            <Input
              id="quantity"
              type="number"
              defaultValue={props.quantity}
              className="col-span-3 border-gray-300 border rounded p-2 outline-none text-white"
              {...register("quantity", {
                setValueAs: (value: string) => Number(value),
              })}
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-[#232a35] shadow-lg">Salvar altereção</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
