/* eslint-disable react/prop-types */

import { useState } from "react";

const DonationTable = ({ donationRequests }) => {
  console.log(donationRequests);
  const [pageSize, setPageSize] = useState(5);

  // handle per page user change
  const handlePageSize = (e) => {
    setPageSize(e.target.value);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Recipient Name</th>
            <th className="py-2 px-4 border-b">Recipient Location</th>
            <th className="py-2 px-4 border-b">Donation Date</th>
            <th className="py-2 px-4 border-b">Donation Time</th>
            <th className="py-2 px-4 border-b">Donation Status</th>
            <th className="py-2 px-4 border-b">Donor Information</th>
            <th className="py-2 px-4 border-b">Action</th>
            <th className="py-2 px-4 border-b">Edit</th>
            <th className="py-2 px-4 border-b">Delete</th>
            <th className="py-2 px-4 border-b">View</th>
          </tr>
        </thead>
        <tbody>
          {donationRequests?.map((donation) => (
            <tr key={donation._id}>
              <td className="py-2 px-4 border-b">{donation.recipientName}</td>
              <td className="py-2 px-4 border-b">
                {donation.upazila}, {donation.district}
              </td>
              <td className="py-2 px-4 border-b">{donation.donationDate}</td>
              <td className="py-2 px-4 border-b">{donation.donationTime}</td>
              <td className="py-2 px-4 border-b">{donation.status}</td>
              <td className="py-2 px-4 border-b">
                {donation.status === "inprogress" && (
                  <>
                    <div>Name: {donation.donorName}</div>
                    <div>Email: {donation.donorEmail}</div>
                  </>
                )}
              </td>
              {donation.status === "inprogress" ? (
                <td className="py-2 px-4 border-b flex flex-col gap-4">
                  <button className="bg-green-600 text-white font-medium py-2 px-2 rounded-lg">
                    Done
                  </button>
                  <button className="bg-[#1a1a1a] text-white font-medium py-2 px-2 rounded-lg">
                    Cancel
                  </button>
                </td>
              ) : (
                <td></td>
              )}
              <td className="py-2 px-4 border-b">
                <button className="bg-yellow-600 text-white font-medium py-2 px-2 rounded-lg">
                  Edit
                </button>
              </td>
              <td className="py-2  px-4 border-b">
                <button className="bg-red-600 text-white font-medium py-2 px-2 rounded-lg">
                  Delete
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-600 text-white font-medium py-2 px-2 rounded-lg">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
        <th>
              Count:
              <select value={pageSize} onChange={handlePageSize}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </th>
        </tfoot>
      </table>
    </div>
  );
};

export default DonationTable;
