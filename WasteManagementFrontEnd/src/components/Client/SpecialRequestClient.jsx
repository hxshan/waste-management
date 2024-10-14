import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

// Card component for individual special request
const SpecialRequestClientCard = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "approved":
        return "bg-green-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="rounded-lg p-6 max-w-md mb-6 bg-white shadow-lg border-2">
      <h2 className="text-xl font-semibold mb-2">{data.wasteType}</h2>
      <p className="text-gray-600 mb-4">{data.description}</p>
      <div className="flex justify-between mb-4">
        <div>
          <p className="font-semibold">Quantity</p>
          <p>{data.quantity}</p>
        </div>
        <div>
          <p className="font-semibold">Request Date</p>
          <p>{new Date(data.scheduleDate).toLocaleDateString()}</p>
        </div>
      </div>
      <span
        className={`${getStatusColor(
          data.status
        )} text-white px-2 py-1 rounded-full text-sm`}
      >
        {data.status}
      </span>
    </div>
  );
};

// Main SpecialRequestClient component
const SpecialRequestClient = () => {
  const [SpecialRequestClients, setSpecialRequestClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uId, setUId] = useState();

  useEffect(() => {
    const fetchSpecialRequestClients = async () => {
      try {
        setUId("bb797925-dfae-4531-aadd-294a87fd73f2")

        const response = await axios.get(`special-request/user/${uId}`);
        console.log(response.data); 
        setSpecialRequestClients(response.data); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch special requests");
        setLoading(false);
      }
    };

    fetchSpecialRequestClients();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex justify-center bg-white h-screen py-10">
      <div className="w-3/4">
        <div className="bg-white flex flex-col items-center p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-10 text-gray-800">Special Collection Status</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {Array.isArray(SpecialRequestClients) && SpecialRequestClients.length > 0 ? (
              SpecialRequestClients.map((item) => (
                <SpecialRequestClientCard key={item.id} data={item} />
              ))
            ) : (
              <div>No special requests available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialRequestClient;
