import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";
import MessageLogRoute from "./routes/message-log/MessageLogRoute.tsx";
import { loader as logListLoader } from "./routes/message-log/loader.ts";

import SingleMessageRoute from "./routes/message-log/SingleMessageRoute.tsx";
import TriggerablesRoute from "./routes/triggerables/TriggerablesRoute.tsx";
import { loader as triggerablesLoader } from "./routes/triggerables/loader.ts";
import { configureBackendClient } from "@evolver-fi/evolver-basics";

configureBackendClient(undefined, undefined, true);

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [],
    },
    {
      path: "/message-log",
      element: <MessageLogRoute />,
      loader: logListLoader,
    },
    {
      path: "/message-log/:id",
      element: <SingleMessageRoute />,
      loader: logListLoader,
    },
    {
      path: "/triggerables",
      element: <TriggerablesRoute />,
      loader: triggerablesLoader,
    },
  ],
  {
    basename: "/admin-ui",
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
