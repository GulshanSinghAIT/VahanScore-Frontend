"use client"
import React, { useState } from "react";

const Userdetails = ({ formdata, setformdata, page, setpage }) => {

    
  const [errors, seterrors] = useState({});

  const sexOption = [
    { label: "Choose Gender", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const validateForm = () => {
    let newerrors = {};

    // Validate First Name
    if (!formdata.firstname) {
      newerrors.firstname = "First name is required";
    }

    // Validate Last Name
    if (!formdata.lastname) {
      newerrors.lastname = "Last name is required";
    }

    // Validate DOB
    if (!formdata.DOB) {
      newerrors.DOB = "Date of Birth is required";
    }

    // Validate Gender
    if (formdata.Sex === "") {
      newerrors.Sex = "You must select a gender";
    }

    // Validate Email
    if (!formdata.Email) {
        newerrors.Email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formdata.Email)) {
        newerrors.Email = "Invalid email format";
      }

    // Validate Phone Number
    if (!formdata.phone) {
      newerrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formdata.phone)) {
      newerrors.phone = "Phone number must be 10 digits";
    }

    seterrors(newerrors);
    return Object.keys(newerrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setpage((current) => current + 1);
    } else {
      console.log("Form Validation Failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  return (
    <div className="max-w-[97%] mx-auto">
        <div className="mt-10 mustica md:ml-[2em] xl:ml-[8em] max-w-[55em]">
          <h1 className="text-white text-xl md:text-[2em]">
            Let’s get started with your{" "}
            <span className="text-[#278AE1]">info.</span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 mt-7 text-white"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full">
                <input
                  className="bg-[#fff]/30 w-full py-[0.6em] md:py-[0.7em] rounded-full px-5"
                  placeholder="First Name"
                  type="text"
                  name="firstname"
                  value={formdata.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && (
                  <span className="text-red-400 ml-5 text-sm">
                    {errors.firstname}
                  </span>
                )}
              </div>
              <div className="w-full">
                <input
                  className="bg-[#fff]/30 w-full py-[0.6em] md:py-[0.7em] rounded-full px-5"
                  placeholder="Last Name"
                  type="text"
                  name="lastname"
                  value={formdata.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <span className="text-red-400 ml-5 text-sm">
                    {errors.lastname}
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                className="bg-[#fff]/30 w-full py-[0.6em] md:py-[0.7em] rounded-full px-5"
                placeholder="Enter your Email"
                type="email"
                name="Email"
                value={formdata.Email}
                onChange={handleChange}
              />
              {errors.Email && (
                <span className="text-red-400 ml-5 text-sm">
                  {errors.Email}
                </span>
              )}
            </div>
            <div>
              <input
                className="bg-[#fff]/30 w-full py-[0.6em] md:py-[0.7em] rounded-full px-5"
                placeholder="Phone Number"
                type="text"
                name="phone"
                value={formdata.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="text-red-400 ml-5 text-sm">
                  {errors.phone}
                </span>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <label
                className="flex gap-1 text-md md:text-lg items-center whitespace-nowrap"
                htmlFor="DOB"
              >
                Enter your<span className="text-[#278AE1]"> DOB</span>
                <div className="w-full flex flex-col lg:flex-row md:items-center">
                  <input
                    type="date"
                    id="DOB"
                    name="DOB"
                    className="bg-[#fff]/30 text-base py-[0.5em] md:py-[0.6em] rounded-full px-5"
                    value={formdata.DOB || ""}
                    onChange={handleChange}
                  />
                  {errors.DOB && (
                    <span className="text-red-400 ml-5 text-sm">
                      {errors.DOB}
                    </span>
                  )}
                </div>
              </label>

              <label
                className="flex gap-1 w-full text-lg items-center whitespace-nowrap"
                htmlFor=""
              >
                <span className="text-[#278AE1]"> You</span> are a
                <div className="flex w-full flex-col">
                  <select
                    value={formdata.Sex}
                    onChange={handleChange}
                    className="bg-[#fff]/30 w-full text-black/60 text-base py-[0.5em] md:py-[0.6em] rounded-full px-5"
                    name="Sex"
                  >
                    {sexOption.map((option, index) => (
                      <option
                        key={index}
                        value={option.value}
                        disabled={option.value === ""}
                        hidden={option.value === ""}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.Sex && (
                    <span className="text-red-400 ml-5 text-sm">
                      {errors.Sex}
                    </span>
                  )}
                </div>
              </label>
            </div>
            <div className="flex gap-5 mt-10 max-w-[50em]">
              <button
                type="button"
                disabled={page === 0}
                className="w-[35%] md:w-[25%] text-white bg-[#fff]/30 py-2 rounded-full"
              >
                Previous
              </button>
              <button
                type="submit"
                className="w-[35%] md:w-[25%] text-white bg-[#278AE1] py-2 rounded-full"
              >
                Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Userdetails