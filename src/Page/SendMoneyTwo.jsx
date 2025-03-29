import React from "react";
import logo from "../assets/logo.png";
import { MdNavigateNext } from "react-icons/md";
import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const SendMoneyTwo = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

     useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000); 
  
      return () => clearInterval(interval);
    }, []);
    const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");

    const banks = [
        { name: "Access Bank Plc", code: "044" },
        { name: "Citibank Nigeria Ltd", code: "023" },
        { name: "Ecobank Nigeria Plc", code: "050" },
        { name: "Fidelity Bank Plc", code: "070" },
        { name: "First Bank of Nigeria Ltd", code: "011" },
        { name: "First City Monument Bank Ltd", code: "214" },
        { name: "Guaranty Trust Bank Ltd", code: "058" },
        { name: "Polaris Bank Ltd", code: "076" },
        { name: "Stanbic IBTC Bank Ltd", code: "221" },
        { name: "Sterling Bank Plc", code: "232" },
        { name: "United Bank for Africa Plc", code: "033" },
        { name: "Wema Bank Plc", code: "035" },
        { name: "Zenith Bank Plc", code: "057" },
      ];
    
      const selectedBankCode = banks.find((bank) => bank.name === selectedBank)?.code || "";
    
    
      const mockAccountData = {
        "1234567890": "John Doe", 
        "9876543210": "Jane Smith", 
      };
    
      const fetchAccountName = () => {
        if (accountNumber.length !== 10 || !selectedBankCode) {
          setError("Enter a valid account number and select a bank.");
          return;
        }
    
        setLoading(true);
        setError("");
    
        setTimeout(() => {
          if (mockAccountData[accountNumber]) {
            setBeneficiaryName(mockAccountData[accountNumber]);
          } else {
            setError("Account not found.");
          }
          setLoading(false);
        }, 1000); 
      };
    
      const isFormValid = selectedBank&&   accountNumber.length === 10 && amount.trim() !=="";
      const handleTransfer = () => {
        if (!isFormValid) return;
      
        const transferData = {
          id: new Date().getTime(),
          amount: `-₦${amount}`,
          bankName: selectedBank,
          accountNumber,
          beneficiary: beneficiaryName,
          remark,
          date: new Date().toISOString(),
        };

        const updateBalance = () => {
        updateBalance(parseFloat(amount));
        }
     
        localStorage.setItem("transferDetails", JSON.stringify(transferData));
      
    
        const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
      
   
        const updatedTransactions = [transferData, ...existingTransactions];
      
      
        localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      
        
        navigate("/password");
      };
      
      
    
  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 w-full max-w-screen-xl mx-auto">
  
      <div className="flex items-center justify-between w-full max-w-md px-4 py-2 bg-white shadow-md rounded-lg">
        <MdNavigateNext className="text-[#3C3F49] text-2xl" />
        <h2 className="text-3xl font-bold text-[#3A3C4C] ">Transfer to Bank Account</h2>
      </div>

    
      <div className="w-full h-1 bg-gray-100 mt-5"></div>

 
      <div className="relative w-[420px] h-[121px] bg-[#3D87E6] mt-3  rounded-lg shadow-lg p-6 overflow-hidden">

        <div className="absolute -top-8 -right-8 w-[200px] h-[200px] bg-blue-900 rounded-full flex justify-center items-center opacity-35">
        </div>
        <img src={logo} alt="Logo" className="w-16 h-16 mt-[-20px] ml-[320px] object-contain " />
       
            <div className="text-white mt-[-50px]">
          <h2 className="font-thin text-base lg:text-xl leading-[150%] tracking-[-2%]">
            Total Balance
          </h2>
          <h1 className="text-2xl lg:text-4xl font-bold">₦20,000,000.00</h1>
          <h4 className="font-thin text-sm lg:text-lg leading-[150%] tracking-[-2%]">
      Last updated {currentTime.toLocaleTimeString()}.
    </h4>
        </div>

      </div>
      <input
        type="text"
        className="border-gray-300 p-4 w-full rounded-lg focus:outline-none"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        onBlur={fetchAccountName} 
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
<div className="w-full h-1 bg-gray-100 "></div>

<select
  value={selectedBank}
  onChange={(e) => setSelectedBank(e.target.value)}
  className="border-gray-300 p-4 w-full rounded-lg focus:outline-none text-black"
>
  <option value="" disabled className="">Bank Name</option>
  {banks.map((bank, index) => (
    <option key={index} value={bank.name}>
    {bank.name}
  </option>
  
  ))}
</select>

<div className="w-full h-1 bg-gray-100 "></div>


<div className="relative w-full">
  <input
    type="text"
    className="border-gray-300 p-4 w-full rounded-lg  focus:outline-none"
    placeholder="Beneficiary's Name"
          value={beneficiaryName}
          readOnly
  />
    <IoSearchOutline className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
</div>
<div className="w-full h-1 bg-gray-100 "></div>
<input
  type="text"
  className="border-gray-300 p-4 w-full rounded-lg focus:outline-none"
  placeholder="Amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>

    <div className="w-full h-1 bg-gray-100 "></div>
    <input
    type="text"
    className="border-gray-300 p-4 w-full rounded-lg  focus:outline-none"
    placeholder="Remark(optional)"
    value={remark}
    onChange={(e) => setRemark(e.target.value)}
    />
    
    <div className="w-full h-1 bg-gray-100 "></div>
<div>
<button
          className={`w-64 py-3 h-14 mt-10 text-white rounded-lg transition-colors ${
            isFormValid ? "bg-gradient-to-l from-[#22A1F7] to-[#002F73]  hover:bg-[#002F73]" : "bg-[#88A9C9]"
          }`}
          disabled={!isFormValid} 
          onClick={handleTransfer}
        >
          Continue
        </button>
    </div>
    </div>
  );
};

export default SendMoneyTwo;
