import React from "react";
import Spacing from "../../Components/Spacing/Spacing";
import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <CustomStepper activeStep={4} completedSteps={[1, 2, 3]} />
        <Spacing lg={50} md={20} />
        <div className="booking_container">
          <div className="booking_form_card">
            <div className="booking_confirmation_container">
              <Spacing lg={30} md={50} />
              <div className="booking_confirmation_card_header">
                <p className="booking_confirmation_card_title">
                  Booking Confirmed
                </p>
                <img
                  src="/images/share.svg"
                  alt="shape3"
                  className="booking_share_icon"
                />
              </div>

              <p className="booking_confirmation_booking_id">
                Booking ID : 3516868
              </p>

              <Spacing lg={40} md={30} />
              <div>
                <img
                  src="/images/verified.png"
                  alt="shape3"
                  className="booking_varified"
                />
              </div>

              <Spacing lg={40} md={30} />

              <div className="booking_confirmation_details">
                <div className="booking_details_wrapper">
                  <div className="booking_confirmation_detail_label">
                    Doctor's Name
                    <span>:</span>
                  </div>
                  <div className="booking_confirmation_value">
                    Dr. Nikhil M 
                  </div>
                </div>

                <div className="booking_details_wrapper">
                  <div className="booking_confirmation_detail_label">
                    Clinic Name
                    <span>:</span>
                  </div>
                  <div className="booking_confirmation_value">
                    Manakadans Dental Clinic
                  </div>
                </div>

                <div className="booking_details_wrapper">
                  <div className="booking_confirmation_detail_label">
                    Date
                    <span>:</span>
                  </div>
                  <div className="booking_confirmation_value">15/05/2024</div>
                </div>

                <div className="booking_details_wrapper">
                  <div className="booking_confirmation_detail_label">
                    Booking Time
                    <span>:</span>
                  </div>
                  <div className="booking_confirmation_value">11:30 AM</div>
                </div>
              </div>


              <Spacing lg={40} md={30} />
              <div className="booking_form_card_btn_wrapper">
                <button
                  className="booking_form_card_btn"
                >
                  Continue
                </button>
                <button
                  className="booking_form_card_btn"
                >
                  Download
                </button>
              </div>
              <Spacing lg={40} md={30} />
            </div>
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default BookingConfirmation;
