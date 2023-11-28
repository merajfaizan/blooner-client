import { Link, Outlet } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import logo from "../assets/health-care.png";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="w-full p-3 lg:p-0 flex">
          <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
            <MdMenu className="text-4xl" />
          </label>
          <div className="inline-flex justify-center items-center gap-2 w-full lg:hidden">
            <img className="w-8" src={logo} alt="logo" />
            <Link to={"/"} className="text-2xl font-bold text-red-600">
              Blooner
            </Link>
          </div>
        </div>
        <div className="p-3 lg:p-5">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link
              className="text-lg"
              to={
                user.role === "admin"
                  ? "/dashboard/adminHome"
                  : user.role === "volunteer"
                  ? "/dashboard/volunteerHome"
                  : "/dashboard/userHome"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link className="text-lg" to={"/dashboard/profile"}>
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
