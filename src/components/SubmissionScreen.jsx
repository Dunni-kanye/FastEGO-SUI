import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SubmissionScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a short delay before redirecting
    const timer = setTimeout(() => {
      navigate("/Confirmation"); // Redirect to home or dashboard
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white p-6">
      {/* Loading Spinner */}
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#18A0FB] rounded-full animate-spin"></div>

      {/* Submission Message */}
      <h2 className="text-lg font-semibold text-[#3a3c4c] mt-6">
        Thanks for submitting...
      </h2>
      <p className="text-gray-500 text-sm mt-2 text-center">
        This will be done in a few seconds. <br />
        Leaving the app will restart the process.
      </p>
    </div>
  );
}
