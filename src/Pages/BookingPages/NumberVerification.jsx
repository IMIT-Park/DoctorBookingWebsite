import React from "react";
import Spacing from "../../Components/Spacing/Spacing";
import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import { useNavigate } from "react-router-dom";

const NumberVerification = () => {
  const navigate = useNavigate();
  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <CustomStepper activeStep={1} completedSteps={[]} />
        <Spacing lg={50} md={20} />
        <div className="booking_container">
          <div className="booking_form_card">
            <form className="booking_form">
              <Spacing lg={100} md={50} />
              <h3 className="booking_form_card_title">Verify your number</h3>
              <Spacing lg={15} md={10} />
              <div class="input-group">
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
              <Spacing lg={40} md={30} />
              <div className="booking_form_card_btn_wrapper">
                <button
                  className="booking_form_card_btn"
                  onClick={() => navigate("/booking/otp-verification")}
                >
                  Verify
                </button>
              </div>
              <Spacing lg={80} md={40} />
            </form>
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default NumberVerification;
