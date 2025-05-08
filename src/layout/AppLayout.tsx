import { Box, useTheme } from "@mui/material";
import Sidebar from "../modules/home/uiComponents/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../sharedComponents/Header";

const AppLayout = () => {
  const theme = useTheme();
  // Use theme.sidebar.width for sidebar width (set in theme.ts, fallback to 260 if not set)
  const sidebarWidth = theme.sidebar.width || 260;
  return (
    <Box display="flex" minHeight="100vh" position="relative">
      {/* Fixed Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1200,
          width: sidebarWidth,
        }}
      >
        <Sidebar />
      </Box>
      {/* Main Content Area */}
      <Box
        flex={1}
        bgcolor="#f8fafc"
        sx={{
          marginLeft: sidebarWidth,
          width: `calc(100% - ${sidebarWidth}px)`,
          minHeight: '100vh',
        }}
      >
        {/* Fixed Header */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            left: sidebarWidth,
            zIndex: 1100,
            backgroundColor: '#f8fafc',
          }}
        >
          <Header />
        </Box>
        {/* Scrollable Content */}
        <Box
          sx={{
            marginTop: '64px', // Adjust this value based on your header height
            p: 3,
            minHeight: 'calc(100vh - 64px)', // Subtract header height
            overflow: 'auto',
          }}
        >
          <Box sx={{ background: 'yellow', height: 100, marginBottom: 16 }}>TEST BOX</Box>
          {/* <Outlet /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout; 