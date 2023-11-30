/* eslint-disable react/prop-types */
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const DonationTable = ({ index, requestData, setUpdateUi }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axiosSecure.put(
        `/donation-requests/${requestData._id}/update-status`,
        {
          status: newStatus,
        }
      );
      if (response.data.modifiedCount > 0) {
        toast.success("Status Updated Successfully");
        setUpdateUi(true);
      }
    } catch (error) {
      console.error("Error updating donation request status:", error);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await axiosSecure.delete(
          `/donation-requests/${requestData._id}/delete`
        );
        if (response.data.deletedCount === 1) {
          Swal.fire(
            "Deleted!",
            "Your donation request has been deleted.",
            "success"
          );
          setUpdateUi(true);
        }
      }
    } catch (error) {
      console.error("Error deleting donation request:", error);
    }
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{requestData?.recipientName}</td>
      <td>
        {requestData?.upazila}, <br /> {requestData?.district}
      </td>
      <td>{requestData?.donationDate}</td>
      <td>{requestData?.donationTime}</td>
      <td>{requestData?.status}</td>
      <td>
        {requestData?.donorName} <br /> {requestData?.donorEmail}
      </td>
      <th>
        {requestData?.status === "inprogress" && (
          <div className="flex flex-col">
            <button
              onClick={() => handleStatusChange("done")}
              className="btn bg-green-600 text-white btn-sm"
            >
              Done
            </button>
            <button
              onClick={() => handleStatusChange("canceled")}
              className="btn bg-[#1a1a1a] text-white btn-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </th>
      {user?.role !== "volunteer" && (
        <>
          <th>
            {requestData?.status !== "done" &&
              requestData?.status !== "canceled" && (
                <Link
                  to={`/dashboard/my-donation-requests/update/${requestData._id}`}
                  className="btn bg-yellow-600 text-white"
                >
                  <span className="flex gap-1">
                    <FaEdit /> Edit
                  </span>
                </Link>
              )}
          </th>
          <th>
            <button
              onClick={handleDeleteRequest}
              className="btn bg-red-600 text-white"
            >
              <span className="flex gap-1">
                <MdOutlineDeleteOutline /> Delete
              </span>
            </button>
          </th>
          <th>
            <Link
              to={`/dashboard/my-donation-requests/${requestData._id}`}
              className="btn bg-blue-600 text-white"
            >
              <span className="flex gap-1">
                <FaRegEye /> View
              </span>
            </Link>
          </th>
        </>
      )}
    </tr>
  );
};

export default DonationTable;
