import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonRootProps {
  active: boolean;
  children: ReactNode;
  onClick?: () => void;
}

export default function ButtonRoot({
  active,
  children,
  onClick,
}: ButtonRootProps) {
  return (
    <button
      className={twMerge(
        "p-2 w-[200px] text-[#9E9E9E] rounded-[10px] flex items-center justify-start gap-2 transition-all duration-700 ",
        active ? "bg-[#3A6FF8] text-white" : ""
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
