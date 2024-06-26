import { App } from "../App";
import Home from "../components/Home";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "../components/Nav";
import Private from "./private";
import MotionWrapper from "@/components/Router/MotionWrapper";
import Market from "@/components/Martket";

const routes = [
  {
    path: "/",
    element: (
      <MotionWrapper>
        <Home />
      </MotionWrapper>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <MotionWrapper>
        <Private>
          <App />
        </Private>
      </MotionWrapper>
    ),
  },
  {
    path: "/market/brasil/:stockTicker",
    element: (
      <MotionWrapper>
        <div className="h-screen bg-[#1E1E1E] text-white flex flex-col items-center overflow-scroll no-scrollbar">
          <NavBar />
          <Market marketName="Brasil" />
        </div>
      </MotionWrapper>
    ),
  },
  {
    path: "/market/brasil/",
    element: (
      <MotionWrapper>
        <div className="h-screen bg-[#1E1E1E] text-white flex flex-col items-center overflow-scroll no-scrollbar">
          <NavBar />
          <Market marketName="Brasil" />
        </div>
      </MotionWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <MotionWrapper>
        <h1>EITA QUE DEU MERDA</h1>
      </MotionWrapper>
    ),
  },
];

export { routes };
