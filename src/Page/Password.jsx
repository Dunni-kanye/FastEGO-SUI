import React, { useState, useEffect } from 'react';
import { MdNavigateNext } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Password = () => {
    const [enteredPin, setEnteredPin] = useState([]);
    const [transaction, setTransaction] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTransaction = localStorage.getItem("transactionDetails");
        if (storedTransaction) {
            setTransaction(JSON.parse(storedTransaction));
        }
    }, []);

    const handleNumberClick = (num) => {
        if (enteredPin.length < 4) {
            setEnteredPin([...enteredPin, num]);
        }
    };

    const handleNext = () => {
        if (enteredPin.length === 4) {
           
            localStorage.setItem("userPin", enteredPin.join(""));

            navigate("/success");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 w-full max-w-screen-xl mx-auto text-center">
            <div className="flex items-center justify-between w-full max-w-md px-4 py-2 bg-white shadow-md rounded-lg">
                <MdNavigateNext className="text-[#3C3F49] text-2xl" />
                <h2 className="text-2xl sm:text-3xl font-bold text-[#3A3C4C]">Password</h2>
            </div>

            <button className="mt-6 w-20 h-20 bg-[#F1F5F9] outline-none rounded-full flex justify-center items-center text-[#235697] shadow-md">
                <CiLock className="text-3xl md:text-4xl" />
            </button>

            <div className="mt-4 px-4 sm:px-0">
                <h1 className="text-[#3B3D4B] font-semibold text-lg sm:text-xl">Enter your password</h1>
                <p className="text-[#7D7C93] font-light text-sm sm:text-base">
                    Enter your 4-digit passcode in order to perform this transaction
                </p>
            </div>

       
            <div className="mt-6 flex gap-4">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className={`w-10 h-10 border border-[#235697] rounded-full transition-all duration-300 relative overflow-hidden ${
                            enteredPin[index] !== undefined ? "bg-gradient-to-l from-[#22A1F7] to-[#002F73]" : "bg-transparent"
                        }`}
                    ></div>
                ))}
            </div>

           
            <div className="grid grid-cols-3 gap-4 mt-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                        key={num}
                        className="w-20 h-20 bg-[#F1F5F9] outline-none rounded-full flex justify-center items-center text-[#373F46] shadow-md text-2xl font-bold"
                        onClick={() => handleNumberClick(num)}
                    >
                        {num}
                    </button>
                ))}

                <div className="w-20 h-20"></div>

                
                <button
                    className="w-20 h-20 bg-[#F1F5F9] outline-none rounded-full flex justify-center items-center text-[#373F46] shadow-md text-2xl font-bold"
                    onClick={() => handleNumberClick(0)}
                >
                    0
                </button>

                <button
                    className={`w-20 h-20 ${
                        enteredPin.length === 4 ? "bg-[#22A1F7]" : "bg-[#F1F5F9]"
                    } outline-none rounded-full flex justify-center items-center text-[#373F46] shadow-md`}
                    onClick={handleNext}
                    disabled={enteredPin.length < 4}
                >
                    <MdNavigateNext className="text-3xl" />
                </button>
            </div>
        </div>
    );
};

export default Password;
