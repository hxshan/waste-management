import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BinList = () => {
  const [bins, setBins] = useState([]);

  const navigate = useNavigate();

  // Fetch bins from the API
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5290/api/Bins`); // Adjust this URL if necessary
      setBins(response.data);
    } catch (error) {
      console.error('Error fetching bins:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete") === true) {
      try {
        const result = await axios.delete(`http://localhost:5290/api/Bins/${id}`);
        if (result.status === 200) {
          toast.success("Bin has been deleted");
          getData();
        }
      } catch (error) {
        toast.error("Failed to delete the bin");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-bin/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    

    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        
        <div className="flex justify-between w-full max-w-5xl mb-4">
        <button
          //onClick={generateReport}
          className="p-2 bg-orange-500 text-white rounded"
        >
          Generate Report
        </button>
        <h1 className="text-2xl font-bold mb-4">Registered Bins List</h1>
        <button
          onClick={() => navigate('/bin-registraion')}
          className="p-2 bg-green-500 text-white rounded"
        >
          Add New Bin
        </button>
      </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Client ID</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Max Waste Cap</th>
              <th className="border border-gray-300 p-2">Current Waste Level</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Bin Type</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {bins.map((bin, index) => (
              <tr key={bin.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{bin.clientId}</td>
                <td className="border border-gray-300 p-2">{bin.location}</td>
                <td className="border border-gray-300 p-2">{bin.maxWasteCap}</td>
                <td className="border border-gray-300 p-2">{bin.currentWasteLevel}</td>
                <td className="border border-gray-300 p-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bin.status === 'Full' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {bin.status}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">{bin.binType}</td>
                <td className="border border-gray-300 p-2">
                  <button 
                    onClick={() => handleEdit(bin.id)}
                    className="text-red-600 hover:text-red-900 mr-2">
                    <span className="sr-only">Edit</span>
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(bin.id)}
                    className="text-blue-600 hover:text-blue-900">
                    <span className="sr-only">Delete</span>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BinList;
