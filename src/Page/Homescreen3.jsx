import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { BsSend } from "react-icons/bs";
import { MdIosShare, MdOutlineFileDownload } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { IoIosHelpCircle } from "react-icons/io";

const Homescreen3 = () => {
    const location = useLocation();
    const transactionDetails = location.state || {
      amount: "₦0.00",
      beneficiary: "Unknown",
      bank: "Unknown Bank",
      accountNumber: "0000000000",
      type: "N/A",
      remarks: "N/A",
      reference: "N/A",
      status: "Pending",
      date: "N/A",
    };
    const getStatusIcon = (status) => {
        const colorClass = statusColors[status] || "text-gray-500"; 
      
        switch (status) {
          case "Success":
            return <IoIosCheckmarkCircle className={`${colorClass}`} />;
          case "Pending":
            return <IoMdTime className={`${colorClass}`} />;
          case "Failed":
            return <IoIosCloseCircle className={`${colorClass}`} />;
          default:
            return <IoIosHelpCircle className="text-gray-500" />;
        }
      };
      
      console.log("Transaction Details:", transactionDetails);

      
  

  const sections = [
    {
      title: "Repeat transaction",
      description: "Make this payment again",
      icon: <RiCheckboxMultipleBlankLine className="text-[#204e8a]" />,
    },
    {
      title: "Report transaction",
      description: "Report an issue with this payment",
      icon: <BiSolidError className="text-[#d23a35]" />,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 w-full max-w-screen-xl mx-auto">
    
      <div className=" flex items-center w-full gap-4 p-3 rounded-md">
        <MdNavigateNext className="text-black text-xl" />
        <span className="text-black text-lg font-semibold">Transaction Details</span>
      </div>

      <div className="w-full h-1 bg-gray-100 mt-5"></div>

      <div className="flex flex-col items-center mt-6">
        <button className="w-[80px] h-[80px] bg-[#F1F5F9] outline-none rounded-full flex justify-center items-center text-[#235697] shadow-md">
          <BsSend className="text-3xl md:text-4xl" />
        </button>
        <h1 className="mt-2 text-sm font-medium text-[#3B3D4B]">Transfer to Bank Account</h1>
        <h1 className="mt-1 text-sm font-normal text-[#3B3D4B]">On {transactionDetails.date}</h1>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="flex items-center justify-center w-[160px] h-[46px] bg-gradient-to-l from-[#22A1F7] to-[#002F73] text-white rounded-lg gap-2 shadow-md">
          <MdIosShare className="text-xl" /> Share
        </button>
        <button className="flex items-center justify-center w-[160px] h-[46px] border border-[#22A1F7] text-[#22A1F7] rounded-lg gap-2 shadow-md">
          <MdOutlineFileDownload className="text-xl" /> Download
        </button>
      </div>

      <div className="mt-6 bg-white w-full p-4 rounded-md shadow-md text-sm text-[#3B3D4B]">
     
      <div className="grid justify-between py-2 border-b">
  <div className="flex flex-col font-medium text-[#3B3D4B]">
    <span className={`text-lg font-bold ${transactionDetails.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
      {transactionDetails.amount.replace("₦", "")}
    </span>
    <span>{transactionDetails.beneficiary}</span>
  </div>
</div>

        {[
          { label: "Bank", value: transactionDetails.bank },
          { label: "Beneficiary Account Number", value: transactionDetails.accountNumber },
          { label: "Transaction Type", value: transactionDetails.type },
          { label: "Remarks", value: transactionDetails.remarks },
          { label: "Transaction Reference", value: transactionDetails.reference },
          {
            label: "Transaction Status",
            value: (
              <span className="flex items-center">
                
            
                {transactionDetails?.status || "Unknown"}
              </span>
            ),
          },
        
        ].map((item, index) => (
          <div key={index} className="grid justify-between py-2 border-b last:border-b-0">
            <span className="text-[#7D7C93] font-light">{item.label}</span>
            <span className="font-medium text-[#3B3D4B]">{item.value}</span>
          </div>
        ))}
      </div>

      <p className="self-start mt-3 text-[#3A3C4C]">MORE ACTIONS</p>

      <div className="mt-3 bg-white w-full p-4 space-y-8 self-start">
        {sections.map((section, index) => (
          <div key={index} className="w-full">
            <div className="min-h-28 py-4 flex items-center justify-between px-4 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center">
                  <h1 className="text-[#527aae] text-xl sm:text-4xl font-bold">{section.icon}</h1>
                </div>
                <div className="max-w-[200px] sm:max-w-none">
                  <h1 className="text-lg font-semibold tracking-[-2%] truncate text-[#3B3D4B]">
                    {section.title}
                  </h1>
                  <p className="text-sm text-[#7D7C93]">{section.description}</p>
                </div>
              </div>
              <MdNavigateNext className="text-2xl text-[#7D7C93] ml-28" />
            </div>
            {index < sections.length - 1 && <div className="w-full h-px bg-gray-100"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homescreen3;
