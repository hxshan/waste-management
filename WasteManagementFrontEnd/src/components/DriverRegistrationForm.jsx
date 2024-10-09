import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const DriverRegistrationForm = () => {
  const navigate = useNavigate()
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    nic: "",
    nic: "",
    emergencyContact: "",
    dateOfHire: "",
    isActive: false,
    department: "",
    licenseNumber: "",
    licenceType: "",
    licenceExpiration: "",
    address: "",
    email: "",
    password: "",
  });
const [salary,setSalary]=useState(0);

const handleChange = (e) => {
  const { name, value, type } = e.target;
  
  // Convert checkbox values
  const finalValue = type === 'checkbox' ? e.target.checked : value;
  
  setFormData((prevData) => ({
    ...prevData,
    [name]: finalValue,
  }));
};
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  
  const handleSubmit =  async (e) => {
    e.preventDefault();

    try{
      
      if (salary <= 0) {
        Swal.fire({
          title: "Error",
          text: "Salary must be a positive number!",
          icon: "error",
        });
        return;
      }
     
      let res = await axios.post('http://localhost:5290/api/account/register-driver',
        {...formData,
          salary,
          dateOfResignation:null
        })
      if(res.status == 200){
        Swal.fire({
          title: "Success",
          text: "New Driver is saved Succesfully!",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/admin')
          }
        });
      }
    }catch(err){
      Swal.fire({
        title: "Error",
        text: `${err?.message}}`,
        icon:"error",
        }
      )
    }
    
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="middleName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Middle Name
              </label>
              <input
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="nic"
                htmlFor="nic"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                NIC Number
              </label>
              <input
                id="nic"
                name="nic"
                value={formData.nic}
                id="nic"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="emergencyContact"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Emergency Contact
              </label>
              <input
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="dateOfHire"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of Hire
              </label>
              <input
                id="dateOfHire"
                name="dateOfHire"
                type="date"
                value={formData.dateOfHire}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Salary
              </label>
              <input
                id="salary"
                name="salary"
                type="number"
                step="0.01"
                value={salary}
                onChange={(e)=>{setSalary(Number(e.target.value))}}
                value={salary}
                onChange={(e)=>{setSalary(Number(e.target.value))}}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            
            
            <div>
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
            <div>
              <label
                htmlFor="licenseNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                License Number
              </label>
              <input
                id="licenseNumber"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <div>
                <label
                  htmlFor="licenceType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Licence Type
                </label>
                <select
                  id="licenceType"
                  name="licenceType"
                  value={formData.licenceType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                >
                  <option value="">Select a licence type</option>
                  <option value="Class A">Class A</option>
                  <option value="Class B">Class B</option>
                  <option value="Class C">Class C</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="licenceExpiration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Licence Expiration
              </label>
              <input
                id="licenceExpiration"
                name="licenceExpiration"
                type="date"
                value={formData.licenceExpiration}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            
          </div>
        );
      case 3:
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              />
            </div>
            <div>
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
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border-2 border-gray-400">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Driver Registration Form
      </h2>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-1/3 text-center ${
                i <= step ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                  i <= step
                    ? "bg-[#5664F5] text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {i}
              </div>
              {
                i==1?(
                  <div className="mt-2 font-bold">Personal Info</div>
                ):i==2?(
                  <div className="mt-2 font-bold">Additional Info</div>
                ):(
                  <div className="mt-2 font-bold">Account Info</div>
                )
              }
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 ${
                i < step ? "bg-[#5664F5]" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {renderStep()}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-2 bg-[#5664F5] text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DriverRegistrationForm;
