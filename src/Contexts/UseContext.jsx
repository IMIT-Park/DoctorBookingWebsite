import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");

    if (userData) {
      try {
        setUserDetails(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data from session storage:", error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
