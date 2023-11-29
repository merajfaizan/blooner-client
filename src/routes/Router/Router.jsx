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
import SearchDonor from "../../pages/Search-donor/SearchDonor";
import DonationRequestPublic from "../../pages/DonationRequestPublic/DonationRequestPublic";
import DonationRequestDetail from "../../pages/DonationRequestDetail/DonationRequestDetail";
import Blog from "../../pages/Blogs/Blog";
import BlogDetails from "../../pages/Blogs/BlogDetails";
import AllDonationRequest from "../../pages/Dashboard/AllDonationRequest/AllDonationRequest";
import MyDonationRequest from "../../pages/Dashboard/MyDonationRequest/MyDonationRequest";

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
        path: "search-donors",
        element: <SearchDonor />,
      },
      {
        path: "donation-request",
        element: <DonationRequestPublic />,
      },
      {
        path: "donation-request/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "blogs",
        element: <Blog />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetails />,
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
      {
        path: "my-donation-requests",
        element: <MyDonationRequest />,
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
        path: "all-donation-requests",
        element: <AllDonationRequest />,
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
