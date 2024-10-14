import React from 'react';

const NotificationsPage = ({ binRequests }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        {binRequests.length === 0 ? (
          <p className="text-gray-600">No bin requests yet.</p>
        ) : (
          binRequests.map((request, index) => (
            <div key={index} className="bg-green-100 p-4 rounded-lg shadow mb-4">
              <p className="text-green-800 font-medium">
                Client ID: {request.clientID} <br />
                Location: {request.location} <br />
                Bin Type: {request.binType}
              </p>
            </div>
            
          ))
          
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
