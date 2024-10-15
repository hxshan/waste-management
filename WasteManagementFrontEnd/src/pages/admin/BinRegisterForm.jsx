import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const BinRegistrationForm = () => {
  const [clientId, setClientId] = useState("");
  const [location, setLocation] = useState("");
  const [maxWasteCap, setMaxWasteCap] = useState("");
  const [currentWasteLevel, setCurrentWasteLevel] = useState("");
  const [status, setStatus] = useState("");
  const [binType, setBinType] = useState("");

  const navigate = useNavigate();

  // Handle form submission and save
  const handleSave = async () => {
    const url = "http://localhost:5290/api/Bins";
    const newData = {
      clientId: clientId,
      location: location,
      maxWasteCap: parseFloat(maxWasteCap),
      currentWasteLevel: parseFloat(currentWasteLevel),
      status: status,
      binType: binType,
    };
    try {
      console.log(newData);
      await axios.post(url, newData);
      toast.success("Bin has been added");
      navigate("/binlist");
    } catch (error) {
      toast.error("Failed to add new bin");
      console.error(error.response.data);
    }
  };

  // Handle input changes and update the respective state
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "clientId":
        setClientId(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "maxWasteCap":
        setMaxWasteCap(value);
        break;
      case "currentWasteLevel":
        setCurrentWasteLevel(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "binType":
        setBinType(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Bin Registration</h2>

        <div className="mb-4">
          <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
            Client ID
          </label>
          <input
            type="text"
            name="clientId"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Client ID"
            value={clientId}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Location"
            value={location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="maxWasteCap" className="block text-sm font-medium text-gray-700 mb-2">
            Max Waste Capacity (Kg)
          </label>
          <input
            type="number"
            name="maxWasteCap"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Max Waste Capacity"
            value={maxWasteCap}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="currentWasteLevel" className="block text-sm font-medium text-gray-700 mb-2">
            Current Waste Level (Kg)
          </label>
          <input
            type="number"
            name="currentWasteLevel"
            value={currentWasteLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Current Waste Level"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <input
            type="text"
            name="status"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Status"
            value={status}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="binType" className="block text-sm font-medium text-gray-700 mb-2">
            Bin Type
          </label>
          <select
            name="binType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={binType}
            onChange={handleChange}
          >
            <option value="">Select Bin Type</option>
            <option value="food">Food</option>
            <option value="paper">Paper</option>
            <option value="plastic">Plastic</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          Register
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BinRegistrationForm;