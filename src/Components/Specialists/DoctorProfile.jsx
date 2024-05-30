import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Spacing from "../Spacing/Spacing";

const DoctorProfile = () => {
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState(null);

  const morningTimes = [
    "10.00 AM",
    "10.30 AM",
    "11.00 AM",
    "11.30 AM",
    "12.00 AM",
    "12.30 AM",
  ];

  const availableTimes = [
    "10.30 AM",
    "12.30 AM",
    "2.00 PM",
    "2.30 PM",
    "3.00 PM",
  ];

  const afternooonTimes = [
    "1.00 PM",
    "1.30 PM",
    "2.00 PM",
    "2.30 PM",
    "3.00 PM",
    "3.30 PM",
    "4.00 PM",
    "4.30 PM",
    "5.00 PM",
    "5.30 PM",
    "6.00 PM",
  ];

  const handleSelect = (time, disabled) => {
    if (!disabled) {
      setSelectedTime(time);
    }
  };

  const availableDates = [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1)),
    new Date(new Date().setDate(new Date().getDate() + 3)),
  ];

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
                  <img
                    src={
                      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600"
                    }
                    alt={"profile"}
                    className="profile_container_img"
                  />
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
            <div className="date_selector_wrapper">
              <div className="date_picker_container">
                <div className="booking_title_card">Select Date</div>
                <Spacing lg={50} md={30} />

                <Flatpickr
                  options={{
                    defaultDate: new Date(),
                    inline: true,
                    dateFormat: "d-m-Y",
                    // enable: availableDates,
                  }}
                />
              </div>
              <div className="time_picker_container">
                <div className="booking_title_card">Select Time</div>
                <Spacing lg={50} md={30} />
                <h4 className="booking_time_label">Morning</h4>
                <div className="time_selector_list">
                  {morningTimes.map((time, index) => {
                    const isDisabled = !availableTimes.includes(time);
                    return (
                      <label
                        key={index}
                        className={`time_selector_btn ${
                          selectedTime === time ? "selected" : ""
                        } ${isDisabled ? "disabled" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTime === index}
                          disabled={isDisabled}
                          onChange={() => handleSelect(time, isDisabled)}
                        />
                        {time}
                      </label>
                    );
                  })}
                </div>
                <Spacing lg={40} md={20} />

                <h4 className="booking_time_label">Afternoon</h4>
                <div className="time_selector_list">
                  {afternooonTimes.map((time, index) => {
                    const isDisabled = !availableTimes.includes(time);
                    return (
                      <label
                        key={index}
                        className={`time_selector_btn ${
                          selectedTime === time ? "selected" : ""
                        } ${isDisabled ? "disabled" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTime === index}
                          disabled={isDisabled}
                          onChange={() => handleSelect(time, isDisabled)}
                        />
                        {time}
                      </label>
                    );
                  })}
                </div>
                <div className="timeSelector_labels_container">
                  <div className="timeSelector_label">
                    <div className="color_box" />
                    Selected
                  </div>
                  <div className="timeSelector_label">
                    <div className="color_box booked" />
                    Booked Slots
                  </div>
                  <div className="timeSelector_label">
                    <div className="color_box available" />
                    Available Slots
                  </div>
                </div>
              </div>
            </div>
            <Spacing lg={50} md={30} />
            <div className="booking_form_card_btn_wrapper">
              <button
                className="booking_form_card_btn"
                onClick={() => navigate("/booking/number-verification")}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
      </section>
    </>
  );
};

export default DoctorProfile;
