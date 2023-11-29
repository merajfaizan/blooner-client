/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const DonationRequestCard = ({ requestInfo }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden w-full mx-auto">
      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{requestInfo.requesterName}</h2>
        <h2 className="text-xl font-bold mb-2">{requestInfo.bloodGroup}</h2>
        <p className="text-gray-600 mb-2">district: {requestInfo.district}</p>
        <p className="text-gray-600 mb-2">upazila: {requestInfo.upazila}</p>
        <p className="text-gray-600 mb-2">Date: {requestInfo.donationDate}</p>
        <p className="text-gray-600 mb-2">Time: {requestInfo.donationTime}</p>
        <Link to={`/donation-request/${requestInfo._id}`}>
          <button className="bg-[#1a1a1a] text-white py-2 px-4 rounded cursor-pointer">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DonationRequestCard;
