"use client";
import React, { useState } from "react";
import Image from "next/image";

const ComplaintForm = () => {
  const [complaintData, setComplaintData] = useState({
    incidentdate: "",
    regno: "",
    location: "",
    description: "",
    files: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaintData({ ...complaintData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setComplaintData((prevData) => ({
      ...prevData,
      files: [...prevData.files, ...uploadedFiles],
    }));
    setErrors((prevErrors) => ({ ...prevErrors, files: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!complaintData.incidentdate) {
      newErrors.incidentdate = "Date of the incident is required.";
    }
    if (!complaintData.regno) {
      newErrors.regno = "Vehicle registration number is required.";
    }
    if (!complaintData.location) {
      newErrors.location = "Location of the incident is required.";
    }
    if (!complaintData.description) {
      newErrors.description = "Incident description is required.";
    }
    if (complaintData.files.length === 0) {
      newErrors.files = "Please upload at least one image.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const formData = new FormData();
      Object.keys(complaintData).forEach((key) => {
        if (key === "files") {
          complaintData.files.forEach((file) => {
            formData.append("files", file);
          });
        } else {
          formData.append(key, complaintData[key]);
        }
      });

      try {
        const response = await fetch("http://localhost:5000/api/submitComplaint", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Complaint submitted successfully!");
          setComplaintData({
            incidentdate: "",
            regno: "",
            location: "",
            description: "",
            files: [],
          });
        } else {
          alert("Error submitting complaint. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting your complaint.");
      }
    } else {
      console.log("Form Validation Failed");
    }
  };

  return (
    <div className="relative bg-custom-gradient max-w-[97%] mx-auto h-full lg:full w-[100vw]">
      <div className="relative mb-5 w-[95%] mx-auto top-1 flex justify-between items-center px-1 md:px-6 py-2">
        <Image
          width={100}
          height={50}
          className="w-20 md:w-[6em]"
          src={"/assests/vahanscore.svg"}
          alt="_logo"
        />
        <h1 className="relative whitespace-nowrap font-semibold text-lg md:text-2xl text-[#c1c1c1b5]">
          VahanScore
        </h1>
      </div>
      <div className="max-w-[96%] mx-auto relative mustica flex flex-col gap-2 items-center mt-8 text-white">
        <h1 className="text-2xl md:text-4xl">Raise a complaint.</h1>
        <p className="max-w-lg text-center text-xs sm:text-sm md:text-md">
          Did someone just break rules?{" "}
          <span className="text-[#278AE1]">Raise a complaint</span> here to earn
          rewards.
        </p>
      </div>
      <div className="mt-10 mustica md:ml-[2em] xl:ml-[8em] max-w-[55em]">
        <h1 className="text-white text-xl md:text-[2em]">
          Fill in the details to register your{" "}
          <span className="text-[#278AE1]">complaint.</span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 mt-7 text-white"
        >
          <label
            className="flex flex-col md:flex-row w-full gap-1 text-md md:text-lg md:items-center"
            htmlFor="Vehicle Number"
          >
            <span className="whitespace-nowrap">
              The Vehicle's{" "}
              <span className="text-[#278AE1]">Registration No</span> was
            </span>
            <div className="w-full">
              <input
                className="bg-[#fff]/30 w-full py-[0.6em] text-base md:py-[0.7em] rounded-xl px-5"
                placeholder="Registration Number"
                type="text"
                name="regno"
                value={complaintData.regno}
                onChange={handleChange}
              />
              {errors.regno && (
                <span className="text-red-400 ml-5 text-sm">
                  {errors.regno}
                </span>
              )}
            </div>
          </label>
          <label
            className="flex flex-col md:flex-row w-full gap-1 text-md md:text-lg md:items-center"
            htmlFor="location"
          >
            <span className="whitespace-nowrap">
              <span className="text-[#278AE1]">Location</span> of incident
            </span>
            <div className="w-full">
              <input
                type="text"
                id="location"
                placeholder="Location of incident"
                name="location"
                className="bg-[#fff]/30 w-full text-base py-[0.5em] md:py-[0.6em] rounded-xl px-5"
                value={complaintData.location}
                onChange={handleChange}
              />
              {errors.location && (
                <span className="text-red-400 ml-5 text-sm">
                  {errors.location}
                </span>
              )}
            </div>
          </label>
          {/* File Upload Field */}
          <div>
            <label className="text-md flex flex-col sm:flex-row md:text-lg sm:items-center">
              <span className=" whitespace-nowrap pr-4">
                {" "}
                Attach <span className="text-[#278AE1]">images</span> (At least
                one) :
              </span>
              <input
                type="file"
                accept="image/*,video/*" // Allow both images and videos
                multiple
                onChange={handleFileChange}
                className="bg-[#fff]/30 w-full text-base py-[0.5em] md:py-[0.6em] rounded-xl px-5 mt-2"
              />

              {errors.files && (
                <span className="text-red-400 text-sm">{errors.files}</span>
              )}
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <label
              className="flex flex-col sm:flex-row gap-1 text-md md:text-lg sm:items-center whitespace-nowrap"
              htmlFor="incidentdate"
            >
              <span>
                The <span className="text-[#278AE1]">Date</span> of incident was
              </span>
              <div className="w-full">
                <input
                  type="date"
                  id="incidentdate"
                  name="incidentdate"
                  className="bg-[#fff]/30 text-base py-[0.5em] md:py-[0.6em] rounded-xl px-5"
                  value={complaintData.incidentdate}
                  onChange={handleChange}
                />
                {errors.incidentdate && (
                  <span className="text-red-400 ml-5 text-sm">
                    {errors.incidentdate}
                  </span>
                )}
              </div>
            </label>
          </div>
          <div className="w-full">
            <textarea
              className="bg-[#fff]/30 w-full py-[0.6em] md:py-[0.7em] rounded-lg px-5"
              placeholder="Description of the incident"
              name="description"
              value={complaintData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <span className="text-red-400 ml-5 text-sm">
                {errors.description}
              </span>
            )}
          </div>
          <div className="flex gap-5 mt-10 max-w-[50em]">
            <button
              type="button"
              className="w-[35%] md:w-[25%] text-white bg-[#fff]/30 py-2 rounded-xl"
            >
              Previous
            </button>
            <button
              type="submit"
              className="w-[35%] md:w-[25%] text-white bg-[#278AE1] py-2 rounded-xl"
            >
              Proceed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
