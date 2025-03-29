import { useState, useEffect } from "react";
import HomeScreen1 from "../Page/Homescreen1";
import HomeScreen2 from "../Page/Homescreen2";

const Home = () => {
  // Check if transactions exist in localStorage
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);

  // Function to add a new transaction (transfer, card, bill payment)
  const addTransaction = (amount, type) => {
    const newTransaction = {
      id: Date.now(),
      amount,
      type,  // "Transfer" / "Card Payment" / "Bill Payment"
      date: new Date().toLocaleString(),
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions)); // Save transactions
  };

  return (
    <div>
      {transactions.length === 0 ? (
        <HomeScreen1 />
      ) : (
        <HomeScreen2 transactions={transactions} addTransaction={addTransaction} />
      )}
    </div>
  );
};

export default Home;
