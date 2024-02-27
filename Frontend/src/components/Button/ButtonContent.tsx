interface buttonContent {
  text: string;
  active: boolean;
}

export function ButtonContent({ text, active }: buttonContent) {
  const activeClass = active ? "text-white " : "text-[#9E9E9E] ";
  return (
    <div className={`${activeClass} font-semibold`}>{text}</div>
  );
}