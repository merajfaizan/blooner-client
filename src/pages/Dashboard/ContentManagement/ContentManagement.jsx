import { Link } from "react-router-dom";

const ContentManagement = () => {
  return (
    <div className="w-full flex justify-end">
      <Link className="btn" to={"/dashboard/content-management/add-blog"}>Add Blog</Link>
    </div>
  );
};

export default ContentManagement;
