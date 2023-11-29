/* eslint-disable react/prop-types */

import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ToastComponent from "./ToastComponent";
import { toast } from "react-toastify";

const AdminBlogCard = ({ blog, setReFetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleAction = (action) => {
    axiosSecure
      .put(`/blogs/${blog._id}`, { action })
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Status Updated");
          setReFetch(true)
        }
      })
      .catch((error) => {
        console.error(`Error ${action}ing blog:`, error);
      });
  };

  return (
    <div className=" rounded overflow-hidden shadow-lg">
      <img
        src={blog.thumbnailImage}
        alt="Blog"
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{blog.title}</div>
        {/* <div dangerouslySetInnerHTML={{ __html: blog.content }}></div> */}
      </div>
      <div className="py-4 flex justify-center items-center gap-2">
        {blog.status === "draft" ? (
          <span className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2">
            Status: Draft
          </span>
        ) : (
          <span className="inline-block bg-green-500 rounded-full px-4 py-2 text-sm font-semibold text-white mr-2">
            Status: Published
          </span>
        )}
        {blog.status === "draft" ? (
          <button
            onClick={() => handleAction("publish")}
            title="click to publish blog"
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Publish
          </button>
        ) : (
          <button
            onClick={() => handleAction("draft")}
            title="click to draft blog"
            className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Draft
          </button>
        )}
        <Link to={`/blog/edit/${blog._id}`}>
          <button
            title="click to edit blog"
            className="bg-blue-500  hover:bg-blue-700 text-white  inline-flex justify-center items-center gap-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <FaEdit /> Edit
          </button>
        </Link>
      </div>
      <ToastComponent />
    </div>
  );
};

export default AdminBlogCard;
