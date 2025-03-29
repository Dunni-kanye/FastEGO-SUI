import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import FaceIDIcon from "../assets/faceid.png"; // Import Face ID image
import PasscodeIcon from "../assets/passcode.png"; // Import Passcode image

export default function SecureAccess() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <FaArrowLeft
          className="text-gray-600 text-xl cursor-pointer"
          onClick={() => navigate("/verify-phone")} // Navigate to previous step
        />
        <span className="text-sm text-gray-500">Step 3/5</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-300 mt-2">
        <div className="h-full w-3/5 bg-[#18A0FB]"></div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-[#3a3c4c] mt-6">
        Secure your access
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        Choose how you want to unlock and enter your FastEGO Bank app.
      </p>

      {/* Option 1 - Face ID & Passcode */}
      <div
        className={`flex items-center space-x-3 mt-6 p-4 border-2 rounded-lg cursor-pointer ${
          selectedOption === "faceid"
            ? "border-[#18A0FB] bg-blue-100"
            : "border-gray-300"
        }`}
        onClick={() => setSelectedOption("faceid")}
      >
        <img src={FaceIDIcon} alt="Face ID" className="w-6 h-6" />
        <span className="text-lg font-medium text-[#3a3c4c]">
          Face ID & Passcode
        </span>
      </div>

      {/* Option 2 - Passcode Only */}
      <div
        className={`flex items-center space-x-3 mt-4 p-4 border-2 rounded-lg cursor-pointer ${
          selectedOption === "passcode"
            ? "border-[#18A0FB] bg-blue-100"
            : "border-gray-300"
        }`}
        onClick={() => setSelectedOption("passcode")}
      >
        <img src={PasscodeIcon} alt="Passcode" className="w-6 h-6" />
        <span className="text-lg font-medium text-[#3a3c4c]">
          Passcode only
        </span>
      </div>

      {/* Continue Button */}
      <button
        className={`w-full h-12 mt-6 rounded-lg text-white font-semibold ${
          selectedOption
            ? "bg-gradient-to-r from-[#18A0FB] to-[#0A3A5A]"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!selectedOption}
        onClick={() => navigate("/next-step")} // Update to your next route
      >
        Continue
      </button>
    </div>
  );
}
