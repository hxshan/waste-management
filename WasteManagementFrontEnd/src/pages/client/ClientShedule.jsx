import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ClientNavigationBar from '../shared/ClientNavigationBar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ClientSchedule = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([
    {
      title: 'Meeting with John',
      start: new Date(2024, 9, 15, 10, 0), // October 15, 2024, 10:00 AM
      end: new Date(2024, 9, 15, 11, 0), // October 15, 2024, 11:00 AM
    },
    {
      title: 'Project Deadline',
      start: new Date(2024, 9, 20, 17, 0), // October 20, 2024, 5:00 PM
      end: new Date(2024, 9, 20, 18, 0), // October 20, 2024, 6:00 PM
    },
  ]);

  const handleAddSchedule = () => {
    const newEvent = {
      title: description,
      start: new Date(startDate.setHours(time.split(':')[0], time.split(':')[1])),
      end: new Date(startDate.setHours(time.split(':')[0], time.split(':')[1]) + 3600000), // 1 hour duration
    };
    setEvents([...events, newEvent]);
    console.log('Schedule added:', { startDate, time, description });
    // Reset form fields
    setStartDate(new Date());
    setTime('');
    setDescription('');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ClientNavigationBar selected="schedule" />

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 space-x-6">
        {/* Left Column: Schedule an Event */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Schedule an Event</h2>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-gray-700">Select Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-gray-700">Select Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2 text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
                rows="4"
                placeholder="Enter event description..."
              />
            </div>
            <button
              onClick={handleAddSchedule}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Add Schedule
            </button>
          </div>
        </div>

        {/* Right Column: Calendar */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Schedule</h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            className="border border-gray-200 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientSchedule;