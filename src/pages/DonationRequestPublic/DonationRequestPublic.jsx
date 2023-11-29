import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DonationRequestCard from "../../components/DonationRequestCard";

const DonationRequestPublic = () => {
  const axiosPublic = useAxiosPublic();
  const [pendingRequests, setPendingRequests] = useState([]);

  // load all pending requests
  useEffect(() => {
    axiosPublic.get("/pending-requests").then((res) => {
      setPendingRequests(res.data);
    });
  }, [axiosPublic]);
  return (
    <div className="bg-[#fafafa] p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {pendingRequests?.map((request) => {
        return <DonationRequestCard key={request._id} requestInfo={request} />;
      })}
    </div>
  );
};

export default DonationRequestPublic;
