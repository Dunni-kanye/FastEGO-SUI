import React, { useState, useRef, useEffect, useMemo } from "react";
import logo from "../assets/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiHide } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiCreditCard } from "react-icons/pi";
import { BsSend } from "react-icons/bs";
import { MdNavigateNext } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoIosFootball } from "react-icons/io";
import { RiArrowUpDownLine } from "react-icons/ri";
import { FaClockRotateLeft } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { BsBarChartFill } from "react-icons/bs";
import { FiGrid } from "react-icons/fi";
import { GiCoins } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { parse, format } from "date-fns";

const Homescreen1 = ({ transactions }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("currentUser")) || null);
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("transactions")) || [];
      return stored.map(txn => ({
        ...txn,
        amount: txn.amount?.replace(/^(-₦)+/, "-₦") || "₦0",
      }));
    } catch {
      return [];
    }
  });
  const [showBalance, setShowBalance] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(() => user?.lastUpdated ? new Date(user.lastUpdated) : new Date());
  const [activeIndex, setActiveIndex] = useState(null);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const itemsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser")) || null;
      setUser(storedUser);
    };
    fetchUser();
    const handleStorageChange = event => {
      if (event.key === "currentUser") fetchUser();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const loadTransactions = () => {
      try {
        const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        if (!Array.isArray(storedTransactions)) return;
        setTransactionList(storedTransactions.map(txn => ({
          ...txn,
          amount: txn.amount?.replace(/^(-₦)+/, "-₦") || "₦0",
        })));
      } catch {}
    };
    loadTransactions();
    window.addEventListener("storage", loadTransactions);
    return () => window.removeEventListener("storage", loadTransactions);
  }, []);

  const groupedTransactions = useMemo(() => {
    if (!transactionList.length) return {};
    return transactionList.reduce((acc, txn) => {
      if (!txn.date) return acc;
      const dateObj = new Date(txn.date);
      if (isNaN(dateObj.getTime())) return acc;
      const dateKey = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(txn);
      return acc;
    }, {});
  }, [transactionList]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, [user]);

  const updateBalance = amount => {
    setUser(prevUser => {
      const numericAmount = parseFloat(amount) || 0;
      const newBalance = (parseFloat(prevUser.balance) || 0) + numericAmount;
      return { ...prevUser, balance: newBalance, lastUpdated: new Date().toISOString() };
    });
    setLastUpdated(new Date());
  };

  const refreshBalance = () => {
    const now = new Date();
    setLastUpdated(now);
    setUser(prevUser => ({ ...prevUser, lastUpdated: now.toISOString() }));
  };

  useEffect(() => {
    const updatePosition = () => {
      if (activeIndex !== null && itemsRef.current[activeIndex] && containerRef.current) {
        const item = itemsRef.current[activeIndex];
        const container = containerRef.current;
        const position = item.getBoundingClientRect().left - container.getBoundingClientRect().left + item.offsetWidth / 2 - 25;
        setIndicatorPosition(position);
      }
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [activeIndex]);

  const formatCurrency = amount => new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2
  }).format(amount).replace("NGN", "₦");

  const formatDate = dateString => {
    if (!dateString) return "Unknown Date";
    try {
      const parsedDate = parse(dateString, "MMM dd, yyyy, hh:mma", new Date());
      return format(parsedDate, "EEE, MMM dd, yyyy, hh:mm a");
    } catch {
      return "Invalid Date";
    }
  };
  const formatTime = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - new Date(date)) / (1000 * 60));
  
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };
  

  const sections = [
    { title: "Add Money", description: "Get more from your account", icon: <GiCoins /> },
    { title: "Create a debit card", description: "Get more from your account", icon: <PiCreditCard /> },
    { title: "Earn ₦2,000 for inviting friends to FastEGO", description: "Get more from your account", icon: <GiMoneyStack /> },
  ];

  const access = [
    { title: "Airtime", icon: <IoCall className="text-[#facc50]" /> },
    { title: "Betting", icon: <IoIosFootball className="text-[#22c9eb]" /> },
    { title: "Data Bundle", icon: <RiArrowUpDownLine className="text-[#4ad286]" /> },
  ];

  const footer = [
    { title: "Home", icon: <GoHomeFill /> },
    { title: "Send", icon: <BsSend /> },
    { title: "Invest", icon: <BsBarChartFill /> },
    { title: "Cards", icon: <PiCreditCard /> },
    { title: "More", icon: <FiGrid />,},
  ];

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 w-full max-w-screen-xl mx-auto">
    <div className="relative w-full max-w-5xl min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] bg-gradient-to-l from-[#22A1F7] to-[#002F73] rounded-tl-3xl rounded-tr-3xl shadow-lg p-6">
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <FaRegUserCircle className="text-2xl lg:text-4xl" />
          <div>
            {user ? (
              <>
                <h1 className="text-lg lg:text-2xl font-semibold leading-[120%] tracking-[-2%]">
                  Hi, {user.name || user.username || user.email.split('@')[0] || "User"}
                </h1>
                <h3 className="text-sm lg:text-lg font-light">
                  Welcome, let's start making payments
                </h3>
                <p>Account Number: {user.accountNumber}</p>
              </>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </div>
     
      </div>

      <div className="text-white mt-6">
        <h2 className="font-thin text-base lg:text-xl leading-[150%] tracking-[-2%]">
          Total Balance
        </h2>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-4xl font-bold">
            {showBalance ? 
              (user ? formatCurrency(user.balance) : "Loading...") : 
              "••••••••"}
          </h1>
          {/* <button
            aria-label="More options"
            className="w-12 h-12 lg:w-16 lg:h-16 shadow-md rounded-full flex items-center justify-center"
          >
            <HiDotsHorizontal className="text-2xl lg:text-3xl" />
          </button> */}
        </div>
        <div className="flex items-center justify-between">
          <h4 className="font-thin text-sm lg:text-lg leading-[150%] tracking-[-2%]">
            Last updated: {formatTime(lastUpdated)}
          </h4>
          <BiHide 
            className="text-2xl lg:text-3xl cursor-pointer" 
            onClick={() => {
              setShowBalance(!showBalance);
              refreshBalance();
            }}
          />
        </div>
      </div>


        <div className="absolute bottom-0 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[95%] mx-auto h-14 md:h-16 lg:h-20 bg-[#3D87E6] rounded-tl-2xl rounded-tr-2xl overflow-hidden flex justify-between items-center px-6">
          <h1 className="text-white text-[20px] font-medium">FastEGO</h1>
          <div className="w-40 h-40 bg-[#3D4364] rounded-full absolute -top-10 right-16 translate-x-[50%]  ">
            <img
              src={logo}
              alt="Logo"
              className="w-16 h-40 object-contain ml-10"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center">
        <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <div className="flex flex-col items-center">
            <button className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center text-[#235697]">
              <IoMdAddCircleOutline className="text-3xl md:text-4xl" />
            </button>

            <h1 className="mt-2 text-sm font-medium text-gray-700">
              Add Money
            </h1>
          </div>
          <div className="flex flex-col items-center">
            <button className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center text-[#235697]">
              <PiCreditCard className="text-3xl md:text-4xl" />
            </button>
            <h1 className="mt-2 text-sm font-medium text-gray-700">My Cards</h1>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center text-[#235697]"
              onClick={() => navigate("/send")}
            >
              <BsSend className="text-3xl md:text-4xl" />
            </button>
            <h1 className="mt-2 text-sm font-medium text-gray-700">Transfer</h1>
          </div>
        </div>
      </div>
      <h1 className="w-full h-1 bg-gray-100 mt-10"></h1>
      <div className="self-start text-left w-full">
        <h1 className="text-[#3A3C4C] text-xl font-semibold tracking-[-2%] leading-[120%] mt-3">
          Get Started
        </h1>

        <div className="mt-3 space-y-4 sm:space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="w-full">
              <div className="min-h-28 py-4 text-white flex items-center justify-between px-4 rounded-lg shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center">
                    <h1
                      className={`transition-all duration-300 ${
                        activeIndex === index
                          ? "text-[#18A0FB]"
                          : "text-[#527aae]"
                      } text-xl sm:text-4xl font-bold`}
                    >
                      {section.icon}
                    </h1>
                  </div>

                  <div className="max-w-[200px] sm:max-w-none">
                    <h1 className="text-lg font-semibold tracking-[-2%] truncate text-[#3B3D4B]">
                      {index === 2 ? (
                        <>
                          Earn ₦2,000 for inviting friends to{" "}
                          <span className="inline sm:hidden">F...</span>
                          <span className="hidden sm:inline">FastEGO</span>
                        </>
                      ) : (
                        section.title
                      )}
                    </h1>
                    <p className="text-sm text-[#7D7C93] ">
                      {section.description}
                    </p>
                  </div>
                </div>

                <MdNavigateNext className="text-2xl text-[#7D7C93]" />
              </div>

              {index < sections.length - 1 && (
                <div className="w-full h-px bg-gray-100"></div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-[#3A3C4C] font-semibold text-lg">
          Quick access
        </p>

        <div className="flex grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-5">
          {access.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-full max-w-[120px] sm:max-w-[160px] md:max-w-[180px] h-10 bg-[#F1F5F9] rounded-lg flex  justify-center items-center px-3 gap-2">
                {item.icon}
                <h1 className="text-xs sm:text-sm md:text-base text-[#3B3D4B] whitespace-nowrap">
                  {item.title}
                </h1>
              </div>
            </div>
          ))}
        </div>
         <div className="mt-8 sm:mt-10 md:mt-12 w-full">
  {!transactionList || transactionList.length === 0 ? (
    <div className="flex items-center gap-x-3">
      <button className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center text-[#235697]">
        <FaClockRotateLeft className="text-3xl md:text-4xl" />
      </button>
      <p className="text-gray-500 text-lg">No transactions yet</p>
    </div>
  ) : (
    Object.entries(groupedTransactions)
      .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
      .map(([date, transactions]) => (
        <div key={date} className="mt-6">
          <h1 className="text-[#3A3C4C] text-xl font-semibold">{date}</h1>
          <div className="mt-3 space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
                onClick={() => handleTransactionClick(transaction)}
              >
             <div>
  <h2 className="text-lg font-medium">{transaction.beneficiary}</h2>
  <p className="text-md font-semibold">{transaction.bankName}</p> {/* Change <h2> to <p> or another tag */}
  <p className="text-sm text-gray-600">
    {new Date(transaction.date).toLocaleString()}
  </p>
  <p className="text-sm text-gray-600">{transaction.remark}</p>
  <p>{transaction.type}</p>
</div>

                <p
                  className={`  ${
                    transaction.amount.startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))
  )}
</div>


<div className="sticky bottom-0 left-0 w-full bg-white shadow-md px-2 sm:px-4 z-50 mt-11">
  <div className="relative w-full flex flex-col">
    <div className="absolute -top-1 left-0 right-0 w-full h-[3px] bg-gray-300 rounded-full">
      <div
        className="absolute h-[3px] bg-[#18A0FB] rounded-full transition-all duration-300"
        style={{
          width: "50px",
          left: activeIndex !== null ? `${indicatorPosition}px` : "0px",
          opacity: activeIndex !== null ? 1 : 0,
          transform: activeIndex !== null ? "translateX(0)" : "translateX(-25px)",
        }}
      ></div>
    </div>

    <div
      ref={containerRef}
      className="grid grid-cols-5 gap-1 sm:gap-2 text-[#7D7C93] relative py-2"
    >
      {footer.map((item, index) => (
        <Link 
          to={item.path || `/${item.title.toLowerCase()}`} 
          key={index}
          className="flex flex-col items-center cursor-pointer relative group px-1 sm:px-2 py-2"
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div
            ref={(el) => (itemsRef.current[index] = el)}
            className="flex flex-col items-center"
          >
            <h1
              className={`transition-all duration-300 ${
                activeIndex === index
                  ? "bg-gradient-to-l from-[#18A0FB] to-[#0A3A5A] bg-clip-text text-transparent"
                  : "text-[#7D7C93]"
              } text-xl sm:text-2xl font-bold`}
            >
              {item.icon}
            </h1>
            <h1
              className={`transition-all duration-300 mt-1 text-xs sm:text-sm font-medium ${
                activeIndex === index
                  ? "bg-gradient-to-l from-[#18A0FB] to-[#0A3A5A] text-transparent bg-clip-text"
                  : "text-[#7D7C93]"
              }`}
            >
              {item.title}
            </h1>
          </div>
        </Link>
      ))}
    </div>
  </div>
  </div>
      </div>
    </div>
  );
};

export default Homescreen1;
