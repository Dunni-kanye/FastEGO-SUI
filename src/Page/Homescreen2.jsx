import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiHide ,BiShow} from "react-icons/bi";
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
import { GiCoins, GiMoneyStack } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import {parse, format} from "date-fns";


const Homescreen2 = ({ transactions }) => {
    
    const navigate = useNavigate();
    const [transaction, setTransactionList] = useState([]);


    const transactionList = [
        {
          id: 1,
          amount: "+₦2,500.00",
          beneficiary: "NGOZI UCHE",
          bank: "UNITED BANK OF AFRICA PLC",
          accountNumber: "2007895421",
          type: "INTER-BANK",
          remarks: "Money for transport",
          reference: "NGS000000667911237829202",
          status: "Transfer Successful",
          date: "Apr 23, 2025, 12:35PM",
        },
        {
          id: 2,
          amount: "-₦5,000.00",
          beneficiary: "John Doe",
          bank: "Zenith Bank",
          accountNumber: "1002345678",
          type: "INTRA-BANK",
          remarks: "Payment for goods",
          reference: "NGS000000667911237829203",
          status: "Transfer Pending",
          date: "Apr 24, 2025, 10:15AM",
        },
        {
          id: 3,
          amount: "+₦10,000.00",
          beneficiary: "Grace Adebayo",
          bank: "Access Bank",
          accountNumber: "3004567890",
          type: "INTER-BANK",
          remarks: "Salary Payment",
          reference: "NGS000000667911237829204",
          status: "Transfer Successful",
          date: "Apr 25, 2025, 09:00AM",
        },
        {
          id: 4,
          amount: "-₦1,200.00",
          beneficiary: "Supermart NG",
          bank: "GTBank",
          accountNumber: "4005678901",
          type: "POS PAYMENT",
          remarks: "Groceries Purchase",
          reference: "NGS000000667911237829205",
          status: "Transfer Successful",
          date: "Apr 26, 2025, 03:45PM",
        },
        {
          id: 5,
          amount: "+₦15,500.00",
          beneficiary: "Michael Johnson",
          bank: "First Bank",
          accountNumber: "5006789012",
          type: "INTER-BANK",
          remarks: "Loan Repayment",
          reference: "NGS000000667911237829206",
          status: "Transfer Successful",
          date: "Apr 27, 2025, 08:20AM",
        },
        {
          id: 6,
          amount: "-₦800.00",
          beneficiary: "Airtime Purchase",
          bank: "MTN Mobile",
          accountNumber: "N/A",
          type: "Airtime",
          remarks: "Airtime Recharge",
          reference: "NGS000000667911237829207",
          status: "Transfer Successful",
          date: "Apr 28, 2025, 07:15PM",
        },
      ];
      console.log("Transaction List:", transactionList);

      
    useEffect(() => {
      setTransactionList(transactions);
    }, [transactions]);

    const handleTransactionClick = (transaction) => {
        navigate("/home3", { state: transaction });
      };
   
const handleFooterClick = (index) => {
  setActiveIndex(index);
};

const [balance, setBalance] = useState(50000);
const [lastUpdated, setLastUpdated] = useState(new Date());


const updateBalance = (amount) => {
  setBalance((prevBalance) => prevBalance + amount);
  setLastUpdated(new Date()); 
};

const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const [activeIndex, setActiveIndex] = useState(null);

      const [indicatorPosition, setIndicatorPosition] = useState(0);
      const itemsRef = useRef([]);
      const containerRef = useRef(null);
      useEffect(() => {
        const updatePosition = () => {
          if (activeIndex !== null && 
              itemsRef.current[activeIndex] && 
              containerRef.current) {
            
            const item = itemsRef.current[activeIndex];
            const container = containerRef.current;
            
            const itemRect = item.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            const position = itemRect.left - containerRect.left + (itemRect.width / 2) - 25;
            setIndicatorPosition(position);
          }
        };
    
        updatePosition();
        
      
        window.addEventListener('resize', updatePosition);
        return () => window.removeEventListener('resize', updatePosition);
      }, [activeIndex]);
    
      const sections = [
        {
          title: "Add Money",
          description: "Get more from your account",
          icon: <GiCoins />
        },
        {
          title: "Create a debit card",
          description: "Get more from your account",
          icon: <PiCreditCard />
        },
        {
          title: "Earn ₦2,000 for inviting friends to FastEGO",
          description: "Get more from your account",
          icon: <GiMoneyStack />
        },
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
        { title: "More", icon: <FiGrid /> },
      ];
   
      const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date";
      
        try {
          const parsedDate = parse(dateString, "MMM dd, yyyy, hh:mma", new Date());
          
          return format(parsedDate, "EEE, MMM dd, yyyy, hh:mm a"); 
        } catch (error) {
          console.error("Error parsing date:", dateString, error);
          return "Invalid Date";
        }
      };
      
      const groupedTransactions = transactionList?.reduce((acc, transaction) => {
        if (!transaction || !transaction.date) return acc; 
        const date = formatDate(transaction.date);
        if (!acc[date]) acc[date] = [];
        acc[date].push(transaction);
        
        return acc;
      }, {});
      
      console.log("Grouped Transactions:", groupedTransactions); 
      
   
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 py-6 w-full max-w-screen-xl mx-auto">
      <div className="relative w-full max-w-5xl min-h-[50vh] bg-gradient-to-l from-[#22A1F7] to-[#002F73] rounded-tl-3xl rounded-tr-3xl shadow-lg p-6">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <FaRegUserCircle className="text-2xl lg:text-4xl" />
            <div>
              <h1 className="text-lg lg:text-2xl font-semibold">Hi, Mystery Miracle</h1>
              <h3 className="text-sm lg:text-lg font-light">Welcome,lets start making payments</h3>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <BiHide className="text-2xl lg:text-3xl cursor-pointer" />
            <IoMdNotificationsOutline className="text-2xl lg:text-3xl cursor-pointer" />
          </div>
        </div>

        <div className="text-white mt-6">
          <h2 className="font-thin text-base lg:text-xl">Total Balance</h2>
          <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-4xl font-bold">₦{balance.toLocaleString()}</h1>
            <button className="w-12 h-12 lg:w-16 lg:h-16 shadow-md rounded-full flex items-center justify-center">
              <HiDotsHorizontal className="text-2xl lg:text-3xl" />
            </button>
          </div>
          <h4 className="font-thin text-sm lg:text-lg">
        Last updated at {formatTime(lastUpdated)}
      </h4>
        </div>
           
                <div className="absolute bottom-0 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[95%] mx-auto h-14 md:h-16 lg:h-20 bg-[#3D87E6] rounded-tl-2xl rounded-tr-2xl overflow-hidden flex justify-between items-center px-6">
                  <h1 className="text-white text-[20px] font-medium">Swift Pay Bank</h1>
                  <div className="w-40 h-40 bg-[#3D4364] rounded-full absolute -top-10 right-16 translate-x-[50%]  ">
          <img src={logo} alt="Logo" className="w-16 h-40 object-contain ml-10" />
        </div>
        
                </div>
      </div>
           <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center">
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                <div className="flex flex-col items-center">
                <button className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center text-[#235697]">
        <IoMdAddCircleOutline className="text-3xl md:text-4xl" />
      </button>
      
                  <h1 className="mt-2 text-sm font-medium text-gray-700">Add Money</h1>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center text-[#235697]">
                    <PiCreditCard className="text-3xl md:text-4xl" />
                  </button>
                  <h1 className="mt-2 text-sm font-medium text-gray-700">My Cards</h1>
                </div>
                <div className="flex flex-col items-center">
                  <button className="w-[80px] h-[80px] bg-[#F1F5F9] rounded-full flex justify-center items-center text-[#235697]">
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
            <h1 className={`transition-all duration-300 ${
    activeIndex === index ? "text-[#18A0FB]" : "text-[#527aae]"
  } text-xl sm:text-4xl font-bold`}>
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
              <p className="text-sm text-[#7D7C93] ">{section.description}</p>
            </div>
          </div>
  
         
          <MdNavigateNext className="text-2xl text-[#7D7C93]" />
        </div>
  
        {index < sections.length - 1 && <div className="w-full h-px bg-gray-100"></div>}
      </div>
    ))}
  </div>
  <p className="mt-6 text-[#3A3C4C] font-semibold text-lg">Quick access</p>

<div className="flex grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-5">
  {access.map((item, index) => (
    <div key={index} className="flex items-center">
      
      <div className="w-full max-w-[120px] sm:max-w-[160px] md:max-w-[180px] h-10 bg-[#F1F5F9] rounded-lg flex  justify-center items-center px-3 gap-2">
        {item.icon}
        <h1 className="text-xs sm:text-sm md:text-base text-[#3B3D4B] whitespace-nowrap">{item.title}</h1>
      </div>
    </div>
  ))}
</div>
  </div>
  
  <div className="mt-8 sm:mt-10 md:mt-12 w-full">
  {Object.entries(groupedTransactions).map(([date, transactions]) => (
    <div key={date} className="mt-6">
      <h1 className="text-[#3A3C4C] text-xl font-semibold">{date}</h1> 
      <div className="mt-3 space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            onClick={() => handleTransactionClick(transaction)}
            className="flex items-center justify-between px-4 py-3 bg-gray-100 rounded-lg shadow"
          >
            <div>
              <h2 className="text-lg font-medium">{transaction.beneficiary}</h2>
              <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
            </div>
            <p className={`text-lg font-bold ${transaction.amount.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
              {transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>


<div className="mt-5 mb-[80px]"> {/* Add bottom margin to create space */}
  <button className="w-[335px] h-[48px] bg-gradient-to-l from-[#22A1F7] to-[#002F73] rounded-lg text-white">
    See All Transactions
  </button>
</div>

<div className="fixed bottom-0 left-0 w-full bg-white shadow-md px-2 sm:px-4 z-50">
  <div className="relative w-full flex flex-col">
    <div className="absolute -top-1 left-0 right-0 w-full h-[3px] bg-gray-300 rounded-full">
      <div
        className="absolute h-[3px] bg-[#18A0FB] rounded-full transition-all duration-300"
        style={{
          width: "50px",
          left: activeIndex !== null ? `${indicatorPosition}px` : "0px",
          opacity: activeIndex !== null ? 1 : 0,
          transform: activeIndex !== null ? "translateX(0)" : "translateX(-25px)"
        }}
      ></div>
    </div>

    <div ref={containerRef} className="grid grid-cols-5 gap-1 sm:gap-2 text-[#7D7C93] relative py-2">
      {footer.map((item, index) => (
        <div
          key={index}
          ref={el => (itemsRef.current[index] = el)}
          className="flex flex-col items-center cursor-pointer relative group px-1 sm:px-2 py-2"
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
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
      ))}
    </div>
  </div>
</div>

    </div>
  );
};

export default Homescreen2;
