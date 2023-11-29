import BlogCard from "../../components/BlogCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    axiosPublic.get("/blogs/all").then((res) => {
      setBlogs(res.data);
    });
  }, [axiosPublic]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
      {blogs?.map((blog) => {
        return <BlogCard key={blog._id} blog={blog} />;
      })}
    </div>
  );
};

export default Blog;
