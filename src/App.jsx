import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homescreen1 from "./Page/Homescreen1";
import Homescreen2 from "./Page/Homescreen2";
import Homescreen3 from "./Page/Homescreen3";
import SendMoneyOne from "./Page/SendMoneyOne";
import SendMoneyTwo from "./Page/SendMoneyTwo";
import Password from "./Page/Password";
import Successful from "./Page/Successful";
import Receipt from "./Page/Receipt";
import SplashScreen from "./components/SplashScreen"
import SplashScreen2 from "./components/SplashScreen2";
import WelcomePage from "./components/WelcomePage";
import MobileNumberPage from "./components/MobileNumberPage";
import VerifyPhonePage from "./components/VerifyPhonePage";
import SecureAccess from "./components/SecureAccess";
import CreatePasscode from "./components/CreatePasscode";
import UserInfoForm from "./components/UserInfoForm";
import SubmissionScreen from "./components/SubmissionScreen";
import GetStartedPage from "./components/GetStartedPage";
import AccountConfirmation from "./components/AccountConfirmation";
import Login from "./components/Login";
import MorePage from "./Page/Morepage";
import Logout from "./components/logout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Homescreen1 />} />
        <Route path="/home2" element={<Homescreen2 />} />
        <Route path="/home3" element={<Homescreen3 />} />
        <Route path="/send" element={<SendMoneyOne />} />
        <Route path="/send1" element={<SendMoneyTwo />} />
        <Route path="/password" element={<Password />} />
        <Route path="/success" element={<Successful />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="first" element={<SplashScreen />} />
        <Route path="/splash" element={<SplashScreen2 />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup1" element={<GetStartedPage />} />
        <Route path="/Mobile" element={<MobileNumberPage />} />
        <Route path="/Verify" element={<VerifyPhonePage />} />
        <Route path="/Secure" element={<SecureAccess />} />
        <Route path="/create-password" element={<CreatePasscode />} />
        <Route path="/Userinfo" element={<UserInfoForm />} />
        <Route path="/Submit" element={<SubmissionScreen />} />
        <Route path="/Confirmation" element={<AccountConfirmation />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/more" element={<MorePage/>} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </Router>
  );
};
export default App;
