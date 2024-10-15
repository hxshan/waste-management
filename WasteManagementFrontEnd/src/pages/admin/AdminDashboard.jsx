import React from 'react';

const AdminDashboard = () => {
  // Mock data - replace with actual data in a real application
  const stats = {
    pendingRequests: 5,
    staffCount: 20,
    binCount: 100,
  };

  const specialRequests = [
    { id: 1, type: 'Urgent Pickup', location: 'Downtown', status: 'Pending' },
    { id: 2, type: 'Extra Bins', location: 'Suburb A', status: 'In Progress' },
  ];

  const drivers = [
    { id: 1, name: 'John Doe', route: 'Route A', status: 'On Duty' },
    { id: 2, name: 'Jane Smith', route: 'Route B', status: 'Off Duty' },
  ];

  const alerts = [
    { id: 1, message: 'Missed Collection at 6th Ave', type: 'error' },
    { id: 2, message: 'Bin Full at 5th Ave', type: 'warning' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Admin Dashboard</h1>
      
      {/* Top Stats */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '30%' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Special Requests and Drivers Tables */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '48%' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Special Requests</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Type</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Location</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {specialRequests.map((request) => (
                <tr key={request.id}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{request.type}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{request.location}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{request.status}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    <button style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ width: '48%' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Drivers</h2>
          <button style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginBottom: '10px' }}>
            Add Driver
          </button>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Name</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Route</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{driver.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{driver.route}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{driver.status}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                    <button style={{ padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                      Navigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts Section */}
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Alerts</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {alerts.map((alert) => (
            <li key={alert.id} style={{ marginBottom: '5px', color: alert.type === 'error' ? 'red' : 'orange' }}>
              {alert.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;