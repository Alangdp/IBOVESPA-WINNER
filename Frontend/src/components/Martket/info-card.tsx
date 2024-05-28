interface InfoCardProps {
  infoName: string;
  infoValue: string | number;
  brl?: boolean;
  message?: string;
}

export function InfoCard({ infoName, infoValue, brl, message }: InfoCardProps) {
  return (
    <div className="h-16 rounded p-2 bg-[#1E1E1E] brightness-125 shadow drop-shadow">
      <div className="duration-300 flex w-full  justify-between pr-4 itesm-center h-full gap-4">
        <div className="flex flex-col col-span-3 group">
          <div className="text-sm font-semibold text-[#F8F0FB] group-hover:opacity-60 w-full">
            {infoName}
          </div>
          <div className="flex items-e gap-1 text-sm col-span-1 group-hover:opacity-60">
            {infoValue}{" "}
            {brl ? <div className="text-[12px] font-bold">BRL</div> : ""}
          </div>
        </div>
        {message && (
          <div className="container relative w-fit p-0 m-0 group">
            <div className="w-6 h-6 text-[#F8F0FB] bg-zinc-500 rounded-full flex items-center justify-center col-span-2 group-hover:bg-zinc-600 duration-300 cursor-pointer">
              ?
            </div>
            <div className="transition-all duration-300 ease-in-out w-[350px] absolute -top-10 left-11 bg-[#F8F0FB] p-2 rounded-md border border-gray-300 hidden group-hover:block text-black divide-y divide-black">
              <h3 className="font medium text-lg pb-2">{infoName}</h3>
              <p className="text pt-2">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
