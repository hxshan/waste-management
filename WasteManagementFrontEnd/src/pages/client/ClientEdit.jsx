import React, { useEffect, useState } from 'react';
import { X, Save } from 'lucide-react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from '../../api/axios';


const ClientEdit = ({ isOpen, ToggleOpen, clientData , Refresh , userID}) => {


  const [userDetails, setUserDetails] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    nic: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (clientData) {
      setUserDetails({
        firstName: clientData.firstName,
        middleName: clientData.middleName,
        lastName: clientData.lastName,
        email: clientData.email,
        nic: clientData.nic,
        phoneNumber: clientData.phoneNumber,
      });
    }
  }, [clientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`account/updateclient/${userID}`, {
        firstName: userDetails.firstName,
        middleName: userDetails.middleName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
      });
  
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully!',
          icon: 'success',
        }).then(() => {
          Refresh();
        });
      } else {
        throw new Error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Update error:', error);
  
      let errorMessage = 'Failed to update profile. Please try again.';
  
      // Check if the error response has a message from the server
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'User not found. Please check your account details.';
        } else if (error.response.status === 400) {
          if (error.response.data === "Email is already in use by another account.") {
            errorMessage = 'This email is already associated with another account. Please use a different email.';
          } else {
            errorMessage = error.response.data || 'Invalid input. Please check your details.';
          }
        }
      }
  
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Edit Profile</h1>
          <button onClick={ToggleOpen} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" name="firstName" value={userDetails.firstName} onChange={handleChange} />
          <InputField label="Middle Name" name="middleName" value={userDetails.middleName} onChange={handleChange} />
          <InputField label="Last Name" name="lastName" value={userDetails.lastName} onChange={handleChange} />
          <InputField label="Email" name="email" value={userDetails.email} onChange={handleChange} />
          <InputField label="NIC" name="nic" value={userDetails.nic} readOnly />
          <InputField label="Phone Number" name="phoneNumber" value={userDetails.phoneNumber} onChange={handleChange} />
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
            <Save size={18} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, readOnly = false }) => (
  <div className="flex flex-col">
    <label className="font-semibold mb-1 text-gray-700">{label}</label>
    <input
      type="text"
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

export default ClientEdit;