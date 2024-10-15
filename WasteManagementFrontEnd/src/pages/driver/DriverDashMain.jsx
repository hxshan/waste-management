import React, { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react';
import axios from '../../api/axios';
import { useAuth } from '../../context/useAuth';



const DriverDashMain = () => {

  const [events, setEvents] = useState([]);
  const {user} = useAuth();

  const fetchCollectionReq = async () => {
    try {
      const response = await axios.get(`client/collection-request/${user?.userid}`);
      console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching collection requests:", error);
    }
  };
  useEffect(()=>{
    fetchCollectionReq();
  },[])

  return (
    <div className="flex-1 p-10">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Collection Progress</h1>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Generate Report</button>
    </div>

    {/* Progress cards */}
    <div className="grid grid-cols-3 gap-4 mb-8">
      {['Collected', 'Pending', 'Missed'].map((status, index) => (
        <div key={status} className="bg-white p-4 rounded shadow">
          <div className="text-lg font-semibold mb-2">{status}</div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <div className="text-2xl font-bold">{index === 0 ? '77%' : index === 1 ? '15%' : '8%'}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="flex space-x-4">
      
      <div className="flex-1 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Upcoming Collections</h2>
        {events.map((event,index)=>{
          return(
        
          <div  key={index} className="bg-gray-100 p-3 rounded mb-2">
            <div className="font-semibold">Collection At :{event.location}</div>
            <div className="text-sm text-gray-600">Waste type : Plastic</div>
            <div className="text-sm text-gray-600">ETA: 15 mins</div>
          </div>
      )
      })
      }
    </div>
    
    

      {/* Alerts */}
      <div className="flex-1 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Alerts</h2>
        {[
          'Missed Collection at 6th avn',
          'Full Bin at 5th Avn',
          'Truck Low on Feul',
          'Missed Collection at 9th Avn',
          'Missed Collection at 26th Avn'
        ].map((alert, index) => (
          <div key={index} className="flex items-center text-red-600 mb-2">
            <AlertCircle size={16} className="mr-2" />
            <span>{alert}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default DriverDashMain