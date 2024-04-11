import { ElementType } from "react";
import { Button } from "../Button";
import { useSelected } from "../SideBar/SideContext";
import { cn } from "@/lib/utils";

interface SideButtonProps {
  icon?: ElementType;
  text: string;
  active: boolean;
  onClick?: () => void;
  activable?: boolean;
  className?:string
}

export function SideButton({
  icon,
  text,
  active,
  onClick,
  activable,
  className
}: SideButtonProps) {
  const { selected, setSelected } = useSelected();

  const handleClick = () => {
    if (onClick) onClick();
    setSelected(text);
  };

  if (activable !== false) active = selected === text ? true : false;

  return (
    <Button.Root active={active} onClick={handleClick} className={cn("p-2 w-[200px] text-[#9E9E9E] rounded-[10px] flex items-center justify-start gap-2 transition-all duration-700", className)}>
      {icon ? <Button.Icon icon={icon} active={active} /> : null}
      <Button.Content text={selected + 123} active={active} />
    </Button.Root>
  );
}
