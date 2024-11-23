"use client";
import React, { useState } from "react";
import Setpassword from "./Setpassword";
import Userdetails from "./Userdetails";
import Image from "next/image";
const Signupform = () => {
  const [page, setPage] = useState(0);
  const [formdata, setformdata] = useState({
    firstname: "",
    lastname: "",
    Sex: "",
    DOB: "",
    Email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  return (
    <div className="wavebg pb-14 lg:pb-0 lg:min-h-[100vh] w-[100vw] justify-center">
      <div className="relative mb-5 w-[95%] mx-auto top-1 flex justify-between items-center px-1 md:px-6 py-2">
        <Image
          width={100}
          height={50}
          className=" w-20 md:w-[6em]"
          src={"/assests/vahanscore.svg"}
          alt="_logo"
        />
        <h1 className="relative whitespace-nowrap font-semibold text-lg md:text-2xl text-[#c1c1c1b5]">
          VahanScore
        </h1>
      </div>

      <div className="max-w-[96%] mx-auto relative mustica flex flex-col gap-2 items-center mt-8 text-white">
        <h1 className="text-2xl md:text-4xl">Create new account.</h1>
        <p className="max-w-md text-center text-xs sm:text-sm md:text-md">
          Already a Member? <span className="text-[#278AE1]">Signin</span> here
        </p>
      </div>
      <div className=" w-[60%] h-4 mx-auto rounded-full border-[0.12em] flex pl-[2px] justify-start items-center border-[#fff]/30 mt-5">
        <div
          style={{ width: page == 0 ? "50%" : "99.5%" }}
          className=" duration-300 h-[65%] bg-[#fff]/30 bg-gradient-to-r from-[#90c3f0fe]/30 to-[#278AE1]/80 flex justify-end  rounded-full"
        >
          <div className="w-5 h-5 bg-[#278AE1] rounded-full border-[3px] border-[#0D1C30] relative -top-[6px] left-1"></div>
        </div>
      </div>

      {page === 0 ? (
        <Userdetails
          formdata={formdata}
          setformdata={setformdata}
          page={page}
          setpage={setPage}
        />
      ) : (
        <Setpassword
          formdata={formdata}
          setformdata={setformdata}
          page={page}
          setpage={setPage}
        />
      )}
    </div>
  );
};

export default Signupform;
