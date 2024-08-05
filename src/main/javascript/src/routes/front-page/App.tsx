import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

import "./App.css";

function App() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Stack className="navLinks" gap={2}>
        <Typography variant="h3">Evolver basics admin UI</Typography>
        <Link to="messages">
          <Typography variant="h4">Message sending</Typography>
        </Link>
        <Link to="message-log">
          <Typography variant="h4">Communication Log</Typography>
        </Link>
        <Link to="triggerables">
          <Typography variant="h4">Triggerables</Typography>
        </Link>
        <Link to="scheduled-tasks">
          <Typography variant="h4">Scheduled Tasks</Typography>
        </Link>
        <Link to="jwt-tokens">
          <Typography variant="h4">JWT tokens</Typography>
        </Link>
      </Stack>
    </Box>
  );
}

export default App;
