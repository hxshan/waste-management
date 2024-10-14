import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from '../../api/axios';


const PasswordReset = ({ isOpen, ToggleOpen , userID , Refresh}) => {

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const handleSave = async () => {
    try {
      const response = await axios.put(`account/change-password/${userID}`, {
        oldPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Password changed successfully!",
          icon: "success",
        });
        // Reset the fields after submission
        setPasswords({
          currentPassword: '',
          newPassword: '',
        });
        Refresh();
      }
    } catch (error) {
      console.error("Password change error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data || "Failed to change password. Please try again.",
        icon: "error",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
          <button onClick={ToggleOpen} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-6">
          <InputField
            label="Current Password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            type="password"
          />
          <InputField
            label="New Password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={ToggleOpen}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300 flex items-center"
          >
            <X size={18} className="mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
          >
            <Lock size={18} className="mr-2" />
            Save Password
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = 'text', readOnly = false }) => (
  <div className="flex flex-col">
    <label className="font-semibold mb-1 text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        readOnly ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      }`}
    />
  </div>
);

export default PasswordReset;