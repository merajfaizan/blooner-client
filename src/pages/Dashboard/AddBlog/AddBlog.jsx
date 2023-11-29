/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import JoditEditor from "jodit-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const AddBlog = () => {
  const { register, handleSubmit, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const [blog, setBlog] = useState({
    title: "",
    thumbnailImage: "",
    content: "",
    status: "draft",
  });
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [blogUploaded, setBlogUploaded] = useState(false);

  const onSubmit = async (data) => {
    const { title, content, thumbnail } = data;

    try {
      const formData = new FormData();
      formData.append("image", thumbnail[0]);
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGEBB_CLIENT_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setThumbnailImage((prevThumbnailImage) => {
          return data.data.url;
        });
      } else {
        console.error("Image upload failed:", response.statusText);
      }
    } catch (error) {
      console.log(error);
    }

    const blogData = { title, content, thumbnailImage, status: "draft" };
    setBlog(blogData);
  };
  // upload the blog to db after image url is ready
  useEffect(() => {
    if (thumbnailImage && !blogUploaded) {
      const blogData = { ...blog, thumbnailImage };
      try {
        axiosSecure.post("/blogs", blogData).then((res) => {
          if (res.data.insertedId) {
            setBlogUploaded(true);
            swal("Blog Uploaded", "Blog will Publish After Approval", "success")
            navigate("/dashboard/content-management")
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [axiosSecure, blog, blogUploaded, navigate, thumbnailImage]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-2 pb-4 flex flex-col  w-full">
          <label className="text-xl font-medium">Title:</label>
          <input
            className="w-full input input-bordered"
            {...register("title", { required: "Title is required" })}
          />
        </div>
        <div className="px-2 pb-4 flex flex-col">
          <label className="text-xl font-medium">Thumbnail Image:</label>
          <input
            {...register("thumbnail", { required: "Thumbnail is required" })}
            type="file"
            accept="image/*"
          />
        </div>
        <div className="px-2 pb-4">
          <label className="text-xl font-medium">Content:</label>
          <JoditEditor
            onChange={(content) => setValue("content", content)}
            config={{ readonly: false }}
          />
        </div>
        <button
          className="btn text-white font-medium bg-[#1a1a1a]"
          type="submit"
        >
          Create Blog
        </button>
      </form>
    </>
  );
};

export default AddBlog;
