import { SideBar } from "./components/SideBar";
import { Header } from "./components/Header";
import { SelectedProvider } from "./components/SideBar/SideContext";
import { DashBoard } from "./components/Dashboard";

export function App() {

  return (
    <SelectedProvider>
      <div className="content bg-[#1e1e1e] flex h-screen overflow-hidden w-screen">
        <SideBar />
        <div className="container w-full h-full p-4 mx-12">
          <Header title="Dashboard" />
          <DashBoard />
        </div>
      </div>
    </SelectedProvider>
  );
}
