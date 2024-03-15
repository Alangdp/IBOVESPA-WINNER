import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { ElementType, ReactNode } from "react";

interface RegisterDialogProps {
  children: ReactNode;
}

interface DialogItemProps {
  Icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  text?: string;
  placeHolder?: string;
  type: "text" | "password";
}

function DialogItem({ Icon, placeHolder, text, type }: DialogItemProps) {
  return (
    <div className="field flex items-center gap-2 w/1">
      {Icon ? <Icon width={30} height={30}/> : null}
      <div className="input flex flex-col items-start gap-1 w-fit">
        <label htmlFor="name  " className="text-sm">
          {text}
        </label>
        <Input
          className="border-none bg-transparent outline-none"
          id="name"
          placeholder={placeHolder}
          type={type}
        />
        <div className="w-full h-[1px] bg-zinc-100/80 rounded-df  "></div>
      </div>
    </div>
  );
}

export function RegisterDialog({ children }: RegisterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[320px] bg-[#1B2028]">
        <DialogHeader>
          <DialogTitle>
            <h4 className="text-white">Criar Conta</h4>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center text-white gap-y-6">
          <DialogItem
            type="text"
            Icon={PersonIcon}
            placeHolder="Ex. João Silveira"
            text="Nome"
          />

          <DialogItem
            type="text"
            Icon={EnvelopeClosedIcon}
            placeHolder="Ex. João Silveira"
            text="Nome"
          />

          <DialogItem
            type="password"
            Icon={LockClosedIcon}
            placeHolder="Ex. **********"
            text="Senha"
          />
        </div>

        <DialogFooter>
          <Button type="submit" className="bg-[#3A6FF8]">Criar Conta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
