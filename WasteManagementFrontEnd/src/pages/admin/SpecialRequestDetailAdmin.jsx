import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import Swal from "sweetalert2";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Phone,
  FileText,
  Truck,
  User,
} from "lucide-react";

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
        console.error("Error fetching request details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex justify-center items-center h-screen">
        Request not found
      </div>
    );
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`special-request/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        }).then(
          navigate('/admin-special-request')
        );
      } catch (error) {
        console.error("Error deleting special request:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete the special request. Please try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-full p-8 pt-20">
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
            <InfoItem
              icon={<Truck />}
              label="Waste Type"
              value={request.wasteType}
            />
            <InfoItem
              icon={<FileText />}
              label="Quantity"
              value={request.quantity}
            />
            <InfoItem
              icon={<Calendar />}
              label="Schedule Date"
              value={new Date(request.scheduleDate).toLocaleString()}
            />
            <InfoItem icon={<User />} label="Status" value={request.status} />
            <InfoItem
              icon={<MapPin />}
              label="Location"
              value={request.location}
            />
            <InfoItem
              icon={<Phone />}
              label="Contact No"
              value={request.contactNo}
            />
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{request.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Special Instructions</h2>
            <p className="text-gray-700">
              {request.specialInstructions ||
                "No special instructions provided."}
            </p>
          </div>

          <div className="flex justify-between">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
            onClick={() => handleDelete(request.id)}
            >
              Delete
            </button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
              Handle Request
            </button>
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
      <p className="font-semibold">{value || "N/A"}</p>
    </div>
  </div>
);

export default SpecialRequestDetailAdmin;
