import { cn } from "@/lib/utils";

interface buttonContent {
  text: string;
  active: boolean;
  className?: string
}

export function ButtonContent({ text, active, className}: buttonContent) {
  const activeClass = active ? "text-white " : "text-[#9E9E9E] ";
  return (
    <div className={cn(activeClass, className)}>{text}</div>
  );
}