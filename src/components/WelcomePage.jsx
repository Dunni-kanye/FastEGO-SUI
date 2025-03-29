import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import logo from "../assets/logo.png"; // Import the logo image

export default function WelcomePage() {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      {/* Top section with gradient and logo */}
      <div className="w-full h-[55vh] bg-gradient-to-r from-[#0A3A5A] to-[#18A0FB] flex flex-col items-center justify-center">
        <img src={logo} alt="FastEGO Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-4xl font-bold text-white">FastEGO</h1>
      </div>

      {/* Bottom section with text and buttons */}
      <div className="flex flex-col items-center w-full px-6 text-center">
        <div className="space-y-3 mt-6">
          <h2 className="text-2xl font-semibold text-[#3a3c4c] leading-tight">
            Mobile banking the <br /> world loves.
          </h2>
          <p className="text-[#7d7c93] text-base">
            Get sending, spending and saving <br /> with your contactless card.
          </p>
        </div>

        {/* Buttons with navigation */}
        <div className="w-full flex gap-4 mt-8">
          <button 
            className="flex-1 border border-[#18A0FB] text-[#18A0FB] h-12 rounded-lg"
            onClick={() => navigate("/login")} 
          >
            Login
          </button>
          <button 
            className="flex-1 bg-gradient-to-r from-[#0A3A5A] to-[#18A0FB] text-white h-12 rounded-lg shadow-md"
            onClick={() => navigate("/signup1")}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
