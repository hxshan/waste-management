import React from "react";
import { MapComponent } from "../../components/MapComponent";

const DriverCollections = () => {
  return (
    <div className="flex-1 p-6">
      <div className="flex space-x-6">
        <MapComponent/>

        {/* Collection Requests */}
        <div className="w-64 bg-white p-8">
          <h2 className="text-lg font-semibold mb-4">Collection Requests</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <span>123/A Abd,colombo</span>
                <span className="text-blue-600">Plastic</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center">
                <span>123/A Abd,colombo</span>
                <span className="text-green-600">Organic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverCollections;
