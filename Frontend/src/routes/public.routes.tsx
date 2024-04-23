import { App } from "../App";
import Home from "../components/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "../components/Nav";
import Market from "../components/Martket";
import Private from "./private";

const publicRoutes = [
  {
    path: "/",
    element: (
      <>
        <ToastContainer
          limit={3}
          stacked={true}
          position="bottom-right"
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <Home />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Private>
        <>
          <ToastContainer
            limit={3}
            stacked={true}
            position="bottom-right"
            pauseOnHover={false}
            pauseOnFocusLoss={false}
          />
          <App />
        </>
      </Private>
    ),
  },
  {
    path: "/market/brasil/:stockTicker",
    element: (
      <>
        <ToastContainer
          limit={3}
          stacked={true}
          position="bottom-right"
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />

        <NavBar />
        <div className="screen w-screen bg-zinc-800 text-white flex flex-col items-center">
          <Market marketName="Brasil"/>
        </div>
      </>
    )
  },
  {
    path: "*",
    element: <h1>EITA QUE DEU MERDA</h1>,
  },
];

export { publicRoutes } ;
