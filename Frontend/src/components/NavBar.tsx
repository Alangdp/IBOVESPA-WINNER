import { AiOutlineStock } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { ComboBox } from "./ComboBox";
import { stockOptions } from "@/options/StockOptions";
import { FiiOptions } from "@/options/FiiOptions";

export function NavBar() {

  return (
    <nav className="flex justify-around items-center bg-slate-600 bg-gradient-to-r from-blue-800 to-indigo-900 text-slate-50 text-lg h-10">
      <ul className="flex ml-4">
        <a href="" className="cursor-pointer">
          <AiOutlineStock className="w-8 h-8"/>
        </a>
      </ul>

      <ul className="flex items-center justify-center h-full w-1/2">
        <ul>
          <div className="flex items-center">
            <Dialog >
              <DialogTrigger>
                <FiSearch className="w-8 h-8 cursor-pointer"/>
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
        </ul>

        <ul className="flex justify-around w-1/3 ">
          <ComboBox options={stockOptions} defaultText="Ações" />
          <ComboBox options={FiiOptions} defaultText="FIIS" />
        </ul>
      </ul>

      
      <ul>  
        <div className="flex gap-4 mr-4">
          <a className="cursor-pointer ">Logar</a>
          <a className="cursor-pointer ">Cadastro</a>
        </div>
      </ul>  


    </nav>
  )
}