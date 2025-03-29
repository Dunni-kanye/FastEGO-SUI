import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUser, FaIdCard, FaSignature } from "react-icons/fa";
import balloonImage from "../assets/balloon.png";
import { standardizeUserFields, updateAllUserStores } from "../components/getUserData";

export default function AccountConfirmation() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    username: "",
    accountNumber: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    username: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const fields = [
    {
      name: "firstname",
      label: "First Name",
      icon: <FaUser className="text-gray-400" />,
      validation: (value) => {
        if (!value.trim()) return "First name is required";
        if (value.trim().length < 2) return "Must be at least 2 characters";
        return "";
      }
    },
    {
      name: "lastname",
      label: "Last Name",
      icon: <FaSignature className="text-gray-400" />,
      validation: (value) => {
        if (!value.trim()) return "Last name is required";
        if (value.trim().length < 2) return "Must be at least 2 characters";
        return "";
      }
    },
    {
      name: "username",
      label: "Username",
      icon: <FaIdCard className="text-gray-400" />,
      validation: (value) => {
        if (!value.trim()) return "Username is required";
        if (value.trim().length < 3) return "Must be at least 3 characters";
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Only letters, numbers and underscores";
        return "";
      }
    }
  ];

  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("currentUser")) || 
                     JSON.parse(localStorage.getItem("user")) || {};
    
  
    if (!storedUser.accountNumber) {
      storedUser.accountNumber = generateAccountNumber();
      updateAllUserStores(storedUser);
    }

    setUserDetails({
      firstname: storedUser.firstname || "",
      lastname: storedUser.lastname || "",
      username: storedUser.username || "",
      accountNumber: storedUser.accountNumber,
    });
  }, []);

  const generateAccountNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value,
    }));
    
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      const error = field.validation(userDetails[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
     
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = standardizeUserFields(userDetails);
      updateAllUserStores(updatedUser);
      
      navigate("/home");
    } catch (error) {
      console.error("Error saving user details:", error);
      alert("An error occurred while saving your details");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return fields.every(field => {
      const error = field.validation(userDetails[field.name]);
      return !error;
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
       
        <div className="flex flex-col items-center text-center mb-8">
          <img 
            src={balloonImage} 
            alt="Celebration Balloons" 
            className="w-32 h-32 animate-bounce" 
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            Welcome to FastEGO, {userDetails.firstname || "User"}!
          </h2>
          <p className="text-gray-500 mt-2">
            Your account is ready. Let's complete your profile.
          </p>
          
         
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-xs text-gray-600">Account Number</p>
            <p className="font-mono text-lg font-bold text-blue-800">
              {userDetails.accountNumber}
            </p>
          </div>
        </div>

   
        <form onSubmit={handleContinue} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {field.icon}
                </div>
                <input
                  className={`w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors[field.name] 
                      ? "border-red-500 focus:ring-red-200" 
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                  type="text"
                  name={field.name}
                  value={userDetails[field.name]}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

         
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full h-12 mt-6 rounded-lg text-white font-semibold transition-colors ${
              isSubmitting || !isFormValid()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } flex items-center justify-center`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-2" />
                Complete Registration
              </>
            )}
          </button>
        </form>

       
        <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-100 flex items-start">
          <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
          <p className="text-xs text-green-700">
            Your information is secured with bank-level encryption. We'll never share your details.
          </p>
        </div>
      </div>
    </div>
  );
}