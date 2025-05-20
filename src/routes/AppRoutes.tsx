import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../modules/dashbaord/Dashboard";
import Contacts from "../modules/contacts/features/Contacts";
import ContactDetail from "../modules/contacts/features/ContactDetail";
import Leads from "../modules/leads/features/Leads";
import LeadDetail from "../modules/leads/features/LeadDetail";
import ForgotPassword from "../modules/auth/features/ForgotPassword";
import ResetPassword from "../modules/auth/features/ResetPassword";
import Unauthorized from "../modules/auth/features/Unauthorized";
import ProtectedRoute from "../modules/auth/uiComponents/ProtectedRoute";
import Login from "../modules/auth/features/Login";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="leads/:id" element={<LeadDetail />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts/:id" element={<ContactDetail />} />
          <Route path="deals" element={<div>Deals Page</div>} />
          <Route path="tasks" element={<div>Tasks Page</div>} />
          <Route path="emails" element={<div>Emails Page</div>} />
          <Route path="documents" element={<div>Documents Page</div>} />
          <Route path="conversations" element={<div>Conversations Page</div>} />
          <Route path="search" element={<div>Search Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
