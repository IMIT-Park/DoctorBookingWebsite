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
        <div className="booking_container">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              +91
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <button onClick={() => navigate("/booking/otp-verification")}>
            Verify
          </button>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default NumberVerification;
