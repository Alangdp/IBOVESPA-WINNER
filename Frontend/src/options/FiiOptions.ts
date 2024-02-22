import { Options } from "@/types/Options.type";

export const FiiOptions: Options[]= [
  {
    value: "info",
    label: "Tudo sobre FIIs",
    function: () => console.log("Tudo sobre FIIs") 
  },
  {
    value: "search",
    label: "Busca avançada",
    function: () => console.log("Busca avançada")
  },
]
