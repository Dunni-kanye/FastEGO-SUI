import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("currentUser");
   
    
   
    navigate("/login", { state: { message: "You have been logged out successfully" } });
  };

 
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
     
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md border border-gray-200">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h2 className="text-lg font-semibold text-gray-800">Logout Confirmation</h2>
        <p className="text-sm text-gray-600 mt-2 mb-6">
          You'll need to sign in again to access your account. Are you sure you want to logout?
        </p>

        {/* Buttons */}
        <div className="flex justify-between space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}