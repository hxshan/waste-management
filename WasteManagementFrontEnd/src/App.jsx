import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientRegister from "./pages/client/ClientRegister";
import DriverRegistration from "./pages/admin/DriverRegistration";
import Login from "./pages/shared/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HelperRegistration from "./pages/admin/HelperRegistration";
import SpecialRequests from "./pages/admin/SpecialRequests";
import NavigationBar from "./pages/shared/NavigationBar";
import Topbar from "./pages/shared/Topbar";
import SpecialRequestForm from "./pages/admin/SpecialRequestForm";

function App() {
  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <NavigationBar />
        <main className="flex-1 overflow-y-auto p-4 pt-8">
        <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/client" element={<ClientDashboard />} />
              <Route path="/client-register" element={<ClientRegister />} />

              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/admin" element={<AdminDashboard />} />
              <Route
                path="/admin-driver-register"
                element={<DriverRegistration />}
              />
              <Route
                path="/admin-helper-register"
                element={<HelperRegistration />}
              />
              <Route
                path="/admin-special-request"
                element={<SpecialRequests />}
              />
              <Route
                path="/new-special-request"
                element={<SpecialRequestForm/>}
              />
            </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;