import React, { useEffect,useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ClientNavigationBar from "../shared/ClientNavigationBar";
import ClientFooter from "../shared/ClientFooter";
import axios from "../../api/axios";
import { useAuth } from "../../context/useAuth";
import Swal from "sweetalert2";

const DashboardCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      {Icon && <Icon className="h-5 w-5 text-gray-400" />}
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default' }) => {
  const colors = {
    default: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[variant]}`}>
      {children}
    </span>
  );
};

const Alert = ({ title, children }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-yellow-700">{title}</p>
        <p className="mt-2 text-sm text-yellow-600">{children}</p>
      </div>
    </div>
  </div>
);


const ClientDashMain = () => {

  const {user} = useAuth();

  const upcomingSchedules = [
    { date: '2024-10-15', time: '10:00 AM', type: 'General Waste' },
    { date: '2024-10-20', time: '11:00 AM', type: 'Recycling' },
  ];

  const [binData,setBinData]=useState({
    totalBins: 3,
    filledBins: 1,
    collectionType: 'Weekly',
  })



  const specialRequests = [
    { id: 1, request: 'Large bin for garden waste', status: 'Pending' },
    { id: 2, request: 'Hazardous waste collection', status: 'Completed' },
  ];

  const wasteData = [
    { name: 'Jan', amount: 400 },
    { name: 'Feb', amount: 300 },
    { name: 'Mar', amount: 200 },
    { name: 'Apr', amount: 278 },
    { name: 'May', amount: 189 },
    { name: 'Jun', amount: 239 },
  ];
  const [events, setEvents] = useState([]);

  const fetchBins = async () => {
    try {
      const response = await axios.get(`Bins/client/${user?.userid}`); 
      setBinData((prevData) => ({
        ...prevData,
        totalBins: response.data.length 
      }));
      
    } catch (error) {
      console.error("Error fetching bins:", error);
    }
  };

  const fetchCollectionReq = async () => {
    try {
      const response = await axios.get(`client/collection-request/${user?.userid}`);
      setEvents(response.data.slice(-5));
    } catch (error) {
      console.error("Error fetching collection requests:", error);
    }
  };

  useEffect(()=>{
    fetchBins();
    fetchCollectionReq();
  },[])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <ClientNavigationBar selected={'home'} />
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6">Waste Collection Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Total Bins" value={binData.totalBins} />
          <DashboardCard title="Filled Bins" value={binData.filledBins} />
          <DashboardCard title="Pending Requests" value="5" />
          <DashboardCard title="Next Collection" value={upcomingSchedules[0].date} />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card title="Waste Reduction Progress">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Upcoming Collections">
            {events.map((event, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{event.scheduleDate.split('T')[0]}</p>
                    <p className="text-sm text-gray-500">{event.scheduleDate.split('T')[1]}</p>
                  </div>
                  <Badge>{event.wasteType}</Badge>
                </div>
              </div>
            ))}
          </Card>
        </div>


      </main>
      <ClientFooter />
    </div>
  );
}

export default ClientDashMain;