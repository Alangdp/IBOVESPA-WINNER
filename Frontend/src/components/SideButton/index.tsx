import { ElementType } from "react";
import { Button } from "../Button";
import { useSelected } from "../SideBar/SideContext";

interface SideButtonProps {
  icon: ElementType;
  text: string;
  active: boolean;
  onClick?: () => void;
  activable?: boolean;
}

export function SideButton({
  icon,
  text,
  active,
  onClick,
  activable,
}: SideButtonProps) {
  const { selected, setSelected } = useSelected();

  const handleClick = () => {
    if (onClick) onClick();
    setSelected(text);
  };

  if (activable !== false) active = selected === text ? true : false;

  return (
    <Button.Root active={active} onClick={handleClick}>
      <Button.Icon icon={icon} active={active} />
      <Button.Content text={text} active={active} />
    </Button.Root>
  );
}
