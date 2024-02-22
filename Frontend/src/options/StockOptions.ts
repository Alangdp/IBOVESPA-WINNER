import { Options } from "@/types/Options.type";

export const stockOptions: Options[]= [
  {
    value: "info",
    label: "Tudo sobre ações",
    function: () => console.log("Tudo sobre ações") 
  },
  {
    value: "search",
    label: "Busca avançada",
    function: () => console.log("Busca avançada")
  },
  {
    value: "mdi",
    label: "MDI",
    function: () => console.log("MDI")
  }
]
