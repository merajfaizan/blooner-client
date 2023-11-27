import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import districtsData from "../../assets/districts.json";
import upazilasData from "../../assets/upazilas.json";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
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

  // handle avatar input
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageURL = URL.createObjectURL(file);
      setAvatar(file);
      setAvatarPreview(imageURL);
    }
  };

  // onsubmit call firebase and register user and add data to the server
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Welcome to Blooner, where every registration is a step towards
              saving lives. By becoming a registered donor, you join a community
              of compassionate individuals committed to making a difference.
              Your willingness to donate blood can make a profound impact on
              those in need.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control w-full input input-bordered"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="error">Email is required</span>
                )}
              </div>
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
                <label htmlFor="avatar">Avatar</label>
                <input
                  type="file"
                  className="form-control w-full"
                  id="avatar"
                  onChange={handleAvatarChange}
                />
                {avatarPreview && (
                  <img className="w-20 h-20" src={avatarPreview} alt="Avatar" />
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
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control w-full input input-bordered"
                  id="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && (
                  <span className="error">
                    Password is required and must be at least 6 characters long
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control w-full input input-bordered"
                  id="confirm_password"
                  placeholder="Confirm your password"
                  {...register("confirm_password", {
                    required: true,
                    minLength: 6,
                  })}
                />
                {errors.confirm_password && (
                  <span className="error">
                    Confirm password is required and must match the password
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  className="bg-[#1a1a1a] text-white py-2 w-full rounded-lg cursor-pointer"
                  type="submit"
                  value="Register"
                />
              </div>
              <label className="label">
                <Link to={"/login"} className="label-text-alt link link-hover">
                  Already have an account? <strong>Login here</strong>
                </Link>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
