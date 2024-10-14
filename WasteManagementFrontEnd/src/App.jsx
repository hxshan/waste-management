import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientRegister from "./pages/client/ClientRegister";
import DriverRegistration from "./pages/admin/DriverRegistration";
import Login from "./pages/shared/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HelperRegistration from "./pages/admin/HelperRegistration";
import SpecialRequests from "./pages/admin/SpecialRequests";
import NavigationBar from "./pages/shared/NavigationBar";
import Topbar from "./pages/shared/Topbar";
import SpecialRequestForm from "./pages/client/SpecialRequestForm";
import ClientHome from "./pages/client/ClientHome";
import AdminSpecialRequestForm from "./pages/admin/AdminSpecialRequestForm";
import SpecialRequestClient from "./components/Client/SpecialRequestClient";
import BinRegistration from "./pages/admin/BinRegisterForm";
import BinList from "./pages/admin/BinList";
import BinRequestForm from "./pages/client/BinRequestForm.jsx";
import BinRequestList from "./pages/admin/BinRequestlist.jsx";
import ClientAllSpecialRequests from "./pages/client/ClientAllSpecialRequests.jsx";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      {/*{!isLoginPage && <Topbar />} */}

      <div className="flex flex-1 overflow-hidden">
        {/*{!isLoginPage && <NavigationBar />}*/}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<ClientHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client-register" element={<ClientRegister />} />
            <Route
              path="/client-special-requst"
              element={<SpecialRequestClient />}
            />
            <Route
              path="/client-new-special-requst"
              element={<SpecialRequestForm />}
            />
            <Route
              path="/all-special-requests-client"
              element={<ClientAllSpecialRequests />}
            />

            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/bin-registraion" element={<BinRegistration />} />
            <Route path="/binlist" element={<BinList />} />
            <Route path="/bin-requestform" element={<BinRequestForm />} />
            <Route path="/bin-requestlist" element={<BinRequestList />} />

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
              element={<AdminSpecialRequestForm />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
