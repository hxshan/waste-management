import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SpecialRequests = () => {
  const navigator = useNavigate();
  const [specialRequests, setSpecialRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('special-request/all');
        console.log("API Response:", response.data);
        setSpecialRequests(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter data based on search term
  const filteredData = specialRequests.filter((item) =>
    Object.values(item).some((val) =>
      val ? val.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
    )
  );

  // Pagination calculation
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
                setCurrentPage(1); // Reset to first page on search
              }}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Waste Type</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Contact No</th>
              <th className="px-4 py-2 text-left">Special Instructions</th>
              <th className="px-4 py-2 text-left">Schedule Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No special requests found.
                </td>
              </tr>
            ) : (
              currentItems.map((row, index) => (
                <tr
                  key={row.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.wasteType || "N/A"}</td>
                  <td className="px-4 py-2">{row.quantity || "N/A"}</td>
                  <td className="px-4 py-2">{row.description || "N/A"}</td>
                  <td className="px-4 py-2">{row.contactNo || "N/A"}</td>
                  <td className="px-4 py-2">{row.specialInstructions || "N/A"}</td>
                  <td className="px-4 py-2">{new Date(row.scheduleDate).toLocaleString() || "N/A"}</td>
                  <td className="px-4 py-2">{row.status}</td>
                  <td className="px-4 py-2">{row.location || "N/A"}</td>
                </tr>
              ))
            )}
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
