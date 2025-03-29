import { FaArrowLeft, FaLock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserInfoForm() {
  const navigate = useNavigate();
  
  const existingUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [formData, setFormData] = useState({
    firstName: existingUser.firstname || "",
    lastName: existingUser.lastname || "",
    username: existingUser.username || "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: ""
  });

  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkUsername = async () => {
      if (formData.username.length >= 3 && formData.username !== existingUser.username) {
     
        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem("users")) || [];
          const isTaken = users.some(user => 
            user.username && user.username.toLowerCase() === formData.username.toLowerCase()
          );
          setUsernameAvailable(!isTaken);
        }, 500);
      }
    };

    const timer = setTimeout(checkUsername, 300);
    return () => clearTimeout(timer);
  }, [formData.username, existingUser.username]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (usernameAvailable === false) {
      newErrors.username = "Username is already taken";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const isFormValid = () => {
    return (
      formData.firstName.trim() && 
      formData.lastName.trim() && 
      formData.username.trim() && 
      formData.username.trim().length >= 3 &&
      usernameAvailable !== false
    );
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (!isFormValid()) return;

    setIsSubmitting(true);

    const existingUser = {
      ...(JSON.parse(localStorage.getItem("currentUser")) || {}),
      ...(JSON.parse(localStorage.getItem("user")) || {}),
    };
  
    const updatedUser = {
      ...existingUser,
      firstname: formData.firstName.trim(),
      lastname: formData.lastName.trim(),
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
      username: formData.username.trim().toLowerCase(),
      updatedAt: new Date().toISOString()
    };
  
   
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user => 
      user.email === existingUser.email ? updatedUser : user
    );
  
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  
    setIsSubmitting(false);
    navigate("/confirmation");
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-6 bg-gray-50">
     
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600"
        >
          <FaArrowLeft className="mr-1" />
          Back
        </button>
        <span className="text-sm text-gray-500">Step 4/5</span>
      </div>

    
      <div className="w-full h-1 bg-gray-200 mt-2 rounded-full">
        <div className="h-full w-4/5 bg-[#18A0FB] rounded-full"></div>
      </div>

   
      <h2 className="text-2xl font-bold text-gray-800 mt-6">
        Tell us about yourself
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        We'll use this information to personalize your experience.
      </p>

   
      <div className="mt-6 space-y-5">
        <div>
          <label className="block text-gray-700 text-sm mb-1">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.firstName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.lastName ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">Username</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Create a username"
              value={formData.username}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setUsernameAvailable(null);
              }}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.username ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {formData.username.length > 0 && (
              <span className="absolute right-3 top-3.5">
                {usernameAvailable === true ? (
                  <FaCheckCircle className="text-green-500" />
                ) : usernameAvailable === false ? (
                  <FaTimesCircle className="text-red-500" />
                ) : null}
              </span>
            )}
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
          {formData.username.length > 0 && !errors.username && (
            <p className="text-xs mt-1 text-gray-500">
              {usernameAvailable === true ? "Username is available!" : 
               usernameAvailable === false ? "Username is already taken" : 
               "Checking availability..."}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center text-blue-600">
          <FaLock className="mr-2" />
          <span className="font-medium">Your information is secure</span>
        </div>
        <p className="text-xs text-blue-600 mt-1 text-center">
          We use bank-level encryption to protect your personal data
        </p>
      </div>

      <button
        className={`w-full h-12 mt-6 rounded-lg text-white font-semibold transition-colors ${
          isFormValid() 
            ? "bg-[#18A0FB] hover:bg-[#0A3A5A]"
            : "bg-gray-300 cursor-not-allowed"
        } flex items-center justify-center`}
        disabled={!isFormValid() || isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Complete Registration"
        )}
      </button>
    </div>
  );
}