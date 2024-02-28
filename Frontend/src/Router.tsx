/* eslint-disable react-refresh/only-export-components */
import {
  createBrowserRouter,
  Link,
} from "react-router-dom";

import { App } from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (<App />),
  }
]);

export { router }
