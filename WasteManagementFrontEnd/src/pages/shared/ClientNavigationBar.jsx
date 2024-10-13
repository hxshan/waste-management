import React from 'react'

const ClientNavigationBar = () => {
  return (
    <nav className="bg-blue-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <a href="" className="text-gray-600 hover:text-gray-800">Home</a>
          <a href="" className="text-gray-600 hover:text-gray-800">Dashboard</a>
          <a href="" className="text-gray-600 hover:text-gray-800">Scheduled Collections</a>
          <a href="" className="text-gray-600 hover:text-gray-800">Request Special Collection</a>
          <a href="" className="text-gray-600 hover:text-gray-800">Billing</a>
        </div>
        <div className="space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default ClientNavigationBar