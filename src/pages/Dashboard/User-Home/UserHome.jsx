import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonationTable from "../../../components/DonationTable";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { user } = useAuth();
  const [donationRequests, setDonationRequests] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [updateUi, setUpdateUi] = useState(false);

  useEffect(() => {
    // Make API call to retrieve donation requests for the authenticated user
    axiosSecure
      .get("/donation-requests?limit=3")
      .then((res) => {
        setDonationRequests(res.data.donationRequests);
        setUpdateUi(false);
      })
      .catch((error) => {
        console.error("Error fetching donation requests:", error);
      });
  }, [axiosSecure, updateUi]);

  return (
    <div>
      <p className="text-center text-2xl font-medium">
        hello <strong>{user.name}</strong>, welcome to Dashboard
      </p>
      <div className="mt-4">
        {donationRequests.length > 0 ? (
          <div className="overflow-x-auto mt-10">
            <h1 className="text-3xl font-semibold">Your Donation Requests: </h1>
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Count:</th>
                  <th>Recipient Name</th>
                  <th>Recipient Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Donation Status</th>
                  <th>Donor Information</th>
                  <th>Action</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>View Details</th>
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
            <Link
              className="btn bg-[#1a1a1a] text-white mt-5"
              to={"/dashboard/my-donation-requests"}
            >
              View All
            </Link>
          </div>
        ) : (
          <div className="w-full min-h-[70vh] flex flex-col justify-center items-center">
            <h1 className="text-center text-lg font-medium">
              Currently, You don&apos;t have any donation request, <br /> click
              button below to make donation requests.{" "}
            </h1>
            <Link
              to={"/dashboard/create-donation-request"}
              className="btn bg-[#1a1a1a] text-white mt-4"
            >
              Create Donation Request
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
