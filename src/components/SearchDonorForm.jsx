/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import districtsData from "../assets/districts.json";
import upazilasData from "../assets/upazilas.json";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonorForm = ({ setdonor }) => {
  const { register, handleSubmit } = useForm();
  const axiosPublic = useAxiosPublic();
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState("");

  // sort districts data
  useEffect(() => {
    const sortedData = districtsData.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setDistricts(sortedData);
  }, []);

  // load upazilas that are matched with district id
  useEffect(() => {
    if (selectedDistrict) {
      const filteredDistrict = districtsData.find(
        (district) => district.name === selectedDistrict
      );
      const filteredUpazilas = upazilasData.filter(
        (upazila) => upazila.district_id === filteredDistrict.id
      );
      setUpazilas(filteredUpazilas);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  const onSubmit = (data) => {
    try {
      const { bloodGroup = '', district = '', upazila = '' } = data;
  
      axiosPublic
        .get("/find-donors", {
          params: {
            bloodGroup,
            district,
            upazila,
          },
        })
        .then((res) => {
          setdonor(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "auto",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ fontWeight: "bold", marginBottom: "5px" }}
          htmlFor="bloodGroup"
        >
          Blood Group
        </label>
        <select
          {...register("bloodGroup", { required: true })}
          defaultValue=""
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
          id="bloodGroup"
        >
          <option value="" disabled hidden>
            Select Blood Group
          </option>
          {bloodGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="font-bold" htmlFor="district">
          District
        </label>
        <select
          className="form-control w-full border p-3 rounded-lg"
          id="district"
          value={selectedDistrict}
          {...register("district")}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mt-5">
        <label className="font-bold" htmlFor="upazila">
          Upazila
        </label>
        <select
          className="form-control w-full border p-3 rounded-lg"
          id="upazila"
          value={selectedUpazila}
          {...register("upazila")}
          onChange={(e) => setSelectedUpazila(e.target.value)}
        >
          <option value="">Select Upazila</option>
          {upazilas.map((upazila) => (
            <option key={upazila.id} value={upazila.name}>
              {upazila.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          marginTop: "20px",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchDonorForm;
