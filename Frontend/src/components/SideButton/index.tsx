import { ElementType } from "react";
import { Button } from "../Button"
import { useSelected } from "../SideBar/SideContext";

interface SideButtonProps {
  icon: ElementType;
  text: string;
  active: boolean;
  onClick?: () => void;
}

export function SideButton({ icon, text, active }: SideButtonProps) {
  const { selected, setSelected } = useSelected();

  const handleClick = () => {
    setSelected(text);
  };

  active = selected === text ? true : false

  return (
    <Button.Root active={active} onClick={handleClick}>
      <Button.Icon icon={icon} active={active} />
      <Button.Content text={text} active={active} />
    </Button.Root>
  );
}