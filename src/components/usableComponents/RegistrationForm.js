import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import socialImage from "../../assets/images/LoginReg/social.jpg";

const genderOptions = ["Male", "Female", "Other"];

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." }),
  age: z
    .number({ invalid_type_error: "Age field is required." })
    .min(18, { message: "You must be at least 18 years old" }),
  email: z.string().email("Email is invalid."),
  dob: z.string().refine((dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const year1900 = new Date("1900-01-01");
    return !isNaN(date.valueOf()) && date <= currentDate && date >= year1900;
  }, "Date of birth is invalid."),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),
  gender: z
    .union([z.enum(genderOptions), z.string().nonempty()])
    .refine((value) => genderOptions.includes(value), {
      message: "Invalid gender option.",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters long.",
  }),
});

schema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

const RegistrationForm = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setShowSuccessAlert(true);
  };

  const handleAlertDismiss = () => {
    setShowSuccessAlert(false);
  };

  return (
    <div
      className="min-h-screen py-40"
      style={{ backgroundImage: "linear-gradient(115deg, #2C2C2C, #FFA500)" }}
    >
      <div className="container mx-auto scale-125">
        {showSuccessAlert && (
          <div
            className="alert alert-success alert-dismissible fade show mt-3"
            role="alert"
          >
            Form submitted successfully!
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={handleAlertDismiss}
            ></button>
          </div>
        )}
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
            <h2 className="text-3xl mb-4 text-black">Register</h2>
            <p className="mb-4 text-black">
              Create your account. It's free and only takes a minute.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* First Name and Last Name */}
              <div className="mt-5 flex">
                {/* First Name */}
                <div className="w-1/2 pr-2">
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className="border border-gray-400 py-1 px-2 w-full"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="w-1/2 pl-2">
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="border border-gray-400 py-1 px-2 w-full"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
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

              {/* Password */}
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

              {/* Confirm Password */}
              <div className="mt-5">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-gray-400 py-1 px-2 w-full"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="mt-5">
                <input
                  id="dob"
                  type="date"
                  placeholder="Date of Birth"
                  className="border border-gray-400 py-1 px-2 w-full"
                  {...register("dob")}
                />
                {errors.dob && (
                  <p className="text-red-500">{errors.dob.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="mt-5">
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  className="border border-gray-400 py-1 px-2 w-full"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>

              {/* Gender */}
              <div className="mt-5">
                <select
                  id="gender"
                  className="border border-gray-400 py-1 px-2 w-full"
                  {...register("gender")}
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="text-red-500">{errors.gender.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-5">
                <button
                  className="w-full bg-orange-500 py-3 text-center text-white transition-transform duration-300 hover:scale-105"
                  type="submit"
                >
                  Register Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
