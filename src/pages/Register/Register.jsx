import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import districtsData from "../../../public/districts.json";
import upazilasData from "../../../public/upazilas.json";

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

  // onsubmit add call firebase and register user and add data to the server
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="error">Email is required</span>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
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
            className="form-control"
            id="avatar"
            onChange={handleAvatarChange}
          />
          {avatarPreview && <img src={avatarPreview} alt="Avatar" />}
        </div>
        <div className="form-group">
          <label htmlFor="bloodGroup">Blood Group</label>
          <select
            className="form-control"
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
            className="form-control"
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
            className="form-control"
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
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
            className="form-control"
            id="confirm_password"
            placeholder="Confirm your password"
            {...register("confirm_password", { required: true, minLength: 6 })}
          />
          {errors.confirm_password && (
            <span className="error">
              Confirm password is required and must match the password
            </span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
