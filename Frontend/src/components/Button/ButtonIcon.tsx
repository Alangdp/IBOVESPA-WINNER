import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface ButtonIconProps {
  icon: ElementType;   
  active: boolean;  
} 
export function ButtonIcon({ icon: Icon, active }: ButtonIconProps) {
  return (
    <div className={cn(active ? "text-white" : "", "")}>
      <Icon />
    </div>
  );
}