import { Link, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";

function App() {
  return (
    <div>
      <aside>
        <Stack gap={2} alignItems={"flex-start"}>
          <Link to="messages">Message sending</Link>
          <Link to="message-log">Communication Log</Link>
          <Link to="triggerables">Triggerables</Link>
          <Link to="scheduled-tasks">Scheduled Tasks</Link>
          <Link to="jwt-tokens">JWT tokens</Link>
        </Stack>
      </aside>
      <Outlet />
    </div>
  );
}

export default App;
