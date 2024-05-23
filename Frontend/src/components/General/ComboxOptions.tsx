import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

interface ComboOptionsProps {
  options: string[];
  title: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void; // Alterei o tipo para `string`
}

export function ComboOptions({
  options,
  title,
  placeholder,
  className,
  defaultValue,
  onChange,
}: ComboOptionsProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue || "");

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    setOpen(false);
    if (onChange) onChange(selectedValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[150px] justify-between text-black h-10", `${className || ""}`)}
        >
          {value ? options.find((option) => option === value.toUpperCase()) : placeholder || ""}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] h-40 p-0">
        <Command>
          <CommandInput placeholder={title} />
          <CommandEmpty>No Data Found</CommandEmpty>
          <CommandGroup className="overflow-y-scroll">
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={(currentValue) => handleSelect(currentValue)}
              >
                <CheckIcon
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
