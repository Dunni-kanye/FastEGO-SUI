import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePasscode() {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    const tempUserData = JSON.parse(localStorage.getItem("tempUserData"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

   
    if (!tempUserData?.email) {
      setError("Registration data missing. Please start over.");
      navigate("/userInfo");
      return;
    }

    const userExists = users.some(user => user.email === tempUserData.email);
    if (userExists) {
      setError("User already exists. Please login instead.");
      navigate("/login");
      return;
    }

    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

    const newUser = {
      email: tempUserData.email,
      password: tempUserData.password,
      firstname: tempUserData.firstname,
      lastname: tempUserData.lastname,
      name: `${tempUserData.firstname} ${tempUserData.lastname}`.trim(),
      accountNumber,
      balance: 0,
      transactions: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    localStorage.removeItem("tempUserData");

    navigate("/userInfo"); 
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-6">
      <div className="flex items-center justify-between">
        <FaArrowLeft 
          className="text-gray-600 text-xl cursor-pointer" 
          onClick={() => navigate("/secure-access")} 
        />
        <span className="text-sm text-gray-500">Step 3/5</span>
      </div>

      <div className="w-full h-1 bg-gray-300 mt-2">
        <div className="h-full w-3/5 bg-[#18A0FB]"></div>
      </div>

      <h2 className="text-2xl font-bold text-[#3a3c4c] mt-6">Create your passcode</h2>
      <p className="text-gray-500 text-sm mt-2">
        This will be used for logging in, so please don't share it with anyone.
      </p>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm mt-4">
          {error}
        </div>
      )}

      <div className="flex justify-center my-6">
        <input
          type="password"
          maxLength={6}
          value={passcode}
          onChange={(e) => setPasscode(e.target.value.replace(/[^0-9]/g, ""))}
          className="text-center text-xl tracking-widest w-3/4 p-3 border rounded-lg"
          placeholder="••••••"
        />
      </div>

      <button
        className={`w-full h-12 mt-6 rounded-lg text-white font-semibold ${
          passcode.length === 6 
            ? "bg-gradient-to-r from-[#18A0FB] to-[#0A3A5A]" 
            : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={passcode.length < 6}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}