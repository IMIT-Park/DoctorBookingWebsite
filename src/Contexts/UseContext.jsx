import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const [bookingCompleted, setBookingCompleted] = useState(() => {
    const savedbookingCompleted = sessionStorage.getItem("bookingCompleted");
    return savedbookingCompleted ? JSON.parse(savedbookingCompleted) : null;
  });

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
          created_by:"",
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

  useEffect(() => {
    sessionStorage.setItem(
      "bookingCompleted",
      JSON.stringify(bookingCompleted)
    );
  }, [bookingCompleted]);

  return (
    <UserContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        userDetails,
        setUserDetails,
        bookingDetails,
        setBookingDetails,
        bookingCompleted,
        setBookingCompleted,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
