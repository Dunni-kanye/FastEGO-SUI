import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../Page/TransactionSlice";

const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});

export default store;
