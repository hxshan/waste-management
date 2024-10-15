// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const NotificationCard = () => {
//   const [fullBins, setFullBins] = useState([]);

//   const calculateBinStatus = (currentWasteLevel, maxWasteCap) => {
//     const fillPercentage = (currentWasteLevel / maxWasteCap) * 100;
//     return fillPercentage >= 90 ? 'Full' : 'Not Full';
//   };

//   const fetchFullBins = async () => {
//     try {
//       const response = await axios.get('http://localhost:5290/api/Bins');
//       const binsWithStatus = response.data.map(bin => ({
//         ...bin,
//         status: calculateBinStatus(bin.currentWasteLevel, bin.maxWasteCap)
//       }));

//       // Filter bins with "Full" status
//       const fullBins = binsWithStatus.filter(bin => bin.status === 'Full');
//       setFullBins(fullBins);
//     } catch (error) {
//       console.error('Error fetching full bins:', error);
//       toast.error('Failed to fetch bin notifications');
//     }
//   };

//   useEffect(() => {
//     fetchFullBins();
//   }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md">
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h2 className="text-lg font-semibold mb-4">Notifications</h2>

//           {fullBins.length > 0 ? (
//             fullBins.map((bin, index) => (
//               <div key={bin.id} className="bg-green-100 text-green-800 p-4 rounded-lg mb-4 flex justify-between items-center">
//                 <span className="font-medium text-lg">
//                   {`Bin ${bin.id} (${bin.location}) is Full!`}
//                 </span>
//                 <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-2 rounded">
//                   Send Request
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No bins are full at the moment.</p>
//           )}
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default NotificationCard;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bell } from 'lucide-react'; // Notification icon (you can replace it with another icon library if needed)

const NotificationCard = () => {
  const [fullBins, setFullBins] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const calculateBinStatus = (currentWasteLevel, maxWasteCap) => {
    const fillPercentage = (currentWasteLevel / maxWasteCap) * 100;
    return fillPercentage >= 90 ? 'Full' : 'Not Full';
  };

  const fetchFullBins = async () => {
    try {
      const response = await axios.get('http://localhost:5290/api/Bins');
      const binsWithStatus = response.data.map(bin => ({
        ...bin,
        status: calculateBinStatus(bin.currentWasteLevel, bin.maxWasteCap)
      }));

      // Filter bins with "Full" status
      const fullBins = binsWithStatus.filter(bin => bin.status === 'Full');
      setFullBins(fullBins);
    } catch (error) {
      console.error('Error fetching full bins:', error);
      toast.error('Failed to fetch bin notifications');
    }
  };

  useEffect(() => {
    fetchFullBins();
  }, []);

  // Toggle notification pop-up
  const toggleNotificationPopup = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <div className="relative p-4">
      {/* Notification Icon with Count */}
      <div className="flex justify-end mb-4">
        <div className="relative cursor-pointer" onClick={toggleNotificationPopup}>
          <Bell className="w-7 h-7 text-gray-700" />
          {fullBins.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 py-0.5 text-xs">
              {fullBins.length}
            </span>
          )}
        </div>
      </div>

      {/* Notification Pop-up */}
      {isNotificationOpen && (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
              <div className="w-full max-w-md">
                 <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          {fullBins.length > 0 ? (
            fullBins.map((bin) => (
              <div key={bin.id} className="bg-red-100 text-red-800 p-4 rounded-lg mb-4 flex justify-between items-center">
                <span className="font-medium text-lg">
                  {`Bin ${bin.id} (${bin.location}) is Full!`}
                </span>
                <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-2 rounded">
                  Send Request
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No bins are full at the moment.</p>
          )}
        </div>
        </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default NotificationCard;
