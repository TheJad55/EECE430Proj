import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const genderOptions = ["", "Male", "Female", "Other"];

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
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
    <div className="container">
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
      <div className="form-wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="form-control"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && <p className="text-danger">{errors.age.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              className="form-control"
              {...register("dob")}
            />
            {errors.dob && <p className="text-danger">{errors.dob.message}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              id="address"
              type="text"
              className="form-control"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-danger">{errors.address.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              className="form-control form-select"
              {...register("gender")}
            >
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-danger">{errors.gender.message}</p>
            )}
          </div>

          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

