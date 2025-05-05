import { Dashboard } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>

      </Route>
    </Routes>
  );
};

export default AppRoutes;
