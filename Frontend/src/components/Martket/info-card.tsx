interface InfoCardProps {
  infoName: string;
  infoValue: string;
  brl?: boolean;
}

export function InfoCard({infoName, infoValue, brl}: InfoCardProps) {
  return (
    <a href="" className="group">
      <div className="grid grid-cols grid-cols-4 group-hover:text-zinc-600 duration-300">
        <div className="flex flex-col col-span-2 ">
          <div className="semi-title font-semibold text-[#F8F0FB] group-hover:text-zinc-600">
            {infoName}
          </div>
          <div className="flex items-e gap-1 text-sm col-span-1">
            {infoValue} {brl ? <div className="text-[12px] font-bold">BRL</div> : ""}
          </div>
        </div>
        <div className="w-6 h-6 text-[#F8F0FB] bg-zinc-500 rounded-full flex items-center justify-center col-span-2 group-hover:bg-zinc-600 duration-300">?</div>
      </div>
    </a>
  );
}
