import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import socialImage from "../../assets/images/LoginReg/social.jpg";

const genderOptions = ["Male", "Female", "Other"];

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." }),
  email: z.string().email("Email is invalid."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters long.",
  }),

  age: z
    .number()
    .min(1, { message: "Age must be at least 1." })
    .max(120, { message: "Age must be less than or equal to 120." }),
  team: z
    .string()
    .min(2, { message: "Team name must be at least 2 characters long." }),
  position: z
    .string()
    .min(2, { message: "Position must be at least 2 characters long." }),
  height: z.number().min(0, { message: "Height must be a positive number." }),
  weight: z.number().min(0, { message: "Weight must be a positive number." }),
  college: z
    .string()
    .min(2, { message: "College name must be at least 2 characters long." }),
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

  const onSubmit1 = async (data, e) => {
    console.log("Submitting data:", data); // Add this line to log the data
    e.preventDefault();
    const { confirmPassword, firstName, lastName, ...filteredData } = data;
    // Update field names and add accountBalance
    filteredData.Firstname = firstName;
    filteredData.Lastname = lastName;
    filteredData.Age = data.age;
    filteredData.Team = data.team;
    filteredData.Position = data.position;
    filteredData.Height = data.height;
    filteredData.Weight = data.weight;
    filteredData.College = data.college;
    filteredData.accountBalance = 0;

    console.log("Submitting data:", filteredData); // Add this line to log the data

    const apiUrl = `http://127.0.0.1:8000/user`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });

      if (response.ok) {
        setShowSuccessAlert(true);
      } else {
        console.error(
          "Error submitting form: ",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAlertDismiss = () => {
    setShowSuccessAlert(false);
  };

  return (
    <div
      className="min-h-screen py-40"
      style={{ backgroundImage: "linear-gradient(115deg, #8B4000, #2C2C2C)" }}
    >
      <div className="container mx-auto scale-100">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${socialImage})` }}
          >
            {" "}
          </div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4 text-black">Register</h2>
            <p className="mb-4 text-black">
              Create your account. It's free and only takes a minute.
            </p>
            <form onSubmit={handleSubmit(onSubmit1)}>
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
              {/* First Name and Last Name */}
              <div className="flex mt-5">
                <div className="w-1/2 mr-2">
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    className="border border-gray-400 py-1 px-2 w-full text-black"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="w-1/2 ml-2">
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    className="border border-gray-400 py-1 px-2 w-full text-black"
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
                  className="border border-gray-400 py-1 px-2 w-full text-black"
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
                  className="border border-gray-400 py-1 px-2 w-full text-black"
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
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Additional input fields */}
              <div className="mt-5">
                <input
                  id="age"
                  type="number"
                  placeholder="Age"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("age", { valueAsNumber: true })}
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>

              <div className="mt-5">
                <input
                  id="team"
                  type="text"
                  placeholder="Team"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("team")}
                />
                {errors.team && (
                  <p className="text-red-500">{errors.team.message}</p>
                )}
              </div>

              <div className="mt-5">
                <input
                  id="position"
                  type="text"
                  placeholder="Position"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("position")}
                />
                {errors.position && (
                  <p className="text-red-500">{errors.position.message}</p>
                )}
              </div>

              <div className="mt-5">
                <input
                  id="height"
                  type="number"
                  placeholder="Height"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("height", { valueAsNumber: true })}
                />
                {errors.height && (
                  <p className="text-red-500">{errors.height.message}</p>
                )}
              </div>

              <div className="mt-5">
                <input
                  id="weight"
                  type="number"
                  placeholder="Weight"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("weight", { valueAsNumber: true })}
                />
                {errors.weight && (
                  <p className="text-red-500">{errors.weight.message}</p>
                )}
              </div>

              <div className="mt-5">
                <input
                  id="college"
                  type="text"
                  placeholder="College"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("college")}
                />
                {errors.college && (
                  <p className="text-red-500">{errors.college.message}</p>
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
              {showSuccessAlert && (
                <div
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
                  role="alert"
                >
                  <p className="font-bold">Success!</p>
                  <p>Registration successful.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
