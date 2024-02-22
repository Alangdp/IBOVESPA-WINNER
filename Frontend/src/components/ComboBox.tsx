import { cn } from "@/lib/utils"
import { CheckIcon, ArrowDownIcon } from "@radix-ui/react-icons"
import React from "react"
import { Button } from "./ui/button"
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "./ui/command"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"

type optionFunction = () => void  
type Options = {
  value: string
  label: string
  function: optionFunction
}

type ComboboxProps = {
  options: Options[]
  defaultText: string
} 

export function ComboBox({ options, defaultText }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="gap-2 bg-transparent"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : defaultText}
          <ArrowDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command className="w-full"> 
          <CommandEmpty>Opção não encontrada</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  option.function()
                  setOpen(false)
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}