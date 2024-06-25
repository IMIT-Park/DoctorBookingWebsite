import React, { useEffect, useState } from "react";
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
  const [selectedClinic, setSelectedClinic] = useState(null);
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

  useEffect(() => {
    const handlePageScroll = () => {
      const body = document.querySelector("body");
      const html = document.querySelector("html");
      if (showModal) {
        const scrollY = window.scrollY;
        body.style.top = `-${scrollY}px`;
        body.style.position = "fixed";
        body.style.width = "100%";
      } else {
        const scrollY = body.style.top;
        body.style.position = "";
        body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
    handlePageScroll();
    return () => {
      document.querySelector("body").style.position = "";
      document.querySelector("body").style.top = "";
    };
  }, [showModal]);


  useEffect(() => {
    if (doctorClinics && doctorClinics.length > 0) {
      setSelectedClinic(doctorClinics[0]);
    }
  }, [doctorClinics]);

  const handleSelect = (time, disabled) => {
    if (!disabled) {
      setSelectedTime(time);
    }
  };

  // clinic select funtion
  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
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

  const handleGetLocation = (googleLocation) => {
    if (!googleLocation) {
      return;
    }

    try {
      const decodedLocation = googleLocation.replace(/\\/g, "");

      const cleanedGoogleLocation =
        decodedLocation.startsWith('"') && decodedLocation.endsWith('"')
          ? decodedLocation.slice(1, -1)
          : decodedLocation;

      const locationData = JSON.parse(cleanedGoogleLocation);

      const cleanedLocationData = {};
      Object.keys(locationData).forEach((key) => {
        const trimmedKey = key.trim();
        cleanedLocationData[trimmedKey] = locationData[key];
      });

      const { lat, long } = cleanedLocationData;

      if (lat && long) {
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
        window.open(googleMapsUrl, "_blank");
      } else {
        console.log("Invalid location data");
      }
    } catch (error) {
      console.error("Failed to parse location data", error);
    }
  };

  return (
    <>
      <section className="st-shape-wrap">
        <div className="st-shape6">
          <img src="/shape/contact-shape3.svg" alt="shape3" />
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
        <div className="container">
          {loading ? (
            <div className="custom-loader_container">
              <span className="custom-loader"></span>
            </div>
          ) : (
            <>
              {doctorDetails ? (
                <div className="details_wrapper">
                  <div className="profile_details_container">
                    <div className="profile_left_section">
                      <div className="profile_container">
                        <img
                          src={
                            doctorDetails?.photo
                              ? imageBase_URL + doctorDetails?.photo
                              : `${process.env.PUBLIC_URL}/images/empty-user.png`
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
                  </div>
                  <div className="booking_title_container">
                    Clinic Lists
                    <div className="row_border" />
                  </div>
                  <div className="dr_clinic_card_container">
                    {doctorClinics?.map((clinic) => (
                      <div
                        key={clinic?.clinic_id}
                        className={`dr_clinic_card ${
                          selectedClinic?.clinic_id === clinic?.clinic_id &&
                          "active"
                        }`}
                        onClick={() => handleClinicSelect(clinic)}
                      >
                        <img
                          src={
                            clinic?.banner_img_url
                              ? imageBase_URL + clinic?.banner_img_url
                              : ""
                          }
                          alt="Clinic"
                          className="dr_clinic_photo"
                        />
                        <div>
                          <h4 className="dr_clinic_name">
                            {clinic?.name || ""}
                          </h4>
                          <p className="dr_clinic_place">
                            {clinic?.place || ""}
                          </p>
                        </div>
                        <img
                          src={
                            selectedClinic?.clinic_id === clinic?.clinic_id
                              ? `${process.env.PUBLIC_URL}/icons/left-arrow.svg`
                              : `${process.env.PUBLIC_URL}/icons/vector-down.svg`
                          }
                          alt=""
                          className="dr_clinic_arrow"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="booking_title_container">
                    Booking Availability
                    <div className="row_border" />
                    <button
                      type="button"
                      className="profile_direction_btn"
                      onClick={() =>
                        handleGetLocation(selectedClinic?.googleLocation)
                      }
                    >
                      Get Direction
                    </button>
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
              ) : (
                <div className="custom-loader_container">No Data Found</div>
              )}
            </>
          )}
        </div>
        <div className="st-height-b120 st-height-lg-b80" />
      </section>

      {/* report modal */}
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
