import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonationTable from "../../../components/DonationTable";
import { ToastContainer } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const AllDonationRequest = () => {
  const { user } = useAuth();
  const [donationRequests, setDonationRequests] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState("all");
  const axiosSecure = useAxiosSecure();
  const [updateUi, setUpdateUi] = useState(false);

  useEffect(() => {
    // Make API call to retrieve donation requests for the authenticated user
    axiosSecure
      .get(
        `/admin/donation-requests?page=${page}&limit=${limit}&status=${status}`
      )
      .then((res) => {
        setTotalCount(res.data.totalCount);
        setDonationRequests(res.data.donationRequests);
        setUpdateUi(false);
      })
      .catch((error) => {
        console.error("Error fetching donation requests:", error);
      });
  }, [axiosSecure, limit, page, status, updateUi]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset page to 1 when changing the limit
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1); // Reset page to 1 when changing the status
  };

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(totalCount / limit);

    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${page === i ? "btn-active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              Count:
              <select
                className="border rounded"
                value={limit}
                onChange={(e) => handleLimitChange(e.target.value)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </th>
            <th>Recipient Name</th>
            <th>Recipient Location</th>
            <th>Donation Date</th>
            <th>Donation Time</th>
            <th>
              <select
                className="border rounded"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option className="font-medium" value="all">
                  All
                </option>
                <option className="font-medium" value="pending">
                  Pending
                </option>
                <option className="font-medium" value="inprogress">
                  Inprogress
                </option>
                <option className="font-medium" value="done">
                  Done
                </option>
                <option className="font-medium" value="canceled">
                  Canceled
                </option>
              </select>
            </th>
            <th>Donor Information</th>
            <th>Action</th>
            {user?.role !== "volunteer" && (
              <>
                <th>Edit</th>
                <th>Delete</th>
                <th>View Details</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {donationRequests?.map((request, index) => {
            return (
              <DonationTable
                key={request._id}
                index={index}
                requestData={request}
                setUpdateUi={setUpdateUi}
              />
            );
          })}
        </tbody>
      </table>
      <div className="join flex items-center mt-5">{generatePageNumbers()}</div>
      <ToastContainer />
    </div>
  );
};

export default AllDonationRequest;
