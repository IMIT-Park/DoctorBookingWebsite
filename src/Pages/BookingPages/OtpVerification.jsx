import React from "react";
import Spacing from "../../Components/Spacing/Spacing";
import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <CustomStepper activeStep={2} completedSteps={[1]} />
        <div className="booking_container">
          <button onClick={() => navigate("/booking/patient-details")}>
            Confirm
          </button>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default OtpVerification;
