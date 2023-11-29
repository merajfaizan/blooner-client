import useAuth from "../../../hooks/useAuth";
import { FaUsers } from "react-icons/fa";
import { RiRefund2Line } from "react-icons/ri";
import { BiSolidDonateBlood } from "react-icons/bi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState([]);
  const [donationRequest, setDonationRequest] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setAllUsers(res.data.totalCount));
    axiosSecure
      .get("/donationRequests")
      .then((res) => setDonationRequest(res.data));
  }, [axiosSecure]);
  return (
    <div>
      <p className="text-center text-2xl font-medium">
        hello <strong>{user.name}</strong>, welcome to Dashboard
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
        <div className="flex flex-col justify-center items-center py-3 bg-green-200 rounded-lg">
          <FaUsers className="text-5xl" />{" "}
          <h1 className="text-lg font-medium">
            Total Users: {allUsers}
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center py-3 bg-red-200 rounded-lg">
          <BiSolidDonateBlood className="text-5xl" />{" "}
          <h1 className="text-lg font-medium text-center">
            Total Blood Donation <br /> Requests: {donationRequest.length}
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center py-3 bg-yellow-200 rounded-lg">
          <RiRefund2Line className="text-5xl" />{" "}
          <h1 className="text-lg font-medium">
            Total funding&apos;s: <span>1000</span>$
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
