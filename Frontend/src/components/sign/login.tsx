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

import {
  Cross2Icon,
  EnvelopeClosedIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import axios from "axios";
import { ResponseProps } from "@/types/Response.type";
import { TokenProps } from "@/types/Token.type";
import { useAuth } from "@/contexts/AuthContext";

const userFilterSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is not valid" })
    .trim()
    .min(4)
    .toLowerCase(),
  password: z.string().trim().min(8, "Password must be a min 8 length"),
});

type UserFilterSchema = z.infer<typeof userFilterSchema>;

export function Login({ children }: RegisterDialogProps) {
  const { updateToken, token } = useAuth();
  const USER_API_URL = import.meta.env.VITE_USER_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFilterSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(userFilterSchema),
  });
  const userKeys = Object.keys(errors) as (keyof UserFilterSchema)[];

  async function handleLogin(data: UserFilterSchema) {
    const capitalize = (s: string) =>
      (s && s[0].toUpperCase() + s.slice(1)) || "";
    const status = toast.loading("Tentando criar conta!", {
      closeButton: Cross2Icon,
    });

    try {
      const response = await axios.post(`http://${USER_API_URL}/users/login`, {
        ...data,
      });
      const responseData: ResponseProps<TokenProps> = response.data;

      const tokenData = responseData.data;
      if (!tokenData) {
        toast.update(status, {
          render: "Erro ao logar",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
        return;
      }

      updateToken(tokenData.token);

      toast.update(status, {
        render: "Login Concluido",
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
        console.log("Error:", error);
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
      form={
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col justify-center items-center text-white gap-y-6"
        >
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

          <Button type="submit" className="bg-[#3A6FF8]">
            Criar Conta
          </Button>
        </form>
      }
    >
      {children}
    </HomeDialog>
  );
}
