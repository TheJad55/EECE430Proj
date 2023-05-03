import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import backgroundImage from "../../assets/images/background2.jpeg";
const schema = z.object({
  TeamName: z
    .string()
    .min(2, { message: "Team name must be at least 2 characters long." }),
  TeamManagerUserName: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long." }),
  TeamManagerEmail: z.string().email("Email is invalid."),
  TeamManagerPassword: z.string(),
  TeamManagerFirstname: z.string(),
  TeamManagerLastname: z.string(),
  Country: z.string(),
});

const TeamRegistrationForm = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data, e) => {
    data.GamesWon = 0;
    data.GamesLost = 0;

    try {
      const response = await fetch("http://127.0.0.1:8000/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowSuccessAlert(true);
      } else {
        // Handle error - you can update the state to display an error message if needed
        console.error(`Error submitting data: ${response.status}`);
      }
    } catch (error) {
      // Handle network error
      console.error(`Network error: ${error}`);
    }
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
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl mb-4 text-black">Team Registration</h2>
            <p className="mb-4 text-black">
              Register your basketball team. It's free and only takes a minute.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-5">
                <label htmlFor="teamName">Team Name</label>
                <input
                  id="teamName"
                  type="text"
                  placeholder="Enter team name"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("TeamName")}
                />
                {errors.TeamName && (
                  <p className="text-red-500">{errors.TeamName.message}</p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="teamManagerUserName">Username</label>
                <input
                  id="teamManagerUserName"
                  type="text"
                  placeholder="Enter username"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("TeamManagerUserName")}
                />
                {errors.TeamManagerUserName && (
                  <p className="text-red-500">
                    {errors.TeamManagerUserName.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="teamManagerEmail">Email</label>
                <input
                  id="teamManagerEmail"
                  type="text"
                  placeholder="Enter email address"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("TeamManagerEmail")}
                />
                {errors.TeamManagerEmail && (
                  <p className="text-red-500">
                    {errors.TeamManagerEmail.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="teamManagerPassword">Password</label>
                <input
                  id="teamManagerPassword"
                  type="password"
                  placeholder="Enter password"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("TeamManagerPassword")}
                />
                {errors.TeamManagerPassword && (
                  <p className="text-red-500">
                    {errors.TeamManagerPassword.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="teamManagerFirstname">First Name</label>
                <input
                  id="teamManagerFirstname"
                  type="text"
                  placeholder="Enter first name"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("TeamManagerFirstname")}
                />
                {errors.TeamManagerFirstname && (
                  <p className="text-red-500">
                    {errors.TeamManagerFirstname.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="teamManagerLastname">Last Name</label>
                <input
                  id="teamManagerLastname"
                  type="text"
                  placeholder="Enter last name"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("TeamManagerLastname")}
                />
                {errors.TeamManagerLastname && (
                  <p className="text-red-500">
                    {errors.TeamManagerLastname.message}
                  </p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  type="text"
                  placeholder="Enter country"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("Country")}
                />
                {errors.Country && (
                  <p className="text-red-500">{errors.Country.message}</p>
                )}
              </div>
              {/* Submit Button */}
              <div className="mt-5">
                <button
                  className="w-full bg-orange-500 py-3 text-center text-white transition-transform duration-300 hover:scale-105"
                  type="submit"
                >
                  Register Team
                </button>
              </div>
              {showSuccessAlert && (
                <div
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
                  role="alert"
                >
                  <p className="font-bold">Success!</p>
                  <p>Team registration successful.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistrationForm;
