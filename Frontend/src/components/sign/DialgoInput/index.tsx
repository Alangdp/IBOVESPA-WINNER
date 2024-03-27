import { Input } from "@/components/ui/input";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

interface DialogItemProps {
  Icon?: React.ComponentType<IconProps>;
  text?: string;
  placeHolder?: string;
  type: "text" | "password";
  value?: string;
  onChange?: (value: string) => void;
  register: any
}

export function DialogItem({ Icon, placeHolder, text, type, value, onChange }: DialogItemProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="field flex items-center gap-2 w-full justify-center">
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