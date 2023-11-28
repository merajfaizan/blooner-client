/* eslint-disable react/prop-types */
const UserTable = ({ index, userData }) => {
  const { avatarUrl, name, email, status } = userData;
  return (
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
      {status === "block" ? (
        <th>
          <button className="btn btn-md">Active</button>
        </th>
      ) : (
        <th>
          <button className="btn btn-md">Block</button>
        </th>
      )}
      <th>
        <button className="btn btn-md">Make Admin</button>
      </th>
      <th>
        <button className="btn btn-md">Make Volunteer</button>
      </th>
    </tr>
  );
};

export default UserTable;
