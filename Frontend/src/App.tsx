import {
  MagnifyingGlassIcon,
  BellIcon,
  ArrowDownIcon,
} from "@radix-ui/react-icons";
import { SideBar } from "./components/SideBar";
import { useState } from "react";
import { Header } from "./components/Header";

export function App() {
  return (
    <div className="content bg-[#1e1e1e] flex h-screen">
      <SideBar />
      <Header title="Dashboard"/>
    </div>
      
  );
}
