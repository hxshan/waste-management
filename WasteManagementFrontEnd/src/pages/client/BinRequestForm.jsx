import React, { useState, useEffect } from 'react';

const RequestBinForm = ({ addBinRequest }) => {
  const [formData, setFormData] = useState({
    clientID: '',
    location: '',
    binType: ''
  });

  const clientId = sessionStorage.getItem('clientId') || '';

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`/api/clients/${clientId}`);
        const clientData = await response.json();
        setFormData({
          clientID: clientData.id,
          location: `${clientData.addressLatitude}, ${clientData.addressLongitude}`,
          binType: '' 
        });
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    if (clientId) {
      fetchClientData();
    }
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBinRequest(formData); // Add the submitted form data to the notifications list
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Request Bin</h2>
        <form onSubmit={handleSubmit}>
          {/* Client ID Input */}
          <div className="mb-4">
            <label htmlFor="clientID" className="block text-sm font-medium text-gray-700 mb-1">
              ClientID
            </label>
            <input
              type="text"
              id="clientID"
              name="clientID"
              value={formData.clientID}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
              readOnly
            />
          </div>

          {/* Location Input */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder=""
              readOnly
            />
          </div>

          {/* Bin Type Dropdown */}
          <div className="mb-4">
            <label htmlFor="binType" className="block text-sm font-medium text-gray-700 mb-1">
              Bin Type
            </label>
            <select
              id="binType"
              name="binType"
              value={formData.binType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Bin Type</option>
              <option value="plastic">Plastic</option>
              <option value="paper">Paper</option>
              <option value="food">Food</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mt-4"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestBinForm;
