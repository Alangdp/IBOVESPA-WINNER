import { ElementType } from "react";

interface ButtonIconProps {
  icon: ElementType;   
  active: boolean;  
} 
export function ButtonIcon({ icon: Icon, active }: ButtonIconProps) {
  return (
    <div className={active ? "text-white" : ""}>
      <Icon />
    </div>
  );
}