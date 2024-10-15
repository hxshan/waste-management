import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const BinUpdateForm = () => {
  const [binData, setBinData] = useState({
    id: 0,
    clientId: "",
    location: "",
    maxWasteCap: "",
    currentWasteLevel: "",
    status: "",
    binType: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBinDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5290/api/Bins/${id}`);
        const data = response.data;
        setBinData({
          id: data.id,
          clientId: data.clientId,
          location: data.location,
          maxWasteCap: data.maxWasteCap.toString(),
          currentWasteLevel: data.currentWasteLevel.toString(),
          status: data.status,
          binType: data.binType
        });
      } catch (error) {
        toast.error("Failed to fetch bin details");
        console.error(error.response?.data || error.message);
      }
    };

    fetchBinDetails();
  }, [id]);

  const handleUpdate = async () => {
    const url = `http://localhost:5290/api/Bins/${id}`;
    const updatedData = {
      ...binData,
      maxWasteCap: parseFloat(binData.maxWasteCap),
      currentWasteLevel: parseFloat(binData.currentWasteLevel)
    };
    console.log("Data being sent to API:", updatedData);
    try {
      const response = await axios.put(url, updatedData);
      console.log("API Response:", response.data);
      toast.success("Bin has been updated");
      navigate("/binlist");
    } catch (error) {
      toast.error("Failed to update bin");
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBinData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Bin</h2>

        <div className="mb-4">
          <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
            Client ID
          </label>
          <input
            type="text"
            name="clientId"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Client ID"
            value={binData.clientId}
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
            value={binData.location}
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
            value={binData.maxWasteCap}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="currentWasteLevel" className="block text-sm font-medium text-gray-700 mb-2">
            Current Waste Level (Kg)
          </label>
          <input
            type="number"
            name="currentWasteLevel"
            value={binData.currentWasteLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Current Waste Level"
            step="0.01"
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
            value={binData.status}
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
            value={binData.binType}
            onChange={handleChange}
          >
            <option value="">Select Bin Type</option>
            <option value="food">Food</option>
            <option value="paper">Paper</option>
            <option value="plastic">Plastic</option>
          </select>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-green-800 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Update
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BinUpdateForm;