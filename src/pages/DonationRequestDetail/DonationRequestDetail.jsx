/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import swal from "sweetalert";

const DonationRequestDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [requestDetails, setRequestDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleDonate = () => {
    setShowModal(true);
  };

  const handleConfirmDonation = () => {
    setShowModal(false);
    const newData = {
      ...requestDetails,
      donorName: user.name,
      donorEmail: user.email,
    };
    const { _id, ...updatedData } = newData;
    try {
      axiosSecure.put(`/donationRequests/${_id}`, updatedData).then((res) => {
        if (res.data.modifiedCount > 0) {
          swal(
            "Thank You, dear Donor",
            "You are assigned for donation.",
            "success"
          );
          navigate("/donation-request");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // load request detail data
  useEffect(() => {
    axiosSecure.get(`/donationRequests/${id}`).then((res) => {
      setRequestDetails(res.data);
    });
  }, [axiosSecure, id]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-md overflow-hidden w-full sm:w-96 md:w-80 lg:w-96 xl:w-80 mx-auto">
        {/* Card Content */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Donation Request Details</h2>
          <p className="text-gray-600 mb-2 font-semibold">
            Recipient Name: {requestDetails.recipientName}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Hospital Name: {requestDetails.hospitalName}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Blood Group: {requestDetails.bloodGroup}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            District: {requestDetails.district}{" "}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Upazila: {requestDetails.upazila}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Donation Date: {requestDetails.donationDate}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Donation Time: {requestDetails.donationTime}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Address: {requestDetails.fullAddress}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Request Message: {requestDetails.requestMessage}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Requester Email: {requestDetails.requesterEmail}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Requester Name: {requestDetails.requesterName}
          </p>
          <p className="text-gray-600 mb-2 font-semibold">
            Status: {requestDetails.status}
          </p>

          <button
            className="bg-[#1a1a1a] text-white py-2 px-4 rounded cursor-pointer"
            onClick={handleDonate}
          >
            Donate
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-bold mb-4">Confirm Donation</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Donor Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3"
                  readOnly
                  value={user?.name || user?.displayName}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Donor Email
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-100 border border-gray-300 rounded py-2 px-3"
                  readOnly
                  value={user?.email}
                />
              </div>
              <button
                type="button"
                className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
                onClick={handleConfirmDonation}
              >
                Confirm Donation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetail;
