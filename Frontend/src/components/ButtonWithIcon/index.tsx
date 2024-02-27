import { ElementType } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonWithIconProps  {
  text: string
  active: boolean
  icon: ElementType
}

export default function ButtonIcon({active, text, icon: Icon}: ButtonWithIconProps) {
  return(
    <button className={twMerge("p-2 w-[200px] text-[#9E9E9E] rounded-[10px] flex items-center justify-start gap-2", active ? "bg-[#3A6FF8] text-white" : "")}>
      <div className="icon">
        <Icon />
      </div>
      {text}
    </button>
  )
}