
import { useState} from "react";
import { Route, Routes, useLocation  } from "react-router-dom";
import ClientRequest from "./pages/client/ClientRequest";
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
import ClientDashMain from "./pages/client/ClientDashMain.jsx";
import ClientProfile from "./pages/client/ClientProfile";
import ClientBill from "./pages/client/ClientBill";
import ClientShedule from "./pages/client/ClientShedule";

import SpecialRequestClient from "./components/Client/SpecialRequestClient";
import BinRegistration from "./pages/admin/BinRegisterForm";
import BinList from "./pages/admin/BinList";
import BinRequestForm from "./pages/client/BinRequestForm.jsx";
import BinRequestList from "./pages/admin/BinRequestlist.jsx";
import EditBin from "./pages/admin/updatebindetails.jsx";
import ClientAllSpecialRequests from "./pages/client/ClientAllSpecialRequests.jsx";
import SpecialRequestDetailAdmin from "./pages/admin/SpecialRequestDetailAdmin.jsx";
import CardPayment from "./pages/client/CardPayment.jsx";
import DriverDashboard from "./pages/driver/DriverDashboard.jsx";


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

            {/* <Route path="/client" element={<ClientDashboard />} /> */}
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
              <Route path="/client-register" element={<ClientRegister />} />
              <Route path="/client-special-requst" element= {<SpecialRequestClient /> }/>
              <Route path="/client-new-special-requst" element= {<SpecialRequestForm/> }/>
              <Route path="/client" element={<ClientDashMain/>}/>
              <Route path="/clientReq" element={<ClientRequest/>}/>
              <Route path="/profile" element={<ClientProfile/>}/>
              <Route path="/bills" element={<ClientBill/>}/>
              <Route path="/payment" element={<CardPayment/>}/>
              <Route path="/shedule" element={<ClientShedule/>}/>


              <Route path="/driver" element={<DriverDashboard />} />
            
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/bin-registraion" element={<BinRegistration />} />
              <Route path="/binlist" element={<BinList />} />
              <Route path="/edit-bin/:id" element={<EditBin />} />
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


<Route
              path="/special-request-page/:id"
              element={<SpecialRequestDetailAdmin />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
