import { MagnifyingGlassIcon, BellIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { SideBar } from "./SideBar";


export function App() {

  return (
    <div className="contentflex">
      <SideBar />
      {/* Header */}
      <main className="w-full">
        <nav className="Header flex items-center justify-around p-2 mt-2">
          <h2 className="font-semibold text-[32px] text-white">Dashboard</h2>
          <div className="search p-2 bg-df text-[#9E9E9E] rounded-df w-1/4 flex items-center justify-between">
            <input type="text" className="bg-df outline-none w-fit h-full" placeholder="Buscar"/>
            <div className="mr-1"><MagnifyingGlassIcon  className="w-6 h-6"/> </div>
          </div>

          <div className="notify-user flex justify-between items-center gap-12">
            <div className="notification p-2 rounded-df bg-df ">
              <BellIcon className="w-6 h-6 text-white" />
            </div>
            <div className="user flex p-2 items-center justify-around">
              <div className="user-photo bg-[#9E9E9E] p-5 rounded-df"></div>
              <div className="user-name text-white ml-2 text-sm flex gap-2 items-center">
                <p>User</p>
                <ArrowDownIcon className="w-4 h-4"/>
              </div>              
            </div>
          </div>
        </nav>    
      </main>
    </div>
  );
}
