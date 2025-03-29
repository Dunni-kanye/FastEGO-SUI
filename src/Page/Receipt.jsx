import React, { useEffect, useState } from 'react';
import { GoShare } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

const Receipt = () => {
    const navigate = useNavigate();
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
 
        const storedTransaction = localStorage.getItem("transferDetails");
        const storedUser = JSON.parse(localStorage.getItem("currentUser")) || 
                          JSON.parse(localStorage.getItem("user")) || {};

        if (storedTransaction) {
            const transactionData = JSON.parse(storedTransaction);
            
           
            const enhancedTransaction = {
                ...transactionData,
               
                senderName: transactionData.senderName || 
                          `${storedUser.firstName || "User"} ${storedUser.lastName || ""}`.trim(),
                senderAccount: transactionData.senderAccount || storedUser.accountNumber || "N/A"
            };

            setTransactionDetails(enhancedTransaction);
            setUserDetails(storedUser);
        }
    }, []);

    if (!transactionDetails) {
        return <p className="text-center text-lg text-gray-500">Loading transaction details...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 w-full max-w-screen-xl mx-auto text-center">
           
            <div className="flex items-center justify-between w-full max-w-md px-4 py-3 bg-white shadow-md rounded-lg">
                <IoIosArrowBack className="text-2xl cursor-pointer" onClick={() => navigate(-1)} />
                <h2 className="text-2xl sm:text-xl font-bold text-[#3A3C4C]">Download Receipt</h2>
                <GoShare className="text-[#3C3F49] text-2xl cursor-pointer" />
            </div>

          
            <div className="flex flex-col items-center mt-6 w-full max-w-lg">
                <div className="relative flex items-center justify-between w-full h-20 bg-gradient-to-l from-[#22A1F7] to-[#002F73] shadow-lg p-4 rounded-lg">
                    <div className="flex items-center">
                        <img className="w-10 h-10 object-cover rounded-md mr-3" src={logo} alt="Logo" />
                        <h1 className="text-white text-lg font-bold">FastEGO</h1>
                    </div>
                    <h1 className="text-white text-lg font-semibold">Transaction Receipt</h1>
                </div>
            </div>

           
            <div className="mt-6 bg-white shadow-md p-6 rounded-lg w-full max-w-lg text-left">
                {[
                    { label: "Transaction Amount", value: `₦ ${transactionDetails.amount.replace("₦", "").replace("-", "")}` },
                    { label: "Transaction Type", value: transactionDetails.type || "Transfer" },
                    { label: "Transaction Date", value: new Date(transactionDetails.date).toLocaleString() },
                    { 
                        label: "Sender", 
                        value: transactionDetails.senderName 
                    },
                    { 
                        label: "Sender Account Number", 
                        value: transactionDetails.senderAccount 
                    },
                    {
                        label: "Beneficiary",
                        value: (
                            <>
                                <p>{transactionDetails.accountNumber || "N/A"}</p>
                                <p>{transactionDetails.bankName || "N/A"}</p>
                                <p>{transactionDetails.beneficiaryName || "N/A"}</p>
                            </>
                        ),
                    },
                    transactionDetails.remark && { label: "Remarks", value: transactionDetails.remark },
                    { label: "Transaction Reference", value: transactionDetails.reference || "N/A" },
                    { label: "Transaction Status", value: "Transfer Successful" },
                ].filter(Boolean).map((item, index) => (
                    <div key={index} className="flex justify-between gap-5 mt-3">
                        <p className="text-gray-800 w-48 font-medium">{item.label}</p>
                        <div className="text-[#002F73] text-right">
                            {typeof item.value === 'string' ? item.value : item.value}
                        </div>
                    </div>
                ))}
            </div>

            <div className='w-full h-48 mt-40 bg-[#959DA50F] rounded-b-2xl'></div>
        </div>
    );
};

export default Receipt;