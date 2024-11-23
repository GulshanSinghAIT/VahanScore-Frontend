"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignupRedirect = () => {
    router.push("/signup");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Ensure consistency
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        router.push("/dashboard");
      } else if (response.status === 404) {
        setMessage("User not found.");
      } else if (response.status === 400) {
        setMessage("Invalid credentials.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative bg-custom-gradient h-full lg:h-[100vh] w-[100vw]">
      <div className="relative mb-5 w-[95%] mx-auto top-1 flex justify-between items-center px-1 md:px-6 py-2">
      <Image
        width={100}
        height={50}
        className=" w-20 md:w-[6em]"
        src={"/assests/vahanscore.svg"}
        alt="_logo" />
        <h1 className="relative whitespace-nowrap font-semibold text-lg md:text-2xl text-[#c1c1c1b5]">
          VahanScore
        </h1>
      </div>
      <div className="max-w-[90%] gap-12 lg:gap-6 relative mx-auto flex flex-col-reverse lg:flex-row pb-[2em] lg:py-[3em] justify-between items-center">
        <div className="w-[98%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[43em] items-center justify-center rounded-xl overflow-hidden">
          <video className="relative w-[100%]" loop autoPlay muted>
            <source src="/assests/carVid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="max-w-[98%] md:h-[29em] h-[27em] relative xl:mr-12 duration-200 text-[#C1C1C1] w-[20em] sm:w-[22em] md:w-[24em] bg-gray-500 rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
          <form
            className="pt-10 pb-6 px-5 sm:px-8 flex flex-col justify-around gap-7 h-full"
            onSubmit={handleSubmit}
          >
            <h1 className="font-semibold text-lg">Login Now</h1>
            <div className="flex flex-col gap-4">
              <label className="text-sm" htmlFor="email">
                Email ID
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg h-10 border-[3px]  w-[97%] focus:outline-none px-2 focus:ring-0"
              />
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg h-10 border-[3px]  w-[97%]  focus:outline-none px-2 focus:ring-0"
              />
              {message && <p className="text-sm px-1 text-red-500">{message}</p>}
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button
                type="submit"
                className="bg-[#102336] border-[2px] border-[#102336] w-[97%] h-9 text-white rounded-lg hover:bg-[#083559] transition"
              >
                Login
              </button>
              <h2 className="text-xs lg:text-sm">
                Don’t have an account?{" "}
                <span
                  className="text-[#EEF35F] cursor-pointer"
                  onClick={handleSignupRedirect}
                >
                  Signup here
                </span>
              </h2>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center whitespace-nowrap text-xs md:text-sm text-[#C1C1C1] absolute left-[50%] translate-x-[-50%] bottom-1">
        <h1>🄫 2024 VahanScore All rights reserved</h1>
      </div>
    </div>
  );
};

export default Signin;
