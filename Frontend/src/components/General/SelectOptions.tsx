import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { UseFormRegister } from "react-hook-form";

interface SelectProps {
  options: string[];
  title: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

export function SelectOptions({ options, title, placeholder, className, defaultValue}: SelectProps) {
  return (
    <Select name="types">
      <SelectTrigger className={cn("w-[180px]", className)}>
        <SelectValue placeholder={placeholder} defaultValue={defaultValue}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
