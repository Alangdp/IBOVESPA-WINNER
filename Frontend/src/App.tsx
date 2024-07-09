import { SelectedProvider } from "./components/SideBar/SideContext";
import MainDashBoard from "./components/MainDashboard";

export function App() {
  return (
    <SelectedProvider>
      <MainDashBoard />
    </SelectedProvider>
  );
}
