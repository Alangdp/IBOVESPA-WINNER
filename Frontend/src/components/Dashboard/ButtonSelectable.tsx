import { Button } from "../Button";

interface buttonSelectableProps {
  selectedOption: string;
  setter: (text:string) => void
  text: string
}

export function ButtonSelectable({selectedOption, text, setter}: buttonSelectableProps) {


  return (
    <Button.Root 
      onClick={() => setter(text)}
      active={selectedOption === text}
      className="px-4  hover:bg-[#454b58] border border-[#31353F] rounded-2xl transition-all duration-300"
    >
      <Button.Content text={text} active={selectedOption === text} />
    </Button.Root>
  );
}
