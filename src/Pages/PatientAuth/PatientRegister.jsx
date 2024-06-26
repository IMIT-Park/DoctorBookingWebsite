import React, { useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { Navigate } from "react-router-dom";
import Social from "../../Components/Social/Social";
import Eye from "../../Components/PasswordEye/Eye";
// import { useNavigate } from "react-router-dom";

const PatientRegister = () => {
  //   const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <div className="booking_container patient_login_container">
          <div className="booking_form_card">
            <div className="patient_details_wrapper">
              <div className="patient_login_card_header">
                <p className="booking_confirmation_card_title">Register</p>
              </div>
              <div className="">
                <div>
                  <Spacing lg={35} md={20} />
                  <div class="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                    />
                  </div>
                  <div class="input-group mb-2">
                    <span class="input-group-text" id="basic-phone">
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
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <div
                      className="icon-container"
                      // onClick={toggleShowPassword}
                    >
                      <Eye />
                    </div>
                  </div>
                  <div class="mb-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="confirm_password"
                      placeholder="Confirm Password"
                    />
                  </div>

                  <Spacing lg={40} md={30} />
                  <div className="booking_form_card_btn_wrapper">
                    <button
                      className="booking_form_card_btn"
                      //   onClick={() => navigate("/booking/booking-confirmation")}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default PatientRegister;
