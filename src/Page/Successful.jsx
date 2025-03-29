import React, { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoShare, GoDownload } from "react-icons/go";
import {useNavigate, useLocation} from "react-router-dom"

const TransferSuccess = () => {
  const navigate = useNavigate();
  const [transferDetails, setTransferDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
  
    const storedData = localStorage.getItem("transferDetails");
    const user = JSON.parse(localStorage.getItem("currentUser"));
    
    if (storedData) {
      setTransferDetails(JSON.parse(storedData));
    }
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleDone = () => {
    if (!transferDetails || !currentUser) {
      navigate("/home");
      return;
    }

  
    const newTransaction = {
      id: Date.now(),
      beneficiary: transferDetails.accountName || transferDetails.bankName,
      accountNumber: transferDetails.accountNumber,
      amount: `-₦${transferDetails.amount}`,
      date: new Date().toISOString(),
      bankName: transferDetails.bankName,
      remark: transferDetails.remark || "",
      type: "Transfer"
    };

   
    const userTransactionsKey = `transactions-${currentUser.id}`;
    const storedTransactions = JSON.parse(localStorage.getItem(userTransactionsKey)) || [];
    
    
    const updatedTransactions = [newTransaction, ...storedTransactions];
    localStorage.setItem(userTransactionsKey, JSON.stringify(updatedTransactions));

  
    window.dispatchEvent(new CustomEvent('transactionsUpdated', {
      detail: { userId: currentUser.id }
    }));

    navigate("/home");
  };

  if (!transferDetails) {
    return <p className="text-center text-lg text-gray-500">Loading transfer details...</p>;
  }


  return (
    <div className="flex flex-col items-center justify-center text-center p-6">
      <div className="w-[12rem] h-[12rem] rounded-full bg-[#e7f3eb] flex items-center justify-center">
        <IoIosCheckmarkCircle className="text-[10rem] text-[#0b732f]" />
      </div>

      <h1 className="text-xl font-semibold text-[#7D7C93] mt-4">
        You have successfully transferred
        ₦ {transferDetails.amount}
      </h1>

      

      <div className="mt-4 text-lg text-[#002F73]">
        <p>Bank Name: <span className="font-semibold text-[#002F73]">{transferDetails.bankName}</span></p>
        <p>Account Number: <span className="font-semibold text-[#002F73]">{transferDetails.accountNumber}</span></p>
        {transferDetails.remark && <p>Remark: <span className="font-semibold text-[#002F73]">{transferDetails.remark}</span></p>}
      </div>
      <div className="grid grid-cols-1 gap-4 md:flex md:space-x-4 mt-4">

  <button className="flex items-center justify-center w-[15rem] h-9 border bg-gradient-to-l from-[#22A1F7] to-[#002F73] text-white font-semibold"
 onClick={() => navigate("/receipt", { state: { transferDetails } })}
>
    
    <GoShare className="mr-2" /> Share
  </button>

  <button className="flex items-center justify-center w-[15rem] h-9 border border-[#002F73] text-[#002F73] font-semibold">
    <GoDownload className="mr-2" />
    <a href={transferDetails.pdfUrl} target="_blank" rel="noopener noreferrer">
      Download Receipt
    </a>
  </button>
</div>
<button 
  className="flex items-center justify-center w-[15rem] h-9 border bg-gradient-to-l from-[#22A1F7] to-[#002F73] text-white font-semibold"
  onClick={() => {
    if (transferDetails) {
    
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      
      if (currentUser) {
       
        const userTransactionsKey = `transactions-${currentUser.id}`;
        const storedTransactions = JSON.parse(localStorage.getItem(userTransactionsKey)) || [];

        const newTransaction = {
          id: Date.now(),
          beneficiary: transferDetails.bankName,
          accountNumber: transferDetails.accountNumber,
          amount: `-₦${transferDetails.amount}`,
          date: new Date().toISOString(),
          bankName: transferDetails.bankName,
          remark: transferDetails.remark,
          type: "Transfer"
        };

        const updatedTransactions = [newTransaction, ...storedTransactions];
        localStorage.setItem(userTransactionsKey, JSON.stringify(updatedTransactions));

      
        if (window.location.pathname === "/") {
          window.dispatchEvent(new Event("storage"));
        }
      }
    }
    navigate("/home");
  }}
>
  Done
</button>



    </div>
  );
};

export default TransferSuccess;