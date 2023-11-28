import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main";
import App from "../../App";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Dashboard from "../../layouts/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserHome from "../../pages/Dashboard/User-Home/UserHome";
import AdminHome from "../../pages/Dashboard/Admin-Home/AdminHome";
import Profile from "../../pages/Dashboard/Profile/Profile";
import AllUsers from "../../pages/Dashboard/All-Users/AllUsers";
import ContentManagement from "../../pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../../pages/Dashboard/AddBlog/AddBlog";
import DonationRequest from "../../pages/Dashboard/CreateDonationRequest/DonationRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      //normal user route
      {
        path: "userHome",
        element: <UserHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create-donation-request",
        element: <DonationRequest />,
      },
      // admin user route
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "content-management",
        element: <ContentManagement />,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog />,
      },
      // admin and volunteer shared route
      {
        path: "volunteerHome",
        element: <AdminHome />,
      },
    ],
  },
]);

export default router;
