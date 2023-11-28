import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserTable from "../../../components/UserTable";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/users").then((res) => setAllUsers(res.data));
  }, [axiosSecure]);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Count:</th>
            <th>Avater & Name</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Action</th>
            <th>Permission</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => {
            return <UserTable key={user._id} index={index} userData={user} />;
          })}
        </tbody>
      </table>
      <div className="join flex justify-center items-center mt-5">
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-active">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button>
      </div>
    </div>
  );
};

export default AllUsers;
