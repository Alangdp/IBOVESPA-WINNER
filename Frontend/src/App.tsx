import { SelectedProvider } from "./components/SideBar/SideContext";
import MainDashBoard from "./components/Main";

export function App() {
  return (
      <SelectedProvider>
        <MainDashBoard />
      </SelectedProvider>
  );
}
