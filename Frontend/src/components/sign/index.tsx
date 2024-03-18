import { useState } from "react";
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
import validator from "validator"
import { toast } from "sonner"

interface RegisterDialogProps {
  children: React.ReactNode;
}

interface DialogItemProps {
  Icon?: React.ComponentType<IconProps>;
  text?: string;
  placeHolder?: string;
  type: "text" | "password";
  value?: string;
  onChange?: (value: string) => void;
}

function DialogItem({ Icon, placeHolder, text, type, value, onChange }: DialogItemProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="field flex items-center gap-2 w-full">
      {Icon && <Icon width={30} height={30} />}
      <div className="input flex flex-col items-start gap-1 w-fit">
        <label htmlFor={text} className="text-sm">
          {text}
        </label>
        <Input
          className="border-none bg-transparent outline-none"
          id={text}
          placeholder={placeHolder}
          type={type}
          value={value}
          onChange={handleChange}
        />
        <div className="w-full h-[1px] bg-zinc-100/80 rounded-df"></div>
      </div>
    </div>
  );
}

interface RegisterData {
  name: string;
  password: string;
  email: string;
}

export function RegisterDialog({ children }: RegisterDialogProps) {
  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    name: "",
    password: "",
  });

  const handleInputChange = (field: keyof RegisterData) => (value: string) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateForms = () =>{
    let valid = true
    if(!validator.isEmail(registerData.email)) {{
      valid = false
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      })
    }}
  }

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
            value={registerData.name}
            onChange={handleInputChange("name")}
          />

          <DialogItem
            type="text"
            Icon={EnvelopeClosedIcon}
            placeHolder="Ex. Email@email.com"
            text="Email"
            value={registerData.email}
            onChange={handleInputChange("email")}
          />

          <DialogItem
            type="password"
            Icon={LockClosedIcon}
            placeHolder="Ex. **********"
            text="Senha"
            value={registerData.password}
            onChange={handleInputChange("password")}
          />
        </div>

        <DialogFooter>
          <Button type="submit" className="bg-[#3A6FF8]" onClick={() => validateForms()}>
            Criar Conta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
