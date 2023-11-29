import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";

/* eslint-disable react/prop-types */
const UserTable = ({ index, userData, setUpdateUi }) => {
  const { _id, avatarUrl, name, email, status, role } = userData;
  const axiosSecure = useAxiosSecure();

  const handleToggleStatus = () => {
    axiosSecure
      .put(`/users/${_id}/toggle-status`)
      .then((res) => {
        if (res.data.modifiedCount) {
          swal("", "User Status Updated", "success");
        }
        setUpdateUi(true);
      })
      .catch((error) => {
        console.error("Error toggling user status:", error);
      });
  };

  const handleToggleRole = (newRole) => {
    axiosSecure
      .put(`/users/${_id}/toggle-role`, { newRole })
      .then((res) => {
        if (res.data.modifiedCount) {
          swal("", "User Role Updated", "success");
        }
        setUpdateUi(true);
      })
      .catch((error) => {
        console.error("Error toggling user role:", error);
      });
  };

  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={avatarUrl} alt="Avatar" />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
            </div>
          </div>
        </td>
        <td>{email}</td>
        <td>{status}</td>
        <th>
          <button
            onClick={handleToggleStatus}
            className={`btn ${
              status === "active" ? " bg-red-600" : "bg-green-600"
            }  text-white btn-md`}
          >
            {status === "active" ? "Block" : "Active"}
          </button>
        </th>
        <th>
          <button
            onClick={() => handleToggleRole("admin")}
            className={`btn ${
              role === "admin"
                ? "disabled cursor-not-allowed text-slate-400"
                : "bg-blue-600 text-white"
            }   btn-md`}
          >
            {role === "admin" ? "Admin" : "Make Admin"}
          </button>
        </th>
        <th>
          <button
            onClick={() => handleToggleRole("volunteer")}
            className={`btn ${
              role === "volunteer"
                ? "disabled cursor-not-allowed text-slate-400"
                : "bg-yellow-600 text-white"
            }   btn-md`}
          >
            {role === "volunteer" ? "volunteer" : "Make volunteer"}
          </button>
        </th>
      </tr>
    </>
  );
};

export default UserTable;
