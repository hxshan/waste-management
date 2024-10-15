import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BinList = () => {
  const [bins, setBins] = useState([]);
  const navigate = useNavigate();

  const calculateBinStatus = (currentWasteLevel, maxWasteCap) => {
    const fillPercentage = (currentWasteLevel / maxWasteCap) * 100;
    return fillPercentage >= 90 ? 'Full' : 'Not Full';
  };

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5290/api/Bins`);
      const binsWithCalculatedStatus = response.data.map(bin => ({
        ...bin,
        status: calculateBinStatus(bin.currentWasteLevel, bin.maxWasteCap),
        fillPercentage: ((bin.currentWasteLevel / bin.maxWasteCap) * 100).toFixed(2)
      }));
      setBins(binsWithCalculatedStatus);
    } catch (error) {
      console.error('Error fetching bins:', error);
      toast.error('Failed to fetch bins');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bin?")) {
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

  const generateReport = () => {
    // Create CSV content
    const headers = ["Client ID", "Location", "Max Waste Cap", "Current Waste Level", "Fill Percentage", "Status", "Bin Type"];
    const csvContent = [
      headers.join(','),
      ...bins.map(bin => [
        bin.clientId,
        bin.location,
        bin.maxWasteCap,
        bin.currentWasteLevel,
        bin.fillPercentage + '%',
        bin.status,
        bin.binType
      ].join(','))
    ].join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'bin_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Report generated and download started");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl align-middle font-bold my-10">Registered Bins List</h1>
      <div className="flex justify-end gap-5 mb-10 w-full ">
        <button 
          onClick={generateReport}
          className="py-1 px-2 font-bold text-xs bg-red-500 text-white rounded"
        >
          Generate Report
        </button>
        <button
          onClick={() => navigate('/bin-registraion')}
          className="py-1 px-2 font-bold text-xs bg-blue-500 text-white rounded"
        >
          Add New Bin
        </button>
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
              <th className="border border-gray-300 p-2">Fill Percentage</th>
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
                <td className="border border-gray-300 p-2">{bin.fillPercentage}%</td>
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
                    className="text-blue-600 hover:text-blue-900 mr-2">
                    <span className="sr-only">Edit</span>
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(bin.id)}
                    className="text-red-600 hover:text-red-900">
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