import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClientNavigationBar from "../shared/ClientNavigationBar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../../api/axios";
import { useAuth } from "../../context/useAuth";
import Swal from "sweetalert2";

const localizer = momentLocalizer(moment);

const ClientSchedule = () => {
  const {user} = useAuth();
  const [scheduleDateTime, setScheduleDateTime] = useState(new Date());
  const [wasteType, setWasteType] = useState("");
  const [binId, setBinId] = useState(null);
  const [bins, setBins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [events, setEvents] = useState([]);

  const fetchCollectionReq = async () => {
    try {
      const response = await axios.get(`client/collection-request/${user?.userid}`);
      
      
      const transformedEvents = response.data.map(event => ({
        title: event.wasteType || "Waste Collection", 
        start: new Date(event.scheduleDate), 
        end: new Date(event.scheduleDate),   
      }));

      setEvents(transformedEvents);
    } catch (error) {
      console.error("Error fetching collection requests:", error);
    }
  };
  const fetchBins = async () => {
    try {
      const response = await axios.get(`Bins/client/${user?.userid}`); 
      console.log(response.data)
      setBins(response.data);
    } catch (error) {
      console.error("Error fetching bins:", error);
    }
  };

  useEffect(() => {


    fetchBins();
    fetchCollectionReq();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const newRequest = {
      wasteType,
      scheduleDate:scheduleDateTime,
      binId: binId ? parseInt(binId) : null
    };
    
    const response = await axios.post(`client/collection-request/${user?.userid}`,newRequest)
    console.log(`client/collection-request/${user?.userid}`)
    
    if(response.status == 200){
      
      Swal.fire({
        title: "Success!",
        text: "Your Request has been saved!",
        icon: "success"
      });
    }
    fetchCollectionReq();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <ClientNavigationBar selected="schedule" />

      <div className="flex-grow flex flex-col px-8">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Collection Schedule</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Schedule Collection
          </button>
        </div>

        <div className="flex-grow p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "calc(100vh - 150px)" }}
            className="border border-gray-200 rounded-md"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedule a Collection</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Waste Type</label>
                <input
                  type="text"
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Select Date and Time</label>
                <DatePicker
                  selected={scheduleDateTime}
                  onChange={(date) => setScheduleDateTime(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-gray-700">Select Bin</label>
                <select
                  value={binId || ""}
                  onChange={(e) => setBinId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300 appearance-none bg-white"
                >
                  <option value="">Select a Bin</option>
                  {bins.map((bin) => (
                    <option key={bin.id} value={bin.id}>
                      {bin.binType} 
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSchedule;