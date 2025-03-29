import React from "react";
import logo from "../assets/logo.png";
import { MdNavigateNext } from "react-icons/md";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { BsHousesFill } from "react-icons/bs";
import { TbCurrencyNaira } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const SendMoneyOne = () => {
    const navigate = useNavigate();
  const sections = [
    {
      title: "FastEGO",
      description: "Send to a FastEGO User or invite phone contact",
    },
    {
      title: "Bank Account",
      description: "Send to a bank account",
      icon: <BsHousesFill className="text-[#177aca]" />,
      onClick: () =>navigate("/send1"),
    },
   
  ];

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 w-full max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between w-full max-w-md px-4 py-2 bg-white shadow-md rounded-lg">
        <MdNavigateNext className="text-[#3C3F49] text-2xl" />
        <img className="h-12 w-auto mx-4" src={logo} alt="Logo" />
        <h2 className="text-3xl font-bold text-[#3A3C4C] ">Transfer Money</h2>
        <LiaCommentDotsSolid className="text-[#3C3F49] text-2xl" />
      </div>
      <div className="w-full h-1 bg-gray-100 mt-5"></div>
      <div className="mt-3 bg-white w-full p-4 space-y-8 self-start">
        {sections.map((section, index) => (
          <div key={index} className="w-full">
            <div className="min-h-28 py-4 flex items-center justify-between px-4 rounded-lg shadow-md"
                onClick={section.onClick}>
              <div className="flex items-center gap-4">
                <div className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center">
                  <h1 className="text-[#527aae] text-xl sm:text-4xl font-bold">
                    {section.icon}
                  </h1>
                </div>
                <div className="max-w-[200px] sm:max-w-none">
                  <h1 className="text-lg font-semibold tracking-[-2%] truncate text-[#3B3D4B]">
                    {section.title}
                  </h1>
                  <p className="text-sm text-[#7D7C93]">
                    {section.description}
                  </p>
                </div>
              </div>
              <MdNavigateNext className="text-2xl text-[#7D7C93] ml-28" />
            </div>
            {index < sections.length - 1 && (
              <div className="w-full h-px bg-gray-100"></div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full mt-5">
        <div className="relative flex items-center w-full">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-gray-500">
            or
          </span>
        </div>

        <div className="mt-3  w-full p-4 space-y-8 self-start">
          <div className="w-full">
            <div className="min-h-28 py-4 flex items-center justify-between px-4 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-[80px] h-[80px] bg-gray-1p rounded-full flex justify-center items-center">
                  <TbCurrencyNaira className="text-[#298120] text-4xl sm:text-5xl font-bold" />
                </div>

                <div className="max-w-[200px] sm:max-w-none">
                  <h1 className="text-lg font-semibold tracking-[-2%] truncate text-[#3B3D4B]">
                    Report transaction
                  </h1>
                  <p className="text-sm text-[#7D7C93]">
                    Report an issue with this payment
                  </p>
                </div>
              </div>

              <MdNavigateNext className="text-2xl text-[#7D7C93] ml-28" />
            </div>

            <div className="w-full h-px bg-gray-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyOne;
