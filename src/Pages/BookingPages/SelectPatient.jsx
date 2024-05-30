import React from "react";
import Spacing from "../../Components/Spacing/Spacing";
import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import { useNavigate } from "react-router-dom";

const SelectPatient = () => {
  const navigate = useNavigate();
  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <CustomStepper activeStep={3} completedSteps={[1, 2]} />
        <div className="booking_container">
          <button
            className="booking_form_card_btn"
            onClick={() => navigate("/booking/booking-confirmation")}
          >
            Verify
          </button>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default SelectPatient;
