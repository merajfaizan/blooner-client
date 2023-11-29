import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import AdminBlogCard from "../../../components/AdminBlogCard";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [selectedOption, setSelectedOption] = useState("default");
  const [refetch, setReFetch] = useState(false);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    axiosSecure.get(`/blogs?option=${selectedOption}`).then((res) => {
      setBlogs(res.data);
      setReFetch(false);
    });
  }, [axiosSecure, selectedOption, refetch]);

  return (
    <div className="w-full flex flex-col">
      <div className="inline-flex items-center justify-between">
        <div>
          <label htmlFor="select" className="text-gray-600 font-bold mr-1">
            Select Option:
          </label>
          <select
            id="select"
            name="select"
            value={selectedOption}
            onChange={handleChange}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="default">Default</option>
            <option value="draft">Drafts</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <Link
            className="btn bg-[#1a1a1a] text-white"
            to={"/dashboard/content-management/add-blog"}
          >
            Add Blog
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {blogs.length ? (
          blogs?.map((blog) => {
            return (
              <AdminBlogCard
                key={blog._id}
                blog={blog}
                setReFetch={setReFetch}
              />
            );
          })
        ) : (
          <h1 className="text-3xl font-semibold">No blog Published yet</h1>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
