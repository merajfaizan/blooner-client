import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonationTable from "../../../components/DonationTable";
import { Link } from "react-router-dom";

const UserHome = () => {
  const { user } = useAuth();
  const [donationRequests, setDonationRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Make API call to retrieve donation requests for the authenticated user
    axiosSecure
      .get("/donation-requests?limit=3")
      .then((res) => {
        setDonationRequests(res.data);
      })
      .catch((error) => {
        console.error("Error fetching donation requests:", error);
      });
  }, [axiosSecure]);

  return (
    <div>
      <p className="text-center text-2xl font-medium">
        hello <strong>{user.name}</strong>, welcome to Dashboard
      </p>
      <div className="mt-4">
        {donationRequests.length > 0 ? (
          <>
            <DonationTable donationRequests={donationRequests} />
            <Link
              className="btn bg-[#1a1a1a] text-white mt-5"
              to={"/dashboard/my-donation-requests"}
            >
              View All
            </Link>
          </>
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
