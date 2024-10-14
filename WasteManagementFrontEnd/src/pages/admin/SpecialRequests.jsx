import { useState } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SpecialRequests = () => {
  const navigator = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const dummyData = [
    {
      id: 1,
      customer: "John Doe",
      description: "Recycling pickup",
      location: "Downtown",
      status: "Pending",
      schedule: "Next Week",
    },
    {
      id: 2,
      customer: "Jane Smith",
      description: "E-waste collection",
      location: "Suburbs",
      status: "Scheduled",
      schedule: "Tomorrow",
    },
    {
      id: 3,
      customer: "Bob Johnson",
      description: "Composting workshop",
      location: "Community Center",
      status: "Completed",
      schedule: "Last Month",
    },
    {
      id: 4,
      customer: "Alice Brown",
      description: "Green energy consultation",
      location: "Business District",
      status: "Pending",
      schedule: "Next Month",
    },
    {
      id: 5,
      customer: "Charlie Davis",
      description: "Waste audit",
      location: "Industrial Park",
      status: "In Progress",
      schedule: "This Week",
    },
    {
      id: 6,
      customer: "Eva Wilson",
      description: "Sustainability seminar",
      location: "University Campus",
      status: "Scheduled",
      schedule: "Next Week",
    },
    {
      id: 7,
      customer: "Frank Miller",
      description: "Solar panel installation",
      location: "Residential Area",
      status: "Pending",
      schedule: "Next Month",
    },
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
    <div className="flex flex-col h-full bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-6">Special Requests</h2>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
            onClick={() => navigator("/new-special-request")}
          >
            <Plus className="mr-2" size={20} />
            Add Request
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Here"
              className="pl-4 pr-10 py-2 border rounded-full w-64"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Schedule</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((row, index) => (
              <tr key={row.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.customer}</td>
                <td className="px-4 py-2">{row.description}</td>
                <td className="px-4 py-2">{row.location}</td>
                <td className="px-4 py-2">{row.status}</td>
                <td className="px-4 py-2">{row.schedule}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-center items-center">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            className="mr-2 px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`mx-1 px-3 py-1 rounded-full ${
                number + 1 === currentPage
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            className="ml-2 px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialRequests;
