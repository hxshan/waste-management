import React, { useState } from "react";
import { ChevronLeft, ChevronRight, User, Phone, CreditCard, MapPin, Mail, Lock } from "lucide-react";
import MapPicker from "./MapPicker";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ClientRegisterForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    nicNumber: "",
    address: "",
    email: "",
    password: "",
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const handleAddressSelect = (address, latitude, longitude) => {
    setSelectedAddress(address);
    setLat(latitude);
    setLng(longitude);
    setFormData((prevData) => ({ ...prevData, address }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        nic: formData.nicNumber,
        address: formData.address,
        addressLongitude: lng || -22.22,
        addressLatitude: lat || 45.34
      };
  
      console.log("Submission data:", submissionData);
  
      const response = await axios.post("account/register-client", {
          ...submissionData
      });
  
  
      if (response.statusText === "OK") {
        Swal.fire({
          title: "Success!",
          text: "Registration submitted successfully!",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      } else {
        console.log(response)
        throw new Error(response.message || "Failed to register");
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to register. Please try again.",
        icon: "error",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <InputField
              icon={<User className="text-gray-400" />}
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <InputField
              icon={<User className="text-gray-400" />}
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <InputField
              icon={<User className="text-gray-400" />}
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <InputField
              icon={<Phone className="text-gray-400" />}
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <InputField
              icon={<CreditCard className="text-gray-400" />}
              label="NIC Number"
              name="nicNumber"
              value={formData.nicNumber}
              onChange={handleChange}
              required
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Address Location</label>
              <MapPicker onAddressSelect={handleAddressSelect} />
              {selectedAddress && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">Selected Address: {selectedAddress}</p>
                  <p className="text-sm text-gray-600">Latitude: {lat}</p>
                  <p className="text-sm text-gray-600">Longitude: {lng}</p>
                </div>
              )}
            </div>
            <InputField
              icon={<Mail className="text-gray-400" />}
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              icon={<Lock className="text-gray-400" />}
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Registration Form</h2>
      <div className="mb-8">
        <ProgressBar currentStep={step} totalSteps={3} />
      </div>
      <form onSubmit={step === 3 ? handleSubmit : nextStep} className="space-y-8">
        {renderStep()}
        <div className="flex justify-between mt-10">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <ChevronLeft className="mr-2" size={20} />
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ml-auto"
            >
              Next
              <ChevronRight className="ml-2" size={20} />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const InputField = ({ icon, label, name, value, onChange, type = "text", required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        placeholder={label}
        required={required}
      />
    </div>
  </div>
);

const ProgressBar = ({ currentStep, totalSteps }) => (
  <div className="relative pt-1">
    <div className="flex mb-2 items-center justify-between">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#4CAF50]">
          Step {index + 1}
        </div>
      ))}
    </div>
    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
      <div
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#4CAF50]"
      ></div>
    </div>
  </div>
);

export default ClientRegisterForm;