import React from "react";
import Spacing from "../../Components/Spacing/Spacing";
import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import { useNavigate } from "react-router-dom";
import CustomPinInput from "../../Components/CustomPinInput/CustomPinInput";

const OtpVerification = () => {
  const navigate = useNavigate();
  const handlePinComplete = (pin) => {
    navigate("/booking/select-patient");
  };
 

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <CustomStepper activeStep={2} completedSteps={[1]} />
        <Spacing lg={50} md={20} />
        <div className="booking_container">
          <div className="booking_form_card">
            <Spacing lg={25} md={50} />

            <div className="booking_form_otp_verification">
              <h3 className="booking_form_card_title">Verification</h3>
              <p className="booking_form_otp_verification_text">
                Enter the verification code we just sent on your 755983 XXXX
              </p>
              <Spacing lg={15} md={10} />
            <div className="booking_form_pin_otp">
              <CustomPinInput
                length={4}
                onComplete={handlePinComplete}
              />
             <Spacing lg={40} md={30} />
             <p className="booking_form_otp_verification_text">Didn’t received code? <span className="booking_form_otp_verification_text_resend"> Resend </span></p>
            </div>
              <Spacing lg={40} md={30} />
              <div className="booking_form_card_btn_wrapper">
                <button
                  className="booking_form_card_btn"
                  onClick={() => navigate("/booking/patient-details")}
                >
                  Confirm
                </button>
              </div>
            </div>
            <Spacing lg={80} md={40} />
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};
export default OtpVerification;
