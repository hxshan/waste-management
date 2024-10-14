import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientNavigationBar = ({ selected }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <a href="#" className={`${selected === "home" ? 'font-bold' : ''} text-gray-600 hover:text-gray-800`} onClick={() => navigate('/client')}>Home</a>
          <a href="#" className={`${selected === "schedule" ? 'font-bold' : ''} text-gray-600 hover:text-gray-800`} onClick={()=>navigate('/shedule')}>Scheduled Collections</a>
          <a href="#" className={`${selected === "request" ? 'font-bold' : ''} text-gray-600 hover:text-gray-800`} onClick={() => navigate('/clientReq')}>Request Special Collection</a>
          <a href="#" className={`${selected === "bill" ? 'font-bold' : ''} text-gray-600 hover:text-gray-800`} onClick={() => navigate('/bills')}>Billing</a>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate('/profile')}>Profile</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default ClientNavigationBar;