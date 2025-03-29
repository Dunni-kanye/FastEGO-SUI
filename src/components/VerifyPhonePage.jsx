import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation

export default function VerifyPhonePage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate(); // Hook for navigation

  // Handle OTP Input
  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits in one box
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if a digit is entered
    if (value !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Check if at least one OTP field is filled
  const isOtpStarted = otp.some((digit) => digit !== "");

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <FaArrowLeft
          className="text-gray-600 text-xl cursor-pointer"
          onClick={() => navigate("/mobile-number")} // Navigate back when clicking the arrow
        />
        <span className="text-sm text-gray-500">Step 3/5</span>  
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-300 mt-2">
        <div className="h-full w-2/5 bg-[#18A0FB]"></div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#3a3c4c] mt-6">
        Verify your phone number
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        Enter the 6-digit code we texted to you at <br />
        <span className="font-semibold">+234 8085472417</span>{" "}
        <span
          className="text-[#18A0FB] cursor-pointer"
          onClick={() => navigate("/Mobile")} // Navigate to mobile number page
        >
          Edit number
        </span>
      </p>

      {/* OTP Input Boxes */}
      <div className="flex justify-between mt-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#18A0FB]"
          />
        ))}
      </div>

      {/* Resend Code */}
      <p className="text-gray-500 text-sm mt-4">
        Didn’t receive the code?{" "}
        <span className="text-[#18A0FB] cursor-pointer">Resend code</span>
      </p>

      {/* Verify Button */}
      <button
        className={`w-full h-12 mt-6 rounded-lg text-white font-semibold ${
          isOtpStarted
            ? "bg-gradient-to-r from-[#18A0FB] to-[#0A3A5A]"
            : "bg-gray-300"
        }`}
        disabled={!isOtpStarted}
      >
        Verify
      </button>
    </div>
  );
}
