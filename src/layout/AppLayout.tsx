import { Box, useTheme } from "@mui/material";
import Sidebar from "../modules/home/uiComponents/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../sharedComponents/Header";

const AppLayout = () => {
  const theme = useTheme();
  // Use theme.sidebar.width for sidebar width (set in theme.ts, fallback to 260 if not set)
  const sidebarWidth = theme.sidebar.width || 260;
  const headerHeight = 64; // Adjust if your header is a different height
  return (
    <Box>
      {/* Fixed Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1200,
          overflow: 'auto',
        }}
      >
        <Sidebar />
      </Box>
      {/* Fixed Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: sidebarWidth,
          right: 0,
          zIndex: 1100,
          backgroundColor: '#f8fafc',
          height: `${headerHeight}px`,
        }}
      >
        <Header />
      </Box>
      {/* Main Content Area */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: sidebarWidth,
          width: `calc(100vw - ${sidebarWidth}px)`,
          marginTop: `${headerHeight}px`,
          // background: 'yellow',
          // height: 300,
          zIndex: 1,
        }}
      >
        {/* MAIN CONTENT TEST */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout; 