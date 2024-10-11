import { useState } from 'react'
import { Route, Routes} from "react-router-dom";
import ClientDashboard from './pages/client/ClientDashboard';
import ClientRegister from './pages/client/ClientRegister';
import DriverRegistration from './pages/admin/DriverRegistration';
import Login from './pages/shared/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import HelperRegistration from './pages/admin/HelperRegistration';
import SpecialRequests from './pages/admin/SpecialRequests';
import NavigationBar from './pages/shared/NavigationBar';


function App() {

  return (
    <>
      <div className='flex w-full bg-slate-100 dark:bg-[#282828] min-h-screen'>
        <NavigationBar />

        <div className='w-full'>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client-register" element={<ClientRegister />} />


          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-driver-register" element={<DriverRegistration />} />
          <Route path="/admin-helper-register" element={<HelperRegistration />} />
          <Route path="/admin-special-request" element={<SpecialRequests />} />
        </Routes>

        </div>
      </div>
    </>
  )
}

export default App
