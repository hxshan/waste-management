// import React, { useState } from 'react';
// import { Search } from 'lucide-react';

// const GarbageBinManagement = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const bins = [
//     { id: 'ER1245', clientId: 'YUd45152', client: 'W.T.M. Kariyawasam', location: 'Colombo', maxWasteCap: 5, currentWasteLevel: 5, status: 'Full', binType: 'Plastic' },
//     { id: 'HK545', clientId: 'HGd45552', client: 'K.H. Sugathapala', location: 'Gampaha', maxWasteCap: 4, currentWasteLevel: 1, status: 'No', binType: 'Plastic' },
//     { id: 'YR1245', clientId: 'GFG74663', client: 'T.M. Jayakodi', location: 'Colombo', maxWasteCap: 2, currentWasteLevel: 2, status: 'Full', binType: 'Rubber' },
//   ];

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Registered Bins List</h1>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search Here"
//             className="pl-3 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//         </div>
//       </div>
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="w-full table-auto">
//           <thead>
//             <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//               <th className="px-4 py-3">ID</th>
//               <th className="px-4 py-3">Client ID</th>
//               <th className="px-4 py-3">Client</th>
//               <th className="px-4 py-3">Location</th>
//               <th className="px-4 py-3">Max Waste Cap</th>
//               <th className="px-4 py-3">Current Waste Level</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Bin Type</th>
//               <th className="px-4 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-600 text-sm">
//             {bins.map((bin) => (
//               <tr key={bin.id} className="border-b border-gray-200 hover:bg-gray-100">
//                 <td className="px-4 py-3">{bin.id}</td>
//                 <td className="px-4 py-3">{bin.clientId}</td>
//                 <td className="px-4 py-3">{bin.client}</td>
//                 <td className="px-4 py-3">{bin.location}</td>
//                 <td className="px-4 py-3">{bin.maxWasteCap}</td>
//                 <td className="px-4 py-3">{bin.currentWasteLevel}</td>
//                 <td className="px-4 py-3">
//                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     bin.status === 'Full' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
//                   }`}>
//                     {bin.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">{bin.binType}</td>
//                 <td className="px-4 py-3">
//                   <button className="text-red-600 hover:text-red-900 mr-2">
//                     <span className="sr-only">Delete</span>
//                     🗑️
//                   </button>
//                   <button className="text-blue-600 hover:text-blue-900">
//                     <span className="sr-only">Edit</span>
//                     ✏️
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default GarbageBinManagement;

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

const GarbageBinManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bins, setBins] = useState([]);

  // Fetch bins from the API
  const fetchBins = async () => {
    try {
      const response = await axios.get('/api/bin'); // Adjust this URL if necessary
      setBins(response.data);
    } catch (error) {
      console.error('Error fetching bins:', error);
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  // Filter bins based on the search term
  const filteredBins = bins.filter(bin =>
    bin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bin.binType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Registered Bins List</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Here"
            className="pl-3 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Client ID</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Max Waste Cap</th>
              <th className="px-4 py-3">Current Waste Level</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Bin Type</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {filteredBins.map((bin) => (
              <tr key={bin.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-3">{bin.id}</td>
                <td className="px-4 py-3">{bin.clientId}</td>
                <td className="px-4 py-3">{bin.client}</td>
                <td className="px-4 py-3">{bin.location}</td>
                <td className="px-4 py-3">{bin.maxWasteCap}</td>
                <td className="px-4 py-3">{bin.currentWasteLevel}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bin.status === 'Full' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {bin.status}
                  </span>
                </td>
                <td className="px-4 py-3">{bin.binType}</td>
                <td className="px-4 py-3">
                  <button className="text-red-600 hover:text-red-900 mr-2">
                    <span className="sr-only">Delete</span>
                    🗑️
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    <span className="sr-only">Edit</span>
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GarbageBinManagement;
