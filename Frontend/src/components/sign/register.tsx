import { Input } from "../ui/input";
import { HomeDialog } from "./HomeDialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { DialogItem } from "./DialgoInput";
interface RegisterDialogProps {
  children: React.ReactNode;
}

const USER_API = import.meta.env.VITE_USER_API_URL as unknown as string;

import {
  Cross2Icon,
  EnvelopeClosedIcon,
  LockClosedIcon,
  Pencil1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import { ResponseProps } from "@/types/Response.type";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const userFilterSchema = z.object({
  name: z.string().trim().min(3, { message: "Name must be a min 3 length" }),
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .trim()
    .min(4)
    .toLowerCase(),
  password: z.string().trim().min(8, "Password must be a min 8 length"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
});

type UserFilterSchema = z.infer<typeof userFilterSchema>;

export function Register({ children }: RegisterDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<UserFilterSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(userFilterSchema),
  });
  const userKeys = Object.keys(errors) as (keyof UserFilterSchema)[];

  async function handleRegister(data: UserFilterSchema) {
    const capitalize = (s: string) =>
      (s && s[0].toUpperCase() + s.slice(1)) || "";
    const status = toast.loading("Tentando criar conta!", {
      closeButton: Cross2Icon,
    });

    try {
      await axios.post(`http://${USER_API}/users/`, { ...data });
      toast.update(status, {
        render: "Conta criada",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.data) {
        const errors: ResponseProps<any> = error.response.data;

        errors.errors?.forEach((error) => {
          toast.update(status, {
            render: capitalize(error.message),
            type: "error",
            isLoading: false,
            autoClose: 1000,
          });
        });
      } else {
        // Handle unexpected errors
        console.error("Error:", error);
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
    if (userKeys.length > 1) {
      userKeys.forEach((item: keyof UserFilterSchema) => {
        toast.error(errors[item]?.message);
      });
    }
  }, [errors, userKeys]);

  return (
    <HomeDialog
      title="Registro"
      form={
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col justify-center items-center text-white gap-y-6"
        >
          <div className="field flex items-center gap-2 w-full justify-center">
            <PersonIcon width={30} height={30} />
            <div className="input flex flex-col items-start gap-1 w-fit">
              <label className="text-sm">Nome</label>
              <Input
                className="border-none bg-transparent outline-none text-white"
                id={"name"}
                placeholder={"Ex. João Silveira"}
                type={"text"}
                {...register("name")}
              />
              <div className="w-full h-[1px] bg-zinc-100/80 rounded-df"></div>
            </div>
          </div>

          <div className="field flex items-center gap-2 w-full justify-center">
            <EnvelopeClosedIcon width={30} height={30} />
            <div className="input flex flex-col items-start gap-1 w-fit">
              <label className="text-sm">Email</label>
              <Input
                className="border-none bg-transparent outline-none text-white"
                id={"email"}
                placeholder={"Ex. email@email.com"}
                type={"text"}
                {...register("email")}
              />
              <div className="w-full h-[1px] bg-zinc-100/80 rounded-df"></div>
            </div>
          </div>

          <div className="field flex items-center gap-2 w-full justify-center">
            <LockClosedIcon width={30} height={30} />
            <div className="input flex flex-col items-start gap-1 w-fit">
              <label className="text-sm">Senha</label>
              <Input
                className="border-none bg-transparent outline-none text-white"
                id={"email"}
                placeholder={"Ex. ********"}
                type={"password"}
                {...register("password")}
              />
              <div className="w-full h-[1px] bg-zinc-100/80 rounded-df"></div>
            </div>
          </div>

          <div className="field flex items-center gap-2 w-full justify-center">
            <Pencil1Icon width={30} height={30} />
            <div className="input flex flex-col items-start gap-1 w-fit">
              <label className="text-sm">Telefone</label>
              <Input
                className="border-none bg-transparent outline-none text-white"
                id={"phone"}
                placeholder={"Ex. ********"}
                type={"text"}
                {...register("phone")}
              />
              <div className="w-full h-[1px] bg-zinc-100/80 rounded-df"></div>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-[#3A6FF8]"
            onClick={() => trigger("name")}
          >
            Criar Conta
          </Button>
        </form>
      }
    >
      {children}
    </HomeDialog>
  );
}
