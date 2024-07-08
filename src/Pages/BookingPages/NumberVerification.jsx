import React, { useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NumberVerification = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePhoneNumber = () => {
    const phonePattern = /^[6-9]\d{9}$/;
    return phonePattern.test(phoneNumber);
  };

  console.log(validatePhoneNumber());
  const sendPhoneNumber = async (e) => {
    // e.preventDefault();

    // if (!phoneNumber) {
    //   toast.warning("Please enter your phone number");
    //   return;
    // }

    // if (!validatePhoneNumber()) {
    //   toast.error("Please enter a valid phone number");
    //   return;
    // }
    // setLoading(true);

    // try {
    //   const response = await axiosApi.post("v1/patient/getpatient", {
    //     phone: phoneNumber,
    //   });

    //   console.log(response);

    //   if (response.status === 201) {
        navigate("/booking/otp-verification");
    //   }
    // } catch (error) {
    //   toast.error("An error occurred while verifying the phone number");
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
    <ToastContainer autoClose={2000}/>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <CustomStepper activeStep={1} completedSteps={[]} />
        <Spacing lg={50} md={20} />
        <div className="booking_container">
          <div className="booking_form_card">
            <form onSubmit={sendPhoneNumber} className="booking_form">
              <Spacing lg={100} md={50} />
              <h3 className="booking_form_card_title">Verify your number</h3>
              <Spacing lg={15} md={10} />
              <div className="input-group">
                <span className="input-group-text" id="basic-phone">
                  +91
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone"
                  aria-label="Phone"
                  aria-describedby="basic-phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <Spacing lg={40} md={30} />
              <div className="booking_form_card_btn_wrapper">
                <button
                  type="submit"
                  className="booking_form_card_btn"
                >
                  {/* Verify */}
                  {loading ? "Verifying..." : "Verify"}
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
