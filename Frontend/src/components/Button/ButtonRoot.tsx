import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonRootProps {
  active: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string
}

export default function ButtonRoot({
  active,
  children,
  onClick,
  className
}: ButtonRootProps) {
  return (
    <button
      className={cn(
        className,
        active ? "bg-[#3A6FF8] text-white" : ""
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
