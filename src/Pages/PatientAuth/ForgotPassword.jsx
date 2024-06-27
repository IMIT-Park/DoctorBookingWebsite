import React from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <div className="booking_container patient_login_container">
          <div className="booking_form_card">
            <div className="patient_details_wrapper">
              <div className="patient_login_card_header">
                <p className="password_reset">Password Reset</p>
              </div>
              <Spacing lg={25} md={20} />
              <label className="email_to_recover mb-4">
                <span>Enter your email to recover your password</span>
              </label>
              <div class="mb-2">
                <input
                  type="text"
                  className="form-control "
                  id="email"
                  placeholder="Enter Email"
                  
                />
              </div>

              <Spacing lg={40} md={30} />
              <div className="recover_btn_wrapper">
                <button
                  className="booking_form_card_btn"
                  //   onClick={() => navigate("/booking/booking-confirmation")}
                >
                  Recover
                </button>
              </div>

              <div
                className="Back_to_Login"
                onClick={() => navigate("/patient-login")}
              >
                Back to Login
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default ForgotPassword;
