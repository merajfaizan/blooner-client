/* eslint-disable react/prop-types */
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ToastComponent from "./ToastComponent";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const AdminBlogCard = ({ blog, setReFetch }) => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();

  const handleAction = (action) => {
    if(user.role !== "admin"){
      return toast.warning("You don't have permission to change blog status")
    }
    axiosSecure
      .put(`/blogs/${blog._id}`, { action })
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Status Updated");
          setReFetch(true);
        }
      })
      .catch((error) => {
        console.error(`Error ${action}ing blog:`, error);
      });
  };

  const handleDelete = () => {
    if(user.role !== "admin"){
      return toast.warning("You don't have permission to delete this blog")
    }
    axiosSecure
      .delete(`/blogs/${blog._id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.error("Blog Deleted Successfully");
          setReFetch(true);
        }
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  return (
    <div className=" rounded flex flex-col justify-between overflow-hidden shadow-lg">
      <div>
        <img
          src={blog.thumbnailImage}
          alt="Blog"
          className="w-full h-48 object-cover"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{blog.title}</div>
          {/* <div dangerouslySetInnerHTML={{ __html: blog.content }}></div> */}
        </div>
      </div>
      <div className="py-4 flex flex-col items-center gap-2">
        <div>
          {blog.status === "draft" ? (
            <span className="inline-block bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2">
              Status: Draft
            </span>
          ) : (
            <span className="inline-block bg-green-500 rounded-full px-4 py-2 text-sm font-semibold text-white mr-2">
              Status: Published
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {blog.status === "draft" ? (
            <button
              onClick={() => handleAction("publish")}
              title="click to publish blog"
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline col-span-2"
            >
              Publish
            </button>
          ) : (
            <button
              onClick={() => handleAction("draft")}
              title="click to draft blog"
              className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline col-span-2"
            >
              Unpublish
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
          <button
            onClick={handleDelete}
            title="click to draft blog"
            className="bg-red-700 hover:bg-red-500 inline-flex justify-center items-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <MdOutlineDeleteForever />
            Delete
          </button>
        </div>
      </div>
      <ToastComponent />
    </div>
  );
};

export default AdminBlogCard;
