/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Link } from "react-router-dom";

import { App } from "./App";
import Home from "./components/Home";
import { TransactionTable } from "./components/Ranking";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
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
    ),
  },
  {
    path: "*",
    element: <h1>EITA QUE DEU MERDA</h1>,
  },
]);

export { router };
