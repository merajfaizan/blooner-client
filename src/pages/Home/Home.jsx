import { Link } from "react-router-dom";
import banner from "../../assets/blood_banner.jpg";

const Home = () => {
  return (
    <div
      className="hero min-h-screen rounded"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="hero-overlay bg-opacity-60 rounded"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Are you a Blood Donor?</h1>
          <p className="mb-5">
            Connecting Hearts, One Drop at a Time: Join Our Blood Donation
            Community.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-5">
            <Link
              to={"/register"}
              className="w-full text-lg font-bold bg-white text-black px-5 py-2 rounded"
            >
              Join as a Donor
            </Link>
            <Link
              to={"/search"}
              className="w-full text-lg font-bold bg-white text-black px-5 py-2 rounded"
            >
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
