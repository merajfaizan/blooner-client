/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog._id}`}>
      <div className="max-w-md mx-auto my-8 bg-white rounded-md overflow-hidden shadow-lg">
        <img
          className="w-full h-48 object-cover object-center"
          src={blog.thumbnailImage}
          alt={blog.title}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{blog.title}</div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
