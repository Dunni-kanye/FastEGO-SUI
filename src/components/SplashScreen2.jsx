import logo from "../assets/logo.png";

export default function SplashScreen2() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#5ABEFF] to-[#18A0FB]">
      {/* Logo and Text */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="FastEGO Logo" className="w-24 h-24" />
        <h3 className="text-white text-2xl font-bold">FastEGO</h3>
      </div>
      
      {/* Loading Spinner */}
      {/* <div className="mt-8">
        <div className="w-5 h-5 border-4 border-white border-opacity-50 border-t-white rounded-full animate-spin"></div>
      </div> */}
    </div>
  );
}
