import { Box, useTheme } from "@mui/material";
import Sidebar from "../modules/home/uiComponents/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../sharedComponents/Header";
import PageLoadingIndicator from "../sharedComponents/PageLoadingIndicator";
import { useState, useEffect } from "react";

const AppLayout = () => {
  const theme = useTheme();
  const [pageLoading, setPageLoading] = useState(true);
  // Use theme.sidebar.width for sidebar width (set in theme.ts, fallback to 260 if not set)
  const sidebarWidth = theme.sidebar.width || 260;
  const headerHeight = 64; // Adjust if your header is a different height
  
  useEffect(() => {
    // Simulate page loading time
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  return (
    <Box>
      {/* Page loading indicator */}
      <PageLoadingIndicator isLoading={pageLoading} />
      
      {/* Fixed Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1200,
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