import {
  MagnifyingGlassIcon,
  BellIcon,
  ArrowDownIcon,
} from "@radix-ui/react-icons";
import { SideBar } from "./components/SideBar";
import { useState } from "react";

export function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const mockData: string[] = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term: string = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filtrar os resultados com base no termo de pesquisa
    const filteredResults: string[] = mockData.filter((item) =>
      item.toLowerCase().includes(term)
    );
    setSearchResults(filteredResults);
  };

  // const handleItemClick = (item: string) => {
  //   setSearchTerm(item);
  //   setSearchResults([]);
  // };

  return (
    <div className="content bg-zinc-900 flex">
      <SideBar />
      {/* Header */}
      <main className="w-full">
        <nav className="Header flex items-center justify-around p-2 mt-2">
          <h2 className="font-semibold text-[32px] text-white">Dashboard</h2>
          <div className="search p-2 bg-[#1B2028] text-[#9E9E9E] rounded-df w-1/4 flex items-center justify-between">
            <div className="mr-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite para buscar..."
                  value={searchTerm}
                  onChange={handleChange}
                  className=""
                />
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {}}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <MagnifyingGlassIcon className="w-6 h-6" />{" "}
            </div>
          </div>

          <div className="notify-user flex justify-between items-center gap-12">
            <div className="notification p-2 rounded-df bg-[#1B2028] ">
              <BellIcon className="w-6 h-6 text-white" />
            </div>
            <div className="user flex p-2 items-center justify-around">
              <div className="user-photo bg-[#9E9E9E] p-5 rounded-df"></div>
              <div className="user-name text-white ml-2 text-sm flex gap-2 items-center">
                <p>User</p>
                <ArrowDownIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </nav>
      </main>
    </div>
  );
}
