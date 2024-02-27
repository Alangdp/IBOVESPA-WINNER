import { MagnifyingGlassIcon, BellIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { SideBar } from "./components/SideBar";

export function App() {

  return (
    <div className="content bg-zinc-900 flex">
      <SideBar />
      {/* Header */}
      <main className="w-full">
        <nav className="Header flex items-center justify-around p-2 mt-2">
          <h2 className="font-semibold text-[32px] text-white">Dashboard</h2>
          <div className="search p-2 bg-[#1B2028] text-[#9E9E9E] rounded-df w-1/4 flex items-center justify-between">
            <input type="text" className="bg-[#1B2028] outline-none w-fit" placeholder="Buscar"/>
            <div className="mr-1"><MagnifyingGlassIcon  className="w-6 h-6"/> </div>
          </div>

          <div className="notify-user flex justify-between items-center gap-12">
            <div className="notification p-2 rounded-df bg-[#1B2028] ">
              <BellIcon className="w-6 h-6 text-white" />
            </div>
            <div className="user flex p-2 items-center justify-around">
              <div className="user-photo bg-[#9E9E9E] p-5 rounded-df"></div>
              <div className="user-name text-white ml-2 text-sm flex gap-2 items-center">
                <p>João</p>
                <ArrowDownIcon className="w-4 h-4"/>
              </div>              
            </div>
          </div>
        </nav>    
      </main>
    </div>
  );
}
