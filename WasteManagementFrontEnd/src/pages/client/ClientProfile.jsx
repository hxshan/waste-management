import React, { useEffect, useState } from 'react';
import ClientNavigationBar from '../shared/ClientNavigationBar';
import ClientEdit from './ClientEdit';
import axios from '../../api/axios';
import MapPicker from '../../components/MapPicker';
import { UserCircle, MapPin, Phone, CreditCard, Key , Mail } from 'lucide-react';
import PasswordReset from './PasswordReset';


const ClientProfile = () => {
  const userID = "89613071-bfa1-4de7-b993-d6ef1c6d2fe6";
  const [userDetails, setUserDetails] = useState({
    firstName: 'loading..',
    middleName: 'loading..',
    lastName: 'loading..',
    nic: 'loading..',
    email : 'loading...',
    phoneNumber: 'loading..',
    address: 'loading..',
    addressLongitude: 0,
    addressLatitude: 0
  });
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenReset , setIsOpenReset] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/client/${userID}`);
      console.log(response)
      if (response.status === 200) {
        setUserDetails(response.data);
      } else {
        throw new Error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const Refresh = () =>{
    setIsOpenEdit(false);
    setIsOpenReset(false);

    fetchUserDetails();
  }


  useEffect(() => {
    fetchUserDetails();
  }, []);

  const toggleEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  };

  const handleResetPassword = () => {
    // Implement password reset logic here
    console.log('Password reset requested');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ClientNavigationBar selected="profile" />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-6">
            <h2 className="text-3xl font-bold">Profile Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoItem icon={<UserCircle />} label="First Name" value={userDetails.firstName} />
                <InfoItem icon={<UserCircle />} label="Middle Name" value={userDetails.middleName} />
                <InfoItem icon={<UserCircle />} label="Last Name" value={userDetails.lastName} />
                <InfoItem icon={<Mail />} label="Email" value={userDetails.email} />
                <InfoItem icon={<CreditCard />} label="NIC" value={userDetails.nic} />
                <InfoItem icon={<Phone />} label="Phone Number" value={userDetails.phoneNumber} />
                <InfoItem icon={<MapPin />} label="Address" value={userDetails.address} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-2">Location</h3>
                {userDetails.addressLatitude !== 0 ? (
                  <MapPicker
                    latitude={userDetails.addressLatitude}
                    longitude={userDetails.addressLongitude}
                    showTextfield={false}
                  />
                ) : (
                  <p className="text-gray-500 italic">No location data available</p>
                )}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 flex items-center"
                onClick={toggleEdit}
              >
                <UserCircle className="mr-2" size={20} />
                Edit Profile
              </button>
              <button
                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300 flex items-center"
                onClick={()=>{setIsOpenReset(!isOpenReset)}}
              >
                <Key className="mr-2" size={20} />
                Reset Password
              </button>
            </div>
          </div>
        </div>
        <ClientEdit
          isOpen={isOpenEdit}
          ToggleOpen={toggleEdit}
          clientData={userDetails}
          Refresh={Refresh}
          userID={userID}
        />
        <PasswordReset isOpen={isOpenReset} ToggleOpen={()=>{setIsOpenReset(!isOpenReset)}} userID={userID} Refresh={Refresh}/>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="text-blue-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

export default ClientProfile;