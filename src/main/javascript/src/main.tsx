import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./routes/front-page/FrontPage.tsx";
import MessageLogRoute from "./routes/message-log/MessageLogRoute.tsx";
import { loader as logListLoader } from "./routes/message-log/loader.ts";

import SingleMessageRoute from "./routes/message-log/SingleLogMessageRoute.tsx";
import TriggerablesRoute from "./routes/triggerables/TriggerablesRoute.tsx";
import { loader as triggerablesLoader } from "./routes/triggerables/loader.ts";

import ScheduledTasksRoute from "./routes/scheduled-tasks/ScheduledTasksRoute.tsx";
import ScheduledTaskFormRoute from "./routes/scheduled-tasks/ScheduledTaskFormRoute.tsx";
import {
  scheduledTasksLoader as scheduledTasksLoader,
  singleTaskLoader,
} from "./routes/scheduled-tasks/loader.ts";

import JwtTokensRoute from "./routes/jwt-tokens/JwtTokensRoute.tsx";
import { loader as jwtTokensLoader } from "./routes/jwt-tokens/loader.ts";

import MessageSendingRoute from "./routes/message-sending/MessageSendingRoute.tsx";
import { messageListLoader } from "./routes/message-sending/loader.ts";

import { configureBackendClient } from "@evolver-fi/evolver-basics";
import Root from "./Root.tsx";

configureBackendClient(window.origin, undefined, true);

// TODO add a navigation root route
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/messages",
          element: <MessageSendingRoute />,
          loader: messageListLoader,
        },
        {
          path: "/messages/:id",
          element: <SingleMessageRoute />,
          loader: messageListLoader,
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
        {
          path: "/scheduled-tasks",
          element: <ScheduledTasksRoute />,
          loader: scheduledTasksLoader,
        },
        {
          path: "/scheduled-tasks/:id",
          element: <ScheduledTaskFormRoute />,
          loader: singleTaskLoader,
        },
        {
          path: "/jwt-tokens",
          element: <JwtTokensRoute />,
          loader: jwtTokensLoader,
        },
      ],
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
