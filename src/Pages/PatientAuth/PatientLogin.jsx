import React from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PatientLogin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <div className="booking_container patient_login_container">
          <div className="booking_form_card">
            <div className="patient_details_wrapper">
              <div className="patient_login_card_header">
                <p className="booking_confirmation_card_title">Login</p>
              </div>
              <div className="">
                <div>
                  <Spacing lg={35} md={20} />
                  <div class="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="User Name"
                    />
                  </div>
                  <div class="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Password"
                    />
                  </div>

                  <div className="book_as_guest_wrapper">
                    <div className="book_as_guest"  onClick={() =>
                        navigate("/patient-login/book-as-guest")
                      }>
                      Book as Guest
                      <span className="register_divider">|</span>
                    </div>
                    <div
                      className="register"
                      onClick={() =>
                        navigate("/patient-login/patient-register")
                      }
                    >
                      Register
                    </div>
                  </div>

                  <Spacing lg={25} md={25} />
                  <div className="patient_login_btn_wrapper">
                    <button className="patient_login_btn">Login</button>
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

export default PatientLogin;
