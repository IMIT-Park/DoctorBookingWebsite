import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Spacing from "../Spacing/Spacing";
import ComplaintModal from "../ComplaintModal/ComplaintModal";
import { axiosApi, imageBase_URL } from "../../axiosInstance";

const DoctorProfile = ({ doctorDetails, doctorClinics, loading }) => {
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reportInput, setReportInput] = useState({
    email: "",
    phone: "",
    content: "",
    doctor_id: doctorDetails && doctorDetails?.doctor_id,
  });

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

  const handleReportClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // -- Add complaint function --
  const addComplaint = async () => {
    if (!reportInput.email || !reportInput.phone || !reportInput.content) {
      return true;
    }
    console.log(reportInput);
    setButtonLoading(true);
    try {
      const response = await axiosApi.post(
        "/v1/complaint/sendComplaint",
        reportInput
      );
      console.log("Complaint submitted successfully:", response.doctorDetails);
      setReportInput({
        email: "",
        phone: "",
        content: "",
        doctor_id: doctorDetails && doctorDetails.doctor_id,
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setButtonLoading(false);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    addComplaint();
  };

  console.log(doctorDetails);

  return (
    <>
      <section className="st-shape-wrap">
        <div className="st-shape6">
          <img src="/shape/contact-shape3.svg" alt="shape3" />
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
        <div className="container">
          <div className="details_wrapper">
            {loading ? (
              <span className="loader"></span>
            ) : (
              <>
                <div className="profile_details_container">
                  <div className="profile_left_section">
                    <div className="profile_container">
                      <img
                        src={
                          imageBase_URL +
                          (doctorDetails && doctorDetails?.photo)
                        }
                        alt={"profile"}
                        className="profile_container_img"
                      />
                    </div>
                    <div>
                      <h3 className="doctor_name">
                        {doctorDetails && doctorDetails.name
                          ? parser(doctorDetails?.name)
                          : ""}
                      </h3>
                      <div className="doctor_designation">
                        {doctorDetails && doctorDetails.specialization
                          ? parser(doctorDetails.specialization)
                          : ""}
                      </div>
                      <div className="doctor_desc">
                        {doctorDetails && doctorDetails.qualification
                          ? parser(doctorDetails.qualification)
                          : ""}
                      </div>
                    </div>
                  </div>
                  <button
                    className="profile_report_btn"
                    onClick={handleReportClick}
                  >
                    Report
                  </button>
                  {/* <div className="profile_right_section">
                    <div className="profile_clinic_name">
                      {doctorDetails && doctorDetails.Clinic && doctorDetails.Clinic.name
                        ? parser(doctorDetails.Clinic.name)
                        : ""}
                      <button className="profile_direction_btn">
                        Get Directions
                      </button>
                    </div>
                    <button
                      className="profile_report_btn"
                      onClick={handleReportClick}
                    >
                      Report
                    </button>
                  </div> */}
                </div>
                <div className="booking_title_container">
                  Clinic Lists
                  <div className="row_border" />
                </div>
                <div className="dr_clinic_card_container">
                  <div className="dr_clinic_card active">
                    <img
                      src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Clinic"
                      className="dr_clinic_photo"
                    />
                    <div>
                      <h4 className="dr_clinic_name">Stefin Dental Clinic</h4>
                      <p className="dr_clinic_place">Irinjalakuda</p>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/left-arrow.svg`}
                      alt="Back"
                      className="dr_clinic_arrow"
                    />
                  </div>

                  <div className="dr_clinic_card">
                    <img
                      src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Clinic"
                      className="dr_clinic_photo"
                    />
                    <div>
                      <h4 className="dr_clinic_name">Stefin Dental Clinic</h4>
                      <p className="dr_clinic_place">Irinjalakuda</p>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/vector-down.svg`}
                      alt="Back"
                      className="dr_clinic_arrow"
                    />
                  </div>

                  <div className="dr_clinic_card">
                    <img
                      src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Clinic"
                      className="dr_clinic_photo"
                    />
                    <div>
                      <h4 className="dr_clinic_name">Stefin Dental Clinic</h4>
                      <p className="dr_clinic_place">Irinjalakuda</p>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/vector-down.svg`}
                      alt="Back"
                      className="dr_clinic_arrow"
                    />
                  </div>

                  <div className="dr_clinic_card">
                    <img
                      src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Clinic"
                      className="dr_clinic_photo"
                    />
                    <div>
                      <h4 className="dr_clinic_name">Stefin Dental Clinic</h4>
                      <p className="dr_clinic_place">Irinjalakuda</p>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/vector-down.svg`}
                      alt="Back"
                      className="dr_clinic_arrow"
                    />
                  </div>

                  <div className="dr_clinic_card">
                    <img
                      src="https://images.pexels.com/photos/65438/pexels-photo-65438.jpeg?auto=compress&cs=tinysrgb&w=600"
                      alt="Clinic"
                      className="dr_clinic_photo"
                    />
                    <div>
                      <h4 className="dr_clinic_name">Stefin Dental Clinic 
                      </h4>
                      <p className="dr_clinic_place">Irinjalakuda</p>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL}/icons/vector-down.svg`}
                      alt="Back"
                      className="dr_clinic_arrow"
                    />
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
              </>
            )}
          </div>
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
      </section>
      <ComplaintModal
        showModal={showModal}
        handleClose={handleCloseModal}
        reportInput={{
          ...reportInput,
          doctor_id: doctorDetails && doctorDetails.doctor_id,
        }}
        setReportInput={setReportInput}
        handleComplaintSubmit={handleComplaintSubmit}
        loading={buttonLoading}
      />
    </>
  );
};

export default DoctorProfile;
