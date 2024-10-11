import React, { useState } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const SpecialRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dummyData = [
    { id: 1, customer: 'John Doe', description: 'Recycling pickup', location: 'Downtown', status: 'Pending', schedule: 'Next Week' },
    { id: 2, customer: 'Jane Smith', description: 'E-waste collection', location: 'Suburbs', status: 'Scheduled', schedule: 'Tomorrow' },
    { id: 3, customer: 'Bob Johnson', description: 'Composting workshop', location: 'Community Center', status: 'Completed', schedule: 'Last Month' },
    { id: 4, customer: 'Alice Brown', description: 'Green energy consultation', location: 'Business District', status: 'Pending', schedule: 'Next Month' },
    { id: 5, customer: 'Charlie Davis', description: 'Waste audit', location: 'Industrial Park', status: 'In Progress', schedule: 'This Week' },
    { id: 6, customer: 'Eva Wilson', description: 'Sustainability seminar', location: 'University Campus', status: 'Scheduled', schedule: 'Next Week' },
    { id: 7, customer: 'Frank Miller', description: 'Solar panel installation', location: 'Residential Area', status: 'Pending', schedule: 'Next Month' },
  ];

  // Filter data based on search term
  const filteredData = dummyData.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      

        {/* Main content */}
        <div className="flex-1 p-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Special Requests</h2>
          </div>

          <div className="mb-4 flex justify-between">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center">
              <Plus className="mr-2" size={20} />
              Add Request
            </button>
          </div>

          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "ID",
                  "Customer",
                  "Description",
                  "Location",
                  "Status",
                  "Schedule",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.length == 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                  >
                    No requests found
                  </td>
                </tr>
              ) : (
                currentItems.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {row.customer}
                    </td>
                    <td className="px-6 py-4">{row.description}</td>
                    <td className="px-6 py-4">{row.location}</td>
                    <td className="px-6 py-4">{row.status}</td>
                    <td className="px-6 py-4">{row.schedule}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="mt-4 flex justify-center">
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    number + 1 === currentPage
                      ? "z-10 bg-green-50 border-green-500 text-green-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
  );
};

export default SpecialRequests;
