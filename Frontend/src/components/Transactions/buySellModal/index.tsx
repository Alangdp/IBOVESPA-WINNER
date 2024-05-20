import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, Cross2Icon } from "@radix-ui/react-icons";
import { ComboOptions } from "@/components/General/ComboxOptions";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TransactionFilterSchema, transactionFilterSchema } from "@/types/Transaction.type";
import { ResponseProps } from "@/types/Response.type";
import { capitalizeFirstLetter } from "@/Utils/String";
import { getTickers, registerTransaction } from "@/Utils/ApiUtils";

interface BuySellModalProps {
  text: string;
  className?: string;
}

export default function BuySellModal({ text, className }: BuySellModalProps) {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState("BUY");
  const [tickers, setTickers] = useState<string[]>()

  const toggleStatus = () => setIsOpen(!isOpen);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<TransactionFilterSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(transactionFilterSchema),
  });
  const transactionKeys = Object.keys(
    errors
  ) as (keyof TransactionFilterSchema)[];

  const fetchTickers = async () => {
    if(!tickers) setTickers(await getTickers())
  }

  useEffect(() => {
    fetchTickers()
    if(errors.ticker) {
      toast.error(errors['ticker']?.message);
    }

    if (transactionKeys.length > 1) {
      transactionKeys.forEach((item: keyof TransactionFilterSchema) => {
        toast.error(errors[item]?.message);
      });
    }
  }, [errors, transactionKeys]);

  const handleRegister = async (data: TransactionFilterSchema) => {
    const status = toast.loading("Registradno transação", {
      closeButton: Cross2Icon,
    });

    try {
      console.log(data, 123)
      await registerTransaction(data, token!, option as "BUY" | "SELL");
      setIsOpen(false)
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
          render: "Erro ao registrar transação",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <>
      <Button onClick={toggleStatus} className={cn("", className)}>
        {text}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed top-2 right-2">
            <motion.div
              key={"buysell"}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: "100%", transition: { duration: 0.5 } }} // Animação de saída
              transition={{ duration: 0.5 }}
              className="fixed w-96 h-[calc(100vh-50%)] bg-white rounded-lg top-2 right-2 drop-shadow-lg shadow-lg divide-y "
            >
              <nav className="w-full h-14 flex items-center justify-between p-4 text-black">
                <ArrowLeftIcon
                  className="hover:brightness-75 duration-300 w-6 h-auto cursor-pointer hover"
                  onClick={toggleStatus}
                />
                <p
                  onClick={toggleStatus}
                  className="hover:brightness-50 duration-300 cursor-pointer font-bold opacity-80"
                >
                  {" "}
                  Voltar
                </p>
              </nav>

              <div className="w-full text-black flex flex-col items-center">
                <div className="options w-full flex justify-center items-end">
                  <div
                    onClick={() => setOption("BUY")}
                    className={cn(
                      "flex font-semibold shadow justify-center flex-[0.5] p-2 duration-300 cursor-pointer transition-all",
                      option === "BUY"
                        ? "text-[#24C159]"
                        : "shadow border border-gray-200 border-t-0 bg-[#F9F9F9]  text-[#A6A6A6]"
                    )}
                  >
                    Compra
                  </div>
                  <div
                    onClick={() => setOption("SELL")}
                    className={cn(
                      "flex font-semibold shadow justify-center flex-[0.5] p-2 duration-300 cursor-pointer",
                      option === "SELL"
                        ? "text-[#FE5716]"
                        : "shadow border border-gray-200 border-t-0 bg-[#F9F9F9]  text-[#A6A6A6]"
                    )}
                  >
                    Venda
                  </div>
                </div>

                <form
                  action=""
                  className="w-full p-2 mt-4"
                  onSubmit={handleSubmit(handleRegister)}
                >
                  <div className="flex flex-wrap mb-6 divide-y divide-dashed">
                    <div className="w-full"></div>
                    <div className="w-full grid grid-cols-2 pt-4">
                      <div className="w-full mb-6 md:mb-0">
                        <label className="block uppercase  text-black tracking-wide text-xs font-bold mb-1">
                          Quantidade
                        </label>
                        <input
                          {...register("quantity", {
                            setValueAs: (value: string) => Number(value),
                          })}
                          className="w-5/6 appearance-none block bg-white text-black border border-gray-300 rounded p-2 mb-3 leading-tight focus:outline-none focus:bg-gray-100 duration-300"
                          id="grid-first-name"
                          type="text"
                          placeholder="Ex. 100"
                        ></input>
                      </div>
                      <div className="w-full mb-6 md:mb-0">
                        <label className="block uppercase  text-black tracking-wide text-xs font-bold mb-1">
                          Valor
                        </label>
                        <input
                          {...register("value", {
                            setValueAs: (value: string) => Number(value),
                          })}
                          className="w-5/6 appearance-none block bg-white text-black border border-gray-300 rounded p-2 mb-3 leading-tight focus:outline-none focus:bg-gray-100 duration-300"
                          id="grid-first-name"
                          type="text"
                          placeholder="Ex. 10.25"
                        ></input>
                      </div>
                    </div>
                    <div className="flex flex-wrap mt-2  pt-4 mb-6 w-full">
                      <div className="w-full flex gap-3">
                        <div className="">
                          <label className="block uppercase  text-black tracking-wide  text-xs font-bold mb-1">
                            Ativo
                          </label>
                          <ComboOptions
                            className="p-2"
                            placeholder="Tickers"
                            defaultValue="BBAS3"
                            options={tickers || []}
                            title="Tickers"
                            {...register("ticker")}
                            onChange={(value) => {
                              console.log(value?.toUpperCase()),
                                setValue("ticker", value?.toUpperCase() || "");
                            }}
                          />
                        </div>

                        <div className="relative max-w-sm">
                          <label className="block uppercase  text-black tracking-wide  text-xs font-bold mb-1">
                            Data da transação
                          </label>
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none translate-y-2">
                            <svg
                              className="w-4 h-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                          </div>
                          <input
                            id="dateInput"
                            onChange={(event) => {
                              const date = new Date(event.target.value);
                              if([0, 6].includes(date.getUTCDay())) {
                                toast.error("Não pode ser fim de semana!");
                                return;
                              } 

                              setValue("transactionDate", date)

                              
                            }}
                            type="date"
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[205px]"
                          ></input>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="total flex items-center justify-between p-4 text-black ml-1 w-full h-[56px]">
                        <p>Total</p>
                        <p className="font-bold">R${isNaN(getValues().quantity * getValues().value) ? "0.00" : getValues().quantity * getValues().value}</p>
                      </div>
                      <div className="flex items-center justify-center w-full mt-2">
                        <Button
                          className={cn(
                            "w-[90%] h-full py-4 hover:brightness-90 duration-500",
                            option === "BUY"
                              ? "bg-[#24C159] hover:bg-[#24C159]"
                              : "bg-[#FE5716] hover:bg-[#FE5716]"
                          )}
                        >
                          Registrar transação
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
