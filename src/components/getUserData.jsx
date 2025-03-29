
export function getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(user => user.email === email);
  }
  
  export function updateAllUserStores(userData) {
   
    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("user", JSON.stringify(userData));
    
   
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(user => 
      user.email === userData.email ? userData : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    return userData;
  }
  
  export function standardizeUserFields(user) {
    return {
      ...user,
      email: user.email || "",
      firstname: user.firstname || user.firstName || "",
      lastname: user.lastname || user.lastName || "",
      username: user.username || "",
      name: user.name || `${user.firstname || ""} ${user.lastname || ""}`.trim(),
      accountNumber: user.accountNumber || "",
      balance: user.balance || 0,
      transactions: user.transactions || []
    };
  }
