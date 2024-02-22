import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { FiSearch } from "react-icons/fi";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";


export function StockInput() {
  return (
    <div className="flex items-center gap-4">
      <Dialog >
        <DialogTrigger>
          <FiSearch className="w-6 h-6 cursor-pointer"/>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buscar de ativos</DialogTitle>
            <DialogDescription className="flex content-start">
              Digite o ticker do ativo que deseja buscar.
            </DialogDescription>
            <Input className="mt-12 p-2 w-full" placeholder="Digite o ticker" onKeyUp={(e) => console.log((e.target as HTMLInputElement).value)}/>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
} 