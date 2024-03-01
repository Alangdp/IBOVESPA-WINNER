/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Link } from "react-router-dom";

import { App } from "./App";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home  />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
  {
    path: "*",
    element: <h1>EITA QUE DEU MERDA</h1>,
  },
]);

export { router };
