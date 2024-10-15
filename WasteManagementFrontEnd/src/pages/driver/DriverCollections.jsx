import React, { useEffect, useState } from "react";
import { MapComponent } from "../../components/MapComponent";
import axios from "../../api/axios";

const DriverCollections = () => {
  const [events, setEvents] = useState([]);

  const fetchCollectionReq = async () => {
    try {
      const response = await axios.get(`driver/collections`);
      console.log(response.data);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching collection requests:", error);
    }
  };
  useEffect(() => {
    fetchCollectionReq();
  }, []);

  return (
    <div className="flex-1 p-6">
      <div className="flex space-x-6">
        <MapComponent />

        {/* Collection Requests */}
        <div className="w-64 bg-white p-8">
          <h2 className="text-lg font-semibold mb-4">Collection Requests</h2>
          <div className="space-y-4">
            {events.slice(-6).map((event, index) => {
              return (
                <div key={index} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-center">
                    <span>{event?.bin?.location}</span>
                    <span className="text-green-600">{event?.wasteType}</span>
                  </div>
                </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverCollections;
