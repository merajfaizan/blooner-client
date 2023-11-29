import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserTable from "../../../components/UserTable";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [updateUi, setUpdateUi] = useState(false);

  // handle status change
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setCurrentPage(1);
  };
  // handle per page user change
  const handlePageSize = (e) => {
    setPageSize(e.target.value);
  };

  useEffect(() => {
    axiosSecure
      .get(
        `/users?options=${selectedOption}&page=${currentPage}&pageSize=${pageSize}`
      )
      .then((res) => {
        setAllUsers(res.data.data);
        setTotalCount(res.data.totalCount);
        setUpdateUi(false);
      })
      .catch((err) => console.log(err));
  }, [axiosSecure, currentPage, pageSize, selectedOption, updateUi]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              Count:
              <select value={pageSize} onChange={handlePageSize}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </th>
            <th>Avater & Name</th>
            <th>E-mail</th>
            <th>
              <select value={selectedOption} onChange={handleChange}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </th>
            <th>Action</th>
            <th>Permission</th>
            <th>Permission</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user, index) => {
            return (
              <UserTable
                key={user._id}
                index={index}
                userData={user}
                setUpdateUi={setUpdateUi}
              />
            );
          })}
        </tbody>
      </table>
      <div className="join flex justify-center items-center mt-5">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default AllUsers;
