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
    <div className="content bg-zinc-900 flex">
      <SideBar />
      <Header title="DashBoard"/>
    </div>
      
  );
}
