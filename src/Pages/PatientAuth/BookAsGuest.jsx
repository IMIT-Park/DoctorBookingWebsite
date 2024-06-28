import React from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BookAsGuest = () => {
  const navigate = useNavigate();

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <div className="booking_container patient_login_container">
          <div className="booking_form_card">
            <div className="patient_details_wrapper">
              <div className="patient_login_card_header">
                <p className="book_as_guest_title">Book as Guest</p>
              </div>
              <Spacing lg={35} md={20} />
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-phone">
                  +91
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone"
                  aria-label="Phone"
                  aria-describedby="basic-phone"
                />
              </div>

              <Spacing lg={40} md={30} />
              <div className="patient_login_btn_wrapper">
                <button
                  className="booking_form_card_btn"
                //   onClick={() => navigate("/booking/booking-confirmation")}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default BookAsGuest;
