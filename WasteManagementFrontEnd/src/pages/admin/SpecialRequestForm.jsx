import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SpecialRequestForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    contactNo: "",
    requestType: "",
    location: "",
    description: "",
    date: "",
    immediate: false,
    specialInstructions: "",
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    }).then(() => {
      navigate('/admin-special-request')
    });
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
        navigate("/admin-special-request");
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 overflow-scroll">
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6">New Special Requests</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6">
          <div>
            <label htmlFor="customerName" className="block mb-1">
              Customer name :
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="customerEmail" className="block mb-1">
              Customer email :
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
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
            />
          </div>

          <div>
            <label htmlFor="requestType" className="block mb-1">
              Request type :
            </label>
            <select
              id="requestType"
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="largeItems">Large Items</option>
              <option value="eWaste">Electronic Waste</option>
              <option value="hazardous">Hazardous</option>.
              <option value="other">Other</option>
            </select>
          </div>

          {formData.requestType === "other" && (
            <div>
              <label htmlFor="otherType" className="block mb-1">
                Other Type :
              </label>
              <input
                type="text"
                id="otherType"
                name="otherType"
                value={formData.otherType}
                onChange={handleChange}
                placeholder="Specify other type"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

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
            ></textarea>
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
              />
              <label htmlFor="immediate">Immediate</label>
            </div>
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

          <div className="flex justify-between items-baseline">
            <button
              type="submit"
              className="bg-[#dd2c2f] text-white px-4 py-2 rounded hover:bg-[#bd1f21]"
              onClick={cancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialRequestForm;
