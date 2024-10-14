import React, { useState } from 'react';

const BinRegistrationForm = () => {
  const [formData, setFormData] = useState({
    clientID: '',
    location: '',
    maxWasteCapacity: '',
    currentWasteCapacity: '',
    binType: '' // Will be updated via the dropdown
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Bin Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* Input field for clientID */}
          <div className="mb-4">
            <label htmlFor="clientID" className="block text-sm font-medium text-gray-700 mb-2">
              Client ID
            </label>
            <input
              type="text"
              id="clientID"
              name="clientID"
              value={formData.clientID}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Client ID"
            />
          </div>

          {/* Input field for location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Location"
            />
          </div>

          {/* Input field for maxWasteCapacity */}
          <div className="mb-4">
            <label htmlFor="maxWasteCapacity" className="block text-sm font-medium text-gray-700 mb-2">
              Max Waste Capacity(Kg)
            </label>
            <input
              type="text"
              id="maxWasteCapacity"
              name="maxWasteCapacity"
              value={formData.maxWasteCapacity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Max Waste Capacity"
            />
          </div>
          

          {/* Input field for currentWasteCapacity */}
          <div className="mb-4">
            <label htmlFor="currentWasteCapacity" className="block text-sm font-medium text-gray-700 mb-2">
              Current Waste Capacity(Kg)
            </label>
            <input
              type="text"
              id="currentWasteCapacity"
              name="currentWasteCapacity"
              value={formData.currentWasteCapacity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Current Waste Capacity"
            />
          </div>

          {/* Dropdown field for binType */}
          <div className="mb-4">
            <label htmlFor="binType" className="block text-sm font-medium text-gray-700 mb-2">
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
              <option value="food">Food</option>
              <option value="paper">Paper</option>
              <option value="plastic">Plastic</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default BinRegistrationForm;
