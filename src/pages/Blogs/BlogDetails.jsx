import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [blog, setBlog] = useState();

  useEffect(() => {
    axiosPublic.get(`/blogs/${id}`).then((res) => {
      setBlog(res.data);
    });
  }, [axiosPublic, id]);

  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-md overflow-hidden shadow-lg">
      <img
        className="w-full h-48 object-cover object-center"
        src={blog?.thumbnailImage}
        alt={blog?.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{blog?.title}</div>
        <div
          className="text-gray-700 text-base"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
