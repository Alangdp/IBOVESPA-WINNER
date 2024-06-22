import { App } from "../App";
import Home from "../components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "../components/Nav";
import Market from "../components/Martket";
import Private from "./private";

const DefaultToast = () => (
  <ToastContainer
    limit={4}
    stacked={true}
    position="bottom-right"
    pauseOnHover={false}
    pauseOnFocusLoss={false}
  />
);

const publicRoutes = [
  {
    path: "/",
    element: (
      <>
        <DefaultToast/>
        <Home />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Private>
        <>
          <DefaultToast />
          <App />
        </>
      </Private>
    ),
  },
  {
    path: "/market/brasil/:stockTicker",
    element: (
      <>
        <DefaultToast />
        <div className="h-screen bg-[#1E1E1E] text-white flex flex-col items-center overflow-scroll no-scrollbar">
          <NavBar />
          <Market marketName="Brasil" />
        </div>
      </>
    ),
  },
  {
    path: "*",
    element: <h1>EITA QUE DEU MERDA</h1>,
  },
];

export { publicRoutes };
