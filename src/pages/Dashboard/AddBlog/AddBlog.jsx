/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useState } from "react";
import JoditEditor from "jodit-react";

const AddBlog = () => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    const { title, content, thumbnail } = data;
    const thumbnailImage = thumbnail[0];
    const blogData = { title, content, thumbnailImage };
    console.log(blogData);
    // Example: sendBlogToAPI(data);
  };
  return (
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
      <button className="btn text-white font-medium bg-[#1a1a1a]" type="submit">
        Create Blog
      </button>
    </form>
  );
};

export default AddBlog;
