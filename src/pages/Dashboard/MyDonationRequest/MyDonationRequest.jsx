import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonationTable from "../../../components/DonationTable";

const MyDonationRequest = () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Make API call to retrieve donation requests for the authenticated user
    axiosSecure
      .get("/donation-requests")
      .then((res) => {
        console.log(res.data);
        setDonationRequests(res.data);
      })
      .catch((error) => {
        console.error("Error fetching donation requests:", error);
      });
  }, [axiosSecure]);
  return (
    <div>
      <DonationTable donationRequests={donationRequests} />
    </div>
  );
};

export default MyDonationRequest;
