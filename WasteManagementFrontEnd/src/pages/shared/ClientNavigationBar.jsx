import React from "react";
import { useNavigate } from "react-router-dom";

const ClientNavigationBar = () => {

  const navigator = useNavigate()

  return (
    <nav className="bg-blue-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div>
            <h1 className="text-2xl font-bold text-green-600">EcoTrack</h1>
          </div>
          <div className="space-x-10">
            <button className="text-gray-600 hover:text-gray-800">
              Dashboard
            </button>

            <button className="text-gray-600 hover:text-gray-800">
              Scheduled Collections
            </button>

            <button className="text-gray-600 hover:text-gray-800">
              Request Special Collection
            </button>

            <button className="text-gray-600 hover:text-gray-800">
              Billing
            </button>
          </div>
        </div>
        <div className="space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigator('/')}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavigationBar;
