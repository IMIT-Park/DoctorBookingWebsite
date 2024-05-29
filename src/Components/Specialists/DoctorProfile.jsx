import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import CustomStepper from "../CustomStepper/CustomStepper";

const DoctorProfile = ({ data }) => {
  const navigate = useNavigate();
  const { img, name, designation, desc, special, contactInfo, shedule } = data;

  const [isActive, setIsActive] = useState("biography");

  return (
    <>
      <section className="st-shape-wrap">
        <div className="st-shape6">
          <img src="/shape/contact-shape3.svg" alt="shape3" />
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
        <div className="container">
          <div className="details_wrapper">
            <div className="profile_details_container">
              <div className="profile_left_section">
                <div className="profile_container">
                  <img src={img} alt={img} className="profile_container_img" />
                </div>
                <div>
                  <h3 className="doctor_name">{parser("Dr. Nikhil M P")}</h3>
                  <div className="doctor_designation">
                    {parser("Dental Surgeon")}
                  </div>
                  <div className="doctor_desc">
                    {parser("10 Years Experience")}
                  </div>
                </div>
              </div>
              <div className="profile_right_section">
                <div className="profile_clinic_name">
                  Manakadans Dental Clinic Irinjalakuda
                  <button className="profile_direction_btn">
                    Get Directions
                  </button>
                </div>
                <button className="profile_report_btn">Report</button>
              </div>
            </div>
            <div className="booking_title_container">
              Booking Availability
              <div className="row_border" />
            </div>
            <div className="date_picker_container">
              <Flatpickr
                options={{
                  defaultDate: new Date(),
                  inline: true,
                  dateFormat: "d-m-Y",
                }}
              />
            </div>
            <button onClick={()=> navigate("/booking/number-verification")}>Book Now</button>
            <CustomStepper activeStep={2} completedSteps={[1]}/>
          </div>
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
      </section>
    </>
  );
};

export default DoctorProfile;
