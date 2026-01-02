import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import { useState } from "react";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../constants";
import { useAuthStore } from "../../store/auth.store";

export function AppLayout() {
  const user = useAuthStore((s) => s.user);

  const [sidebarWantedOpen, setSidebarWantedOpen] = useState(false);

  const isOpenedSidebar = Boolean(user) && sidebarWantedOpen;

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header
        userIsLogged={!!user}
        onMenuClick={() => setSidebarWantedOpen((prev) => !prev)}
      />
      <Box sx={{ display: "flex" }}>
        <Sidebar
          isOpen={isOpenedSidebar}
          onClose={() => setSidebarWantedOpen(false)}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: "30px",
            ml: isOpenedSidebar ? 0 : `-${SIDEBAR_WIDTH}px`,
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
