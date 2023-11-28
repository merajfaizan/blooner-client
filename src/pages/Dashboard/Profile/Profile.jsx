/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { toast } from "react-toastify";
import districtsData from "../../../assets/districts.json";
import upazilasData from "../../../assets/upazilas.json";
import useAuth from "../../../hooks/useAuth";
import ToastComponent from "../../../components/ToastComponent";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(user?.district);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState(user?.upazila);
  const [userInfo, setUserInfo] = useState(user);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.name || user?.displayName,
      email: user?.email,
      bloodGroup: user?.bloodGroup,
      district: selectedDistrict,
      upazila: selectedUpazila,
    },
  });

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

  const onSubmit = async (data) => {
    setIsUpdating(true);
    const { name, bloodGroup, district, upazila } = data;
    const updatedData = { ...userInfo, name, bloodGroup, district, upazila };
    const { _id, ...newData } = updatedData;
    try {
      axiosSecure.put(`/users`, newData).then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("information Updated successfully");
        }
        setIsUpdating(false);
      });
    } catch (errors) {
      console.log(errors);
      setIsUpdating(false);
    }
  };

  const handleReset = () => {
    setSelectedDistrict(user.district);
    setSelectedUpazila(user.upazila);
    reset();
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-3xl  text-center font-medium pt-4">
              Profile Information
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control w-full input input-bordered"
                  id="name"
                  placeholder="Enter your name"
                  {...register("name", { required: true })}
                />
                {errors.name && <span className="error">Name is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  disabled
                  className="form-control w-full input input-bordered"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="error">Email is required</span>
                )}
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
                {errors.upazila && (
                  <span className="error">Upazila is required</span>
                )}
              </div>
              <div className="form-control mt-6">
                <button
                  className={`bg-[#1a1a1a] inline-flex justify-center items-center gap-2 text-white py-2 w-full rounded-lg cursor-pointer`}
                  type="submit"
                >
                  Update Profile{" "}
                  {isUpdating && (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
                </button>
              </div>
            </form>
            <div className="px-8">
              <button
                className="bg-[#fafafa] border border-black mb-5 text-black py-2 w-full rounded-lg cursor-pointer"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <ToastComponent />
      </div>
    </>
  );
};

export default Profile;
