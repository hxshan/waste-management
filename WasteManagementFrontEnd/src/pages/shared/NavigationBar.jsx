import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top bar 
      <div className="w-full h-[60px] bg-white flex justify-between items-baseline px-5 pb-3">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-600">EcoTrack</h1>
        </div>
      
        <div className="text-sm text-gray-600">User Name</div>
      </div>
      */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-green-600">EcoTrack</h1>
          </div>
          <nav className="mt-4">
            <button
              className={`w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold hover:bg-green-100 ${
                location.pathname === "/admin"
                  ? "bg-green-500 font-bold text-white"
                  : ""
              }`}
              onClick={() => navigate("/admin")}
            >
              Dashboard
            </button>

            <button
              className={`w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold hover:bg-green-100 ${
                location.pathname === "/admin-special-request"
                  ? "bg-green-500 font-bold text-white"
                  : ""
              }`}
              onClick={() => navigate("/admin-special-request")}
            >
              Special Requests
            </button>

            <button
              className={`w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold hover:bg-green-100 ${
                location.pathname === ""
                  ? "bg-green-500 font-bold text-white"
                  : ""
              }`}
              onClick={() => navigate("")}
            >
              Requests
            </button>

            <button
              className={`w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold hover:bg-green-100 ${
                location.pathname === ""
                  ? "bg-green-500 font-bold text-white"
                  : ""
              }`}
              onClick={() => navigate("")}
            >
              Schedule
            </button>

            <button
              className={`w-full py-2 px-4 text-start hover:font-bold  focus:outline-none focus:font-bold hover:bg-green-100 ${
                location.pathname === ""
                  ? "bg-green-500 font-bold text-white"
                  : ""
              }`}
              onClick={() => navigate("")}
            >
              Employees
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
