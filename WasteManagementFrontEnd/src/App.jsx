import { useState } from 'react'
import { Route, Routes} from "react-router-dom";
import ClientDashboard from './pages/client/ClientDashboard';
import ClientRegister from './pages/client/ClientRegister';
import DriverRegistration from './pages/admin/DriverRegistration';


function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client-register" element={<ClientRegister />} />

          <Route path="/admin-driver-register" element={<DriverRegistration />} />
        </Routes>
      </div>
    </>
  )
}

export default App
