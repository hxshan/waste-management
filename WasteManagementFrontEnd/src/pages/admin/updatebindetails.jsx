// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate, useParams } from 'react-router-dom';

// const UpdateBin = () => {

//     const [clientid, setClientid] = useState("");
//     const [location, setLocation] = useState("");
//     const [maxcapacity, setMaxcapacity] = useState("");
//     const [currentCapacity, setCurrentcapacity] = useState("");
//     const [status, setStatus] = useState("");
//     const [bintype, setBintype] = useState("");

//     const { id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchBinDetails();
//       }, []);

//     const fetchBinDetails = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5290/api/Bins/${id}`);
//           const bin = response.data;
//           setClientid(bin.clientId);
//           setLocation(bin.Location);
//           setMaxcapacity(bin.maxcap);
//           setCurrentcapacity(bin.currentcap);
//           setStatus(bin.Status);
//           setBintype(bin.binType);
          
//         } catch (error) {
//           toast.error("Failed to fetch bin details");
//         }
//       };


//       const handleUpdate = async () => {
//         const url = `http://localhost:5290/api/Bins/${id}`;
//         const updatedData = {
//           id: id,
//           clientId: clientid,
//           Location: location,
//           maxcap: maxcapacity, // Parse as float to ensure it's treated as a number
//           currentcap: currentCapacity, // Parse as float for number format
//           Status: status,
//           binType: bintype,
//         };

//         try {
//             await axios.put(url, updatedData);
//             toast.success("bin has been updated");
//             navigate('/');
//           } catch (error) {
//             toast.error("Failed to update the bin");
//           }

// };
// return (
// <div className="flex justify-center items-center min-h-screen bg-gray-100">
// <div className="bg-white p-8 rounded-lg shadow-md w-96">
//   <h2 className="text-2xl font-bold mb-6 text-center">Update Bin Details</h2>

//   <div className="mb-4">
//     <label htmlFor="clientID" className="block text-sm font-medium text-gray-700 mb-2">
//       Client ID
//     </label>
//     <input
//       type="text"
//       name="clientID"
//       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       placeholder="Enter Client ID"
//       value={clientid}
      
//     />
//   </div>

//   <div className="mb-4">
//     <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
//       Location
//     </label>
//     <input
//       type="text"
//       name="location"
//       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       placeholder="Enter Location"
//       value={location}
      
//     />
//   </div>

//   <div className="mb-4">
//     <label htmlFor="maxWasteCapacity" className="block text-sm font-medium text-gray-700 mb-2">
//       Max Waste Capacity(Kg)
//     </label>
//     <input
//       type="text"
//       name="maxWasteCapacity"
//       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       placeholder="Enter Max Waste Capacity"
//       value={maxcapacity}
      
//     />
//   </div>

//   <div className="mb-4">
//     <label htmlFor="currentWasteCapacity" className="block text-sm font-medium text-gray-700 mb-2">
//       Current Waste Capacity(Kg)
//     </label>
//     <input
//       type="text"
//       name="currentWasteCapacity"
//       value={currentCapacity}
      
//       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       placeholder="Enter Current Waste Capacity"
//     />
//   </div>
  
//   <div className="mb-4">
//     <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
//       Status
//     </label>
//     <input
//       type="text"
//       name="status"
//       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       placeholder="Enter Status"
//       value={status}
      
//     />
//   </div>

//   <div className="mb-4">
//     <label htmlFor="binType" className="block text-sm font-medium text-gray-700 mb-2">
//       Bin Type
//     </label>
//     <select
//       name="binType"
//       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       value={bintype}
     
//     >
//       <option value="">Select Bin Type</option>
//       <option value="food">Food</option>
//       <option value="paper">Paper</option>
//       <option value="plastic">Plastic</option>
//     </select>
//   </div>

//   <button
//     onClick={handleUpdate}
//     className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
//   >
//     Update Details
//   </button>
// </div>
// <ToastContainer />
// </div>
// );


// }
// export default UpdateBin;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const BinUpdateForm = () => {
  const [clientid, setClientid] = useState("");
  const [location, setLocation] = useState("");
  const [maxcapacity, setMaxcapacity] = useState("");
  const [currentCapacity, setCurrentcapacity] = useState("");
  const [status, setStatus] = useState("");
  const [bintype, setBintype] = useState("");

  const navigate = useNavigate();
  const { id } = useParams(); // Assuming the bin ID is passed via URL params

  useEffect(() => {
    // Fetch the bin details by ID when the component loads
    const fetchBinDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5290/api/Bins/${id}`);
        const data = response.data;
        setClientid(data.clientId);
        setLocation(data.location);
        setMaxcapacity(data.maxcap); // Convert to string for input value
        setCurrentcapacity(data.currentcap);
        setStatus(data.status);
        setBintype(data.binType);
      } catch (error) {
        toast.error("Failed to fetch bin details");
        console.error(error.response.data);
      }
    };

    fetchBinDetails();
  }, [id]);

  // Handle form submission and update
  const handleUpdate = async () => {
    const url = `http://localhost:5290/api/Bins/${id}`;
    const updatedData = {
      clientId: clientid,
      Location: location,
      maxcap: maxcapacity, // Parse as float to ensure it's treated as a number
      currentcap: currentCapacity, // Parse as float for number format
      Status: status,
      binType: bintype,
    };
    try {
      await axios.put(url, updatedData);
      toast.success("Bin has been updated");
      navigate("/"); // Navigate back to the list or another page after updating
    } catch (error) {
      toast.error("Failed to update bin");
      console.error(error.response.data); // Log the detailed error from the server for debugging
    }
  };

  // Handle input changes and update the respective state
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "clientID":
        setClientid(value);
        break;
      case "location":
        setLocation(value);
        break;
      case "maxWasteCapacity":
        setMaxcapacity(value);
        break;
      case "currentWasteCapacity":
        setCurrentcapacity(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "binType":
        setBintype(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Bin</h2>

        <div className="mb-4">
          <label htmlFor="clientID" className="block text-sm font-medium text-gray-700 mb-2">
            Client ID
          </label>
          <input
            type="text"
            name="clientID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Client ID"
            value={clientid}
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
          <label htmlFor="maxWasteCapacity" className="block text-sm font-medium text-gray-700 mb-2">
            Max Waste Capacity(Kg)
          </label>
          <input
            type="text"
            name="maxWasteCapacity"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Max Waste Capacity"
            value={maxcapacity}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="currentWasteCapacity" className="block text-sm font-medium text-gray-700 mb-2">
            Current Waste Capacity(Kg)
          </label>
          <input
            type="text"
            name="currentWasteCapacity"
            value={currentCapacity}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Current Waste Capacity"
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
            value={bintype}
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
