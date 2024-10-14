import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { ChevronLeft, Calendar, MapPin, Phone, FileText, Truck, User } from 'lucide-react';

const SpecialRequestDetailAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestDetail = async () => {
      try {
        const response = await axios.get(`special-request/${id}`);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching request details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetail();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!request) {
    return <div className="flex justify-center items-center h-screen">Request not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-green-600 p-4 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Special Request Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-green-200 transition-colors"
          >
            <ChevronLeft className="mr-2" />
            Back
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={<Truck />} label="Waste Type" value={request.wasteType} />
            <InfoItem icon={<FileText />} label="Quantity" value={request.quantity} />
            <InfoItem icon={<Calendar />} label="Schedule Date" value={new Date(request.scheduleDate).toLocaleString()} />
            <InfoItem icon={<User />} label="Status" value={request.status} />
            <InfoItem icon={<MapPin />} label="Location" value={request.location} />
            <InfoItem icon={<Phone />} label="Contact No" value={request.contactNo} />
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{request.description}</p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Special Instructions</h2>
            <p className="text-gray-700">{request.specialInstructions || 'No special instructions provided.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="text-green-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value || 'N/A'}</p>
    </div>
  </div>
);

export default SpecialRequestDetailAdmin;