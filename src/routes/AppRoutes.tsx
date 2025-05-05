import { Dashboard } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../modules/home/uiComponents/Sidebar";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
