import { Box } from "@mui/material";
import Sidebar from "../modules/home/uiComponents/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../sharedComponents/Header";
const AppLayout = () => (
  <Box display="flex" minHeight="100vh">
    <Sidebar />
    <Box flex={1} bgcolor="#f8fafc">
      <Header />
      <Box p={3}>
        <Outlet />
      </Box>
    </Box>
  </Box>
);

export default AppLayout; 