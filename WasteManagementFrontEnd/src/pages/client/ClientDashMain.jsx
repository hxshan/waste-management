import React from 'react';
import ClientNavigationBar from "../shared/ClientNavigationBar";
import ClientFooter from "../shared/ClientFooter";

const DashboardCard = ({ title, value }) => (
  <div className="border border-blue-300 rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h3 className="text-lg font-semibold mb-2 text-blue-600">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const ClientDashMain = () => {
  const upcomingSchedules = [
    { date: '2024-10-15', time: '10:00 AM', type: 'General Waste' },
    { date: '2024-10-20', time: '11:00 AM', type: 'Recycling' },
  ];

  const binData = {
    totalBins: 3,
    filledBins: 1,
    collectionType: 'Weekly',
  };

  const specialRequests = [
    { id: 1, request: 'Large bin for garden waste', status: 'Pending' },
    { id: 2, request: 'Hazardous waste collection', status: 'Completed' },
  ];

  return (
    <div className="client-dashboard bg-gray-50 min-h-screen">
      <ClientNavigationBar selected={'home'} />
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold">Waste Collection Dashboard</h1>
      </header>
      <div className="dashboard-content p-6">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <DashboardCard title="Pending requests" value="5" />
          <DashboardCard title="Total bins" value={binData.totalBins.toString()} />
        </div>

        {/* Welcome Section */}
        <div className="welcome-section mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-700">Welcome to Your Waste Collection Dashboard</h2>
          <p className="text-gray-600">Manage your waste collection schedules, requests, and more.</p>
        </div>

        {/* Upcoming Schedules */}
        <div className="section mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Upcoming Collection Schedules</h3>
          <div className="schedule-list">
            {upcomingSchedules.map((schedule, index) => (
              <div className="schedule-item bg-white p-4 rounded shadow-sm mb-2" key={index}>
                <p className="text-gray-800">Date: {schedule.date}</p>
                <p className="text-gray-800">Time: {schedule.time}</p>
                <p className="text-gray-800">Type: {schedule.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bin Information */}
        <div className="section mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Your Bins</h3>
          <div className="bin-info bg-white p-4 rounded shadow-sm">
            <p className="text-gray-800">Total Bins: {binData.totalBins}</p>
            <p className="text-gray-800">Filled Bins: {binData.filledBins}</p>
            <p className="text-gray-800">Collection Frequency: {binData.collectionType}</p>
          </div>
        </div>

        {/* Special Requests */}
        <div className="section mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Special Requests</h3>
          <div className="request-list">
            {specialRequests.map((request) => (
              <div className="request-item bg-white p-4 rounded shadow-sm mb-2" key={request.id}>
                <p className="text-gray-800">Request: {request.request}</p>
                <p className="text-gray-800">Status: {request.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Features or Data */}
        <div className="section mb-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Other Features</h3>
          <p className="text-gray-600">Track waste reduction progress, request additional bins, and more.</p>
        </div>
      </div>
      <ClientFooter />
    </div>
  );
}

export default ClientDashMain;