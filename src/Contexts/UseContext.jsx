import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(() => {
    const savedBookingDetails = sessionStorage.getItem("bookingDetails");
    return savedBookingDetails
      ? JSON.parse(savedBookingDetails)
      : {
          doctor_id: null,
          clinic_id: null,
          patient_id: null,
          schedule_date: "",
          schedule_time: "",
          type: "application",
          DoctorTimeSlot_id: null,
        };
  });

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

  useEffect(() => {
    sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
  }, [bookingDetails]);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails, bookingDetails, setBookingDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
