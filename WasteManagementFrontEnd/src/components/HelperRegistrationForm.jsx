import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HelperRegistrationForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    nic: "",
    address: "",
    emergencyContact: "",
    dateOfHire: "",
    isActive: true,
    department: "",
  });
  const [salary, setSalary] = useState(0);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convert checkbox values
    const finalValue = type === "checkbox" ? e.target.checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));
  };
  const handleNextStep = () => {
    setStep(step + 1); // Move to the next step
  };

  const handlePreviousStep = () => {
    setStep(step - 1); // Move to the previous step
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (salary <= 0) {
        Swal.fire({
          title: "Error",
          text: "Salary must be a positive number!",
          icon: "error",
        });
        return;
      }

      let res = await axios.post(
        "http://localhost:5290/api/account/register-helper",
        { ...formData, salary, dateOfResignation: null }
      );
      if (res.status == 200) {
        Swal.fire({
          title: "Success",
          text: "New Helper is saved Succesfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/admin");
          }
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `${err?.message}}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border-2 border-gray-400">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Driver Registration Form
      </h2>
      <form onSubmit={handleSubmit}>
      {step === 1 && (
          <>
          <div className="grid md:grid-cols-2 gap-6">

                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name:
                </label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
                </div>

                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name:
                </label>
                <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIC:
              </label>
              <input
                type="text"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number:
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact:
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
            </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">

            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Hire:
              </label>
              <input
                type="date"
                name="dateOfHire"
                value={formData.dateOfHire}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>

            <div className="mb-4">
            <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              >
                <option value="">Select a department</option>
                <option value="Waste Transport-drivers">
                  Waste Transport Driver
                </option>
                <option value="Waste Transport-drivers">
                  Waste Transport Helper
                </option>
                <option value="Admin">Administrative</option>
              </select>
            </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary:
              </label>
              <input
                type="number"
                name="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
           

            

            <button
              type="button"
              onClick={handleNextStep}
              className="ml-[50%] w-[50%] mt-4 px-4 py-2 bg-[#5664F5] text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
           <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div className="mb-4">
            <label
                htmlFor="isActive"
                className="flex items-center mt-9 cursor-pointer"
              >
                <div className="relative">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 rounded transition-colors ${
                      formData.isActive
                        ? "bg-[#5664F5] border-blue-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {formData.isActive && (
                      <svg
                        className="w-3 h-3 text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-2 text-sm text-gray-900">Is Active</span>
              </label>
            </div>
            

            

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="w-full px-4 py-2 mr-2 bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              >
                Back
              </button>

              <button
              type="submit"
              className="w-full ml-auto px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              Submit
            </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default HelperRegistrationForm;
