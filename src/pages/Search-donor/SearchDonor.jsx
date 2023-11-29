/* eslint-disable no-unused-vars */
import SearchDonorForm from "../../components/SearchDonorForm";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import DonorCard from "../../components/DonorCard";

const SearchDonor = () => {
  const [donor, setDonor] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/donors").then((res) => {
      setDonor(res.data);
    });
  }, [axiosPublic, setDonor]);

  return (
    <div className="px-5">
      <SearchDonorForm setdonor={setDonor} />
      <hr className="my-5" />
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {donor?.map((donor) => {
          return <DonorCard key={donor._id} donor={donor} />;
        })}
      </div>
      {donor?.length < 1 && (
        <div>
          <h1 className="text-2xl font-medium capitalize text-center my-5">
            there is No donor matching your search
          </h1>
        </div>
      )}
    </div>
  );
};

export default SearchDonor;
