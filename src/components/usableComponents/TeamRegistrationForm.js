import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import backgroundImage from "../../assets/images/background2.jpeg";

const teamColors = [
  { value: "Red", label: "Red", hex: "#FF0000" },
  { value: "Blue", label: "Blue", hex: "#0000FF" },
  { value: "Green", label: "Green", hex: "#008000" },
  { value: "Yellow", label: "Yellow", hex: "#FFFF00" },
  { value: "Orange", label: "Orange", hex: "#FFA500" },
  { value: "Purple", label: "Purple", hex: "#800080" },
];

const schema = z.object({
  teamName: z
    .string()
    .min(2, { message: "Team name must be at least 2 characters long." }),
  coachName: z
    .string()
    .min(2, { message: "Coach name must be at least 2 characters long." }),
  email: z.string().email("Email is invalid."),
  phoneNumber: z.string(),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." }),
  teamColor: z
    .string()
    .refine((value) => teamColors.some((color) => color.name === value), {
      message: "Invalid team color option.",
    }),
  coachId: z.string().refine((value) => /^\d{9}$/.test(value), {
    message: "Coach ID must be exactly 9 digits long.",
  }),
});

const RegistrationForm = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [selectedColor, setSelectedColor] = useState(null);

  const onSubmit1 = (data, e) => {
    console.log(data);
    setShowSuccessAlert(true);
  };

  const handleAlertDismiss = () => {
    setShowSuccessAlert(false);
  };
  const handleColorChange = (selectedOption) => {
    setSelectedColor(selectedOption);
    setValue("teamColor", selectedOption.value);
  };

  // Register the teamColor field
  register("teamColor");

  const colorStyles = {
    option: (provided, state) => ({
      ...provided,
      paddingLeft: "2rem",
    }),
    singleValue: (provided) => {
      const color = teamColors.find(
        (color) => color.value === watch("teamColor")
      );
      return {
        ...provided,
        paddingLeft: "2rem",
      };
    },
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
            <form onSubmit={handleSubmit(onSubmit1)}>
              {/* Coach ID */}
              <div className="mt-5">
                <input
                  id="coachId"
                  type="text"
                  placeholder="Coach ID"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("coachId")}
                />
                {errors.coachId && (
                  <p className="text-red-500">{errors.coachId.message}</p>
                )}
              </div>
              {/* Team Name */}
              <div className="mt-5">
                <input
                  id="teamName"
                  type="text"
                  placeholder="Team Name"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("teamName")}
                />
                {errors.teamName && (
                  <p className="text-red-500">{errors.teamName.message}</p>
                )}
              </div>
              {/* Team Color */}
              <div className="mt-5">
                <Select
                  value={selectedColor}
                  options={teamColors}
                  styles={colorStyles}
                  onChange={handleColorChange}
                  placeholder="Select Team Color"
                  formatOptionLabel={(data) => (
                    <div>
                      {data.label}
                      <span
                        style={{
                          display: "inline-block",
                          marginLeft: "1rem",
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: data.hex,
                          borderRadius: "50%",
                        }}
                      ></span>
                    </div>
                  )}
                />
                {errors.teamColor && (
                  <p className="text-red-500">{errors.teamColor.message}</p>
                )}
              </div>
              {/* Coach Name */}
              <div className="mt-5">
                <input
                  id="coachName"
                  type="text"
                  placeholder="Coach Name"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("coachName")}
                />
                {errors.coachName && (
                  <p className="text-red-500">{errors.coachName.message}</p>
                )}
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

              {/* Phone Number */}
              <div className="mt-5">
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="mt-5">
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  className="border border-gray-400 py-1 px-2 w-full text-black"
                  {...register("address")}
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
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

export default RegistrationForm;
