import { Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../modules/dashbaord/Dashboard";
import LeadsOverview from "../modules/dashbaord/uiComponents/LeadsOverview";
import Contacts from "../modules/contacts/features/Contacts";
import ContactDetail from "../modules/contacts/features/ContactDetail";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<LeadsOverview/>} />
        <Route path="contacts" element={<Contacts/>} />
        <Route path="contacts/:id" element={<ContactDetail/>} />
        <Route path="deals" element={<div>Deals Page</div>} />
        <Route path="tasks" element={<div>Tasks Page</div>} />
        <Route path="emails" element={<div>Emails Page</div>} />
        <Route path="documents" element={<div>Documents Page</div>} />
        <Route path="conversations" element={<div>Conversations Page</div>} />
        <Route path="search" element={<div>Search Page</div>} />
        <Route path="settings" element={<div>Settings Page</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
