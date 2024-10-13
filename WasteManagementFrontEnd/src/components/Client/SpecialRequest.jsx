import React from "react";
import { useNavigate } from "react-router-dom";



// Dummy data array
const dummyData = [
  {
    id: 1,
    title: "uranium - 208",
    description: "need to dispose quickly",
    quantity: "22kg",
    requestDate: "2022/09/07",
    status: "pending"
  },
  {
    id: 2,
    title: "toxic waste - X43",
    description: "highly corrosive material",
    quantity: "50L",
    requestDate: "2022/10/15",
    status: "approved"
  },
  {
    id: 3,
    title: "medical waste - B12",
    description: "biohazardous materials from hospital",
    quantity: "100kg",
    requestDate: "2022/11/03",
    status: "completed"
  },
  {
    id: 4,
    title: "electronic waste - E78",
    description: "old computers and peripherals",
    quantity: "200kg",
    requestDate: "2022/12/01",
    status: "pending"
  }
];

// Card component for individual special request
const SpecialRequestCard = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "approved": return "bg-green-500";
      case "completed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="rounded-lg p-6 max-w-md mb-6 bg-white shadow-lg border-2">
      <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
      <p className="text-gray-600 mb-4">{data.description}</p>
      <div className="flex justify-between mb-4">
        <div>
          <p className="font-semibold">Quantity</p>
          <p>{data.quantity}</p>
        </div>
        <div>
          <p className="font-semibold">Request Date</p>
          <p>{data.requestDate}</p>
        </div>
      </div>
      <span className={`${getStatusColor(data.status)} text-white px-2 py-1 rounded-full text-sm`}>
        {data.status}
      </span>
    </div>
  );
};

// Main SpecialRequest component
const SpecialRequest = () => {
  return (
    <div className="flex justify-center bg-white min-h-screen py-10">
      <div className="w-3/4">
        <div className="bg-white flex flex-col items-center p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-10 text-gray-800">Special Collection Status</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {dummyData.map((item) => (
              <SpecialRequestCard key={item.id} data={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialRequest;