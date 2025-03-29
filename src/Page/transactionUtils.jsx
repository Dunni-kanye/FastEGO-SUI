import React from 'react';

export const getUserTransactions = (userId) => {
    try {
      const key = `transactions-${userId}`;
      const transactions = JSON.parse(localStorage.getItem(key)) || [];
      return transactions.map(txn => ({
        ...txn,
        amount: txn.amount?.replace(/^(-₦)+/, "-₦") || "₦0"
      }));
    } catch (error) {
      console.error("Error loading transactions:", error);
      return [];
    }
  };
  
  // transactionUtils.js
export const savedUserTransaction = (userId, transaction) => {
    try {
      const key = `transactions-${userId}`;
      const currentTransactions = JSON.parse(localStorage.getItem(key)) || [];
      const updatedTransactions = [transaction, ...currentTransactions];
      localStorage.setItem(key, JSON.stringify(updatedTransactions));
      return true;
    } catch (error) {
      console.error("Error saving transaction:", error);
      return false;
    }
  };