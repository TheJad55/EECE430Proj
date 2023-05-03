import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import socialImage from "../../assets/images/LoginReg/social.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters long.",
  }),
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (result.access_token) {
        sessionStorage.setItem("access_token", result.access_token);
        navigate("/homesignedin");
      } else if (result.error === "Invalid credentials") {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("Unknown error occurred");
      }
    } catch (error) {
      setErrorMessage("Error connecting to the server");
    }
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
          ></div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4 text-black">Login</h2>
            <p className="mb-4 text-black">Sign in to your account.</p>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5">
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}
              </div>
              <div className="mt-5">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
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
