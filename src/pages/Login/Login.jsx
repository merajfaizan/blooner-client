/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // onsubmit call firebase and login user
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome Back to Blooner! Log in to your account to continue making a difference in the lives of those in need. Your commitment to blood donation is invaluable, and we appreciate your dedication.
            need.
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
              <div className="form-control mt-6">
                <input
                  className="bg-[#1a1a1a] text-white py-2 w-full rounded-lg cursor-pointer"
                  type="submit"
                  value="Login"
                />
              </div>
              <label className="label">
                <Link to={"/register"} className="label-text-alt link link-hover">
                  Don&apos;t have an account? <strong>Register here</strong>
                </Link>
              </label>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
