/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import districtsData from "../../../assets/districts.json";
import upazilasData from "../../../assets/upazilas.json";
import ToastComponent from "../../../components/ToastComponent";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState("");

  // load districts data
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
    if (user.status === "blocked") {
      return toast.error("You are not permitted for Donation Request");
    }
    const formData = { ...data, status: "pending" };
    console.log(formData);
    try {
      axiosSecure.post("/donationRequests", formData).then((res) => {
        if (res.data.insertedId) {
          toast.success("Request Created successfully");
        }
      });
    } catch (error) {
      console.log(error);
    }
    // Example: sendDonationRequestToAPI(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full pb-4">
          <label className="text-lg font-medium">Requester Name:</label>
          <input
            className="input input-bordered"
            {...register("requesterName")}
            readOnly
            value={user.name || user.displayName}
          />
        </div>
        <div className="flex flex-col w-full pb-4">
          <label className="text-lg font-medium">Requester Email:</label>
          <input
            className="input input-bordered"
            {...register("requesterEmail")}
            readOnly
            value={user.email}
          />
        </div>
        <div className="flex flex-col w-full pb-4">
          <label className="text-lg font-medium">Recipient Name:</label>
          <input
            className="input input-bordered"
            {...register("recipientName", {
              required: "Recipient Name is required",
            })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="district">District</label>
          <select
            className="form-control w-full border p-3 rounded-lg"
            id="district"
            value={selectedDistrict}
            {...register("district", { required: true })}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </select>
          {errors.district && (
            <span className="error">District is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="upazila">Upazila</label>
          <select
            className="form-control w-full border p-3 rounded-lg"
            id="upazila"
            value={selectedUpazila}
            {...register("upazila", { required: true })}
            onChange={(e) => setSelectedUpazila(e.target.value)}
          >
            <option value="">Select Upazila</option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
          {errors.upazila && <span className="error">Upazila is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select
            className="form-control w-full border p-3 rounded-lg"
            id="bloodGroup"
            {...register("bloodGroup", { required: true })}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup && (
            <span className="error">Blood Group is required</span>
          )}
        </div>
        <div className="flex flex-col w-full pb-4">
          <label className="text-lg font-medium">Hospital Name:</label>
          <input
            className="input input-bordered"
            {...register("hospitalName", {
              required: "Hospital Name is required",
            })}
          />
        </div>
        <div className="flex flex-col w-full pb-4">
          <label className="text-lg font-medium">Full Address Line:</label>
          <input
            className="input input-bordered"
            {...register("fullAddress", {
              required: "Full Address is required",
            })}
          />
        </div>
        <div className="flex flex-col w-full pb-4">
          <label className="text-lg font-medium">Donation Date:</label>
          <input
            className="input input-bordered"
            type="date"
            {...register("donationDate", {
              required: "Donation Date is required",
            })}
          />
        </div>
        <div className="flex flex-col pb-4">
          <label className="text-lg font-medium">Donation Time:</label>
          <input
            className="input input-bordered"
            type="time"
            {...register("donationTime", {
              required: "Donation Time is required",
            })}
          />
        </div>
        <div className="flex flex-col w-full pb-4">
          <label className="text-lg font-medium">Request Message:</label>
          <textarea
            className="textarea input-bordered"
            {...register("requestMessage", {
              required: "Request Message is required",
            })}
          />
        </div>
        <button className="btn text-white bg-[#1a1a1a]" type="submit">
          Request Blood Donation
        </button>
      </form>
      <ToastComponent />
    </>
  );
};

export default DonationRequest;
