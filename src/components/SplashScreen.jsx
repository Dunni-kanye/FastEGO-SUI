import logo from "../assets/logo.png";

export default function SplashScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-[#5ABEFF] to-[#18A0FB]">
      <div className="flex items-center space-x-4">
      <img src={logo} alt="FastEGO Logo" className="w-24 h-24" />
      <h1 className="text-white text-2xl font-semibold">FastEGO</h1>
      </div>
    </div>
  );
}
