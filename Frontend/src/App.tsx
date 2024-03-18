import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";
import { SelectedProvider } from "./components/SideBar/SideContext";
import { DashBoard } from "./components/Dashboard";
import { NavBar } from "./components/Dashboard/Navbar";
import { Toaster } from "./components/ui/sonner"
import { toast } from "sonner";

export function App() {
  toast("Teste", {
    
  })

  return (
    <SelectedProvider>
      <div className="content bg-[#1e1e1e] flex h-screen overflow-hidden w-screen flex-col lg:flex-row">
        <SideBar className="hidden lg:grid"/>
        <NavBar className="lg:hidden gap-4"/>
        <div className="container w-full h-full p-4">
          <Header title="Dashboard" />
          <DashBoard />
        </div>
        
      </div>
      <Toaster />
    </SelectedProvider>
  );
}
