import React, { useState } from 'react'
import DriverDashMain from './DriverDashMain'
import DriverCollections from './DriverCollections';

const DriverDashboard = () => {

  const [current,setCurrent]= useState(0);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 text-2xl font-bold text-green-600">EcoTrack</div>
        <nav className="mt-6">
          <a
            onClick={() => setCurrent(0)}
            href="#"
            className={current==0?`block py-2 px-4 bg-green-500 text-white`:"block py-2 px-4 text-gray-600 hover:bg-gray-200"}
          >
            Dashboard
          </a>
          <a
            onClick={() => setCurrent(1)}
            href="#"
            className={current==1?`block py-2 px-4 bg-green-500 text-white`:"block py-2 px-4 text-gray-600 hover:bg-gray-200"}
          >
            Special Request
          </a>
          <a
            onClick={() => setCurrent(2)}
            href="#"
            className={current==2?`block py-2 px-4 bg-green-500 text-white`:"block py-2 px-4 text-gray-600 hover:bg-gray-200"}
          >
            Collections
          </a>
        </nav>
      </div>
      {current == 0 && <DriverDashMain />}
      {current == 1 && <DriverDashMain />}
      {current == 2 && <DriverCollections />}
    </div>
  );
}

export default DriverDashboard