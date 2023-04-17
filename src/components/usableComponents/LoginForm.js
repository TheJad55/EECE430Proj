import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import socialImage from "../../assets/images/LoginReg/social.jpg";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  email: z.string().email("Email is invalid."),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    navigate("/homesignedin");
    console.log(data);
  };

  return (
    <div
      className="min-h-screen py-40"
      style={{ backgroundImage: "linear-gradient(115deg, #2C2C2C, #FFA500)" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${socialImage})` }}
          >
            <h1 className="text-white text-3xl mb-3">Welcome</h1>
            <div>
              <p className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                suspendisse aliquam varius rutrum purus maecenas ac{" "}
                <a href="#" className="text-purple-500 font-semibold">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4 text-black">Login</h2>
            <p className="mb-4 text-black">Sign in to your account.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="border border-gray-400 py-1 px-2 w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="mt-5">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="mt-5">
                <button
                  className="w-full bg-orange-500 py-3 text-center text-white transition-transform duration-300 hover:scale-105"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
