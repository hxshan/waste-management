import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ClientFooter from "../shared/ClientFooter";
import ClientNavigationBar from "../shared/ClientNavigationBar";

const SpecialRequestForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(""); // Assume we get this from a login context or state

  useEffect(() => {
    // Here you would typically fetch the logged-in user's ID
    // For now, we'll just simulate it
    setUserId("logged-in-user-id");
  }, []);

  const [formData, setFormData] = useState({
    wasteType: "",
    location: "",
    contactNo: "",
    description: "",
    specialInstructions: "",
    quantity: "",
    date: "",
    immediate: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // If immediate is checked, clear the date
    if (name === "immediate" && checked) {
      setFormData((prevData) => ({ ...prevData, date: "" }));
    }
    // If date is set, uncheck immediate
    if (name === "date" && value) {
      setFormData((prevData) => ({ ...prevData, immediate: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...formData,
        userId,
        date: formData.immediate ? new Date().toISOString() : formData.date,
      };

      const response = await fetch("/api/SpecialRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Special request submitted successfully!",
          icon: "success",
        }).then(() => {
          navigate("/admin-special-request");
        });
      } else {
        throw new Error("Failed to submit special request");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to submit special request. Please try again.",
        icon: "error",
      });
    }
  };

  const cancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to cancel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/client");
      }
    });
  };

  return (
    <div className="bg-white">
      <ClientNavigationBar />
      <div className="flex flex-col h-full bg-white overflow-scroll">
        <div className="flex-1 p-10">
          <h2 className="text-2xl font-bold mb-6">New Special Request</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6">
            <div>
              <label htmlFor="wasteType" className="block mb-1">
                Waste type :
              </label>
              <select
                id="wasteType"
                name="wasteType"
                value={formData.wasteType}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select</option>
                <option value="largeItems">Large Items</option>
                <option value="eWaste">Electronic Waste</option>
                <option value="hazardous">Hazardous</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block mb-1">
                Location :
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="contactNo" className="block mb-1">
                Contact No :
              </label>
              <input
                type="tel"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                placeholder="Contact no"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-1">
                Description :
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="specialInstructions" className="block mb-1">
                Special Instructions :
              </label>
              <textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder="Enter special instructions"
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
              ></textarea>
            </div>

            <div>
              <label htmlFor="quantity" className="block mb-1">
                Quantity :
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity (optional)"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="date" className="block mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                  disabled={formData.immediate}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="immediate"
                  name="immediate"
                  checked={formData.immediate}
                  onChange={handleChange}
                  className="mr-2"
                  disabled={formData.date !== ""}
                />
                <label htmlFor="immediate">Immediate</label>
              </div>
            </div>

            <div className="flex justify-between items-baseline">
              <button
                type="button"
                className="bg-[#dd2c2f] text-white px-4 py-2 rounded hover:bg-[#bd1f21]"
                onClick={cancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
      <ClientFooter />
    </div>
  );
};

export default SpecialRequestForm;
