import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Spacing from "../Spacing/Spacing";
import ComplaintModal from "../ComplaintModal/ComplaintModal";
import { axiosApi, imageBase_URL } from "../../axiosInstance";
import { formatTime } from "../../utils/FormatTime";
import { getMapLocation } from "../../utils/getLocation";
import { formatDate } from "../../utils/formatDate";
import { UserContext } from "../../Contexts/UseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorProfile = ({ doctorId, doctorDetails, doctorClinics, loading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails, bookingDetails, setBookingDetails } =
    useContext(UserContext);

  const [buttonLoading, setButtonLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [timeslotsLoading, setTimeslotsLoading] = useState(false);
  const [doctorTimeSlots, setDoctorTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [consultationLoading, setConsultationLoading] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [timeslotWarning, setTimeslotWarning] = useState("");
  const [reportInput, setReportInput] = useState({
    email: "",
    phone: "",
    content: "",
    doctor_id: doctorDetails && doctorDetails?.doctor_id,
  });
  const [bookingType, setBookingType] = useState("member");

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

  // clinic select funtion
  const handleClinicSelect = (clinic) => {
    setSelectedClinic(clinic);
    setSelectedTimeSlot(null);
    setConsultations([]);
    setSelectedConsultation(null);
  };

  const resetReportInput = () => {
    setReportInput({
      email: "",
      phone: "",
      content: "",
      doctor_id: doctorDetails && doctorDetails?.clinic_id,
    });
  };

  const handleReportClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetReportInput();
  };

  // -- Add complaint function --
  const addComplaint = async () => {
    if (!reportInput.email || !reportInput.phone || !reportInput.content) {
      return true;
    }
    setButtonLoading(true);
    try {
      const response = await axiosApi.post(
        "/v1/complaint/sendComplaint",
        reportInput
      );
      toast.success("Report Submitted Successfully");
      resetReportInput();
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

  // fetch timeslots function
  const fetchTimeSlots = async (date) => {
    setTimeslotsLoading(true);
    try {
      const response = await axiosApi.post(
        `/v1/booking/getdoctordate/${doctorId}`,
        {
          date: date,
          clinic_id: selectedClinic?.clinic_id || bookingDetails?.clinic_id,
        }
      );
      setDoctorTimeSlots(response?.data?.doctorTimeSlots);
    } catch (error) {
      if (error?.response?.status === 400) {
        setTimeslotWarning(
          error?.response?.data?.error
            ? error?.response?.data?.error
            : "DoctorProfile.jsx:141 Doctor is not available on this date."
        );
      } else {
        setTimeslotWarning(
          "DoctorProfile.jsx:141 Doctor is not available on this date."
        );
      }
      setDoctorTimeSlots([]);
      console.error(error?.response?.data?.error);
    } finally {
      setTimeslotsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClinic?.clinic_id || bookingDetails?.clinic_id) {
      fetchTimeSlots(formatDate(selectedDate));
    }
  }, [selectedClinic?.clinic_id, selectedDate]);

  // timeslot select function
  const handleSelectTimeslot = (time) => {
    setSelectedTimeSlot(time);
  };

  const handleDateChange = (selectedDates) => {
    const date = selectedDates[0];
    setSelectedDate(formatDate(date));
    setSelectedTimeSlot(null);
    setConsultations([]);
    setSelectedConsultation(null);
  };

  // fetch consultations function
  const fetchConsultations = async (date) => {
    setConsultationLoading(true);
    try {
      const response = await axiosApi.post(
        `/v1/booking/getconsulation/${doctorId}`,
        {
          DoctorTimeSlot_id: selectedTimeSlot?.timeSlot?.DoctorTimeSlot_id,
          date: date,
          clinic_id: selectedClinic?.clinic_id || bookingDetails?.clinic_id,
        }
      );
      setConsultations(response?.data?.consultationSlots);
    } catch (error) {
      setDoctorTimeSlots([]);
      console.error(error?.response?.data?.error);
    } finally {
      setConsultationLoading(false);
    }
  };

  useEffect(() => {
    if (
      (selectedClinic?.clinic_id &&
        selectedTimeSlot?.timeSlot?.DoctorTimeSlot_id) ||
      (bookingDetails?.clinic_id &&
        selectedTimeSlot?.timeSlot?.DoctorTimeSlot_id)
    ) {
      fetchConsultations(formatDate(selectedDate));
    }
  }, [selectedTimeSlot?.timeSlot?.DoctorTimeSlot_id]);

  const handleSelectConsultation = (consultation) => {
    setSelectedConsultation(consultation);
  };

  const handleBookNow = () => {
    if (!selectedClinic?.clinic_id && !bookingDetails?.clinic_id) {
      toast.warning("Please select a clinic.");
      return;
    }
    if (!selectedDate) {
      toast.warning("Please select a date.");
      return;
    }
    if (!selectedTimeSlot?.timeSlot?.DoctorTimeSlot_id) {
      toast.warning("Please select a time slot.");
      return;
    }
    if (!selectedConsultation?.slot) {
      toast.warning("Please select a consultation slot.");
      return;
    }

    setBookingDetails({
      ...bookingDetails,
      doctor_id: parseFloat(doctorId),
      clinic_id: selectedClinic?.clinic_id || bookingDetails?.clinic_id,
      schedule_date: formatDate(selectedDate),
      schedule_time: selectedConsultation?.slot,
      DoctorTimeSlot_id: selectedTimeSlot?.timeSlot?.DoctorTimeSlot_id,
      type: "application",
    });

    if (bookingType === "guest") {
      navigate("/booking/number-verification");
    } else {
      if (userDetails) {
        navigate("/booking/select-patient");
      } else {
        sessionStorage.setItem("isDoctorBooking", "isDoctorBooking");
        navigate("/patient-login", {
          state: { previousUrl: location?.pathname },
        });
      }
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
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
                  {(doctorClinics && doctorClinics?.length > 0) ||
                  bookingDetails?.clinic_id ? (
                    <>
                      {!bookingDetails?.clinic_id && (
                        <>
                          <div className="booking_title_container">
                            Clinic Lists
                            <div className="row_border" />
                          </div>
                          <div className="dr_clinic_card_container">
                            {doctorClinics?.map((clinic) => (
                              <div
                                key={clinic?.clinic_id}
                                className={`dr_clinic_card ${
                                  selectedClinic?.clinic_id ===
                                    clinic?.clinic_id && "active"
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
                                    selectedClinic?.clinic_id ===
                                    clinic?.clinic_id
                                      ? `${process.env.PUBLIC_URL}/icons/left-arrow.svg`
                                      : `${process.env.PUBLIC_URL}/icons/vector-down.svg`
                                  }
                                  alt=""
                                  className="dr_clinic_arrow"
                                />
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                      <div className="booking_title_container">
                        Booking Availability
                        <div className="row_border" />
                        {!bookingDetails?.clinic_id && (
                          <button
                            type="button"
                            className="profile_direction_btn"
                            onClick={() =>
                              getMapLocation(selectedClinic?.googleLocation)
                            }
                          >
                            Get Direction
                          </button>
                        )}
                      </div>
                      <div className="date_selector_wrapper">
                        <div className="date_picker_container">
                          <div className="booking_title_card">Select Date</div>
                          <Spacing lg={50} md={30} />

                          <Flatpickr
                            options={{
                              defaultDate: selectedDate,
                              inline: true,
                              dateFormat: "d-m-Y",
                              enableTime: false,
                            }}
                            onChange={handleDateChange}
                          />
                        </div>
                        <div className="time_picker_container">
                          <div className="booking_title_card">
                            Select Timeslot
                          </div>
                          <Spacing lg={40} md={30} />
                          {timeslotsLoading ? (
                            <div className="custom-loader_container">
                              <span className="custom-loader"></span>
                            </div>
                          ) : (
                            <>
                              {doctorTimeSlots &&
                              doctorTimeSlots?.length > 0 ? (
                                <div className="time_selector_list">
                                  {doctorTimeSlots?.map((timeslot) => (
                                    <React.Fragment
                                      key={
                                        timeslot?.timeSlot?.DoctorTimeSlot_id
                                      }
                                    >
                                      {!timeslot?.leave && (
                                        <label
                                          className={`timeslot_selector_btn ${
                                            selectedTimeSlot?.timeSlot
                                              ?.DoctorTimeSlot_id ===
                                            timeslot?.timeSlot
                                              ?.DoctorTimeSlot_id
                                              ? "selected"
                                              : ""
                                          }`}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={
                                              selectedTimeSlot?.timeSlot
                                                ?.DoctorTimeSlot_id ===
                                              timeslot?.timeSlot
                                                ?.DoctorTimeSlot_id
                                            }
                                            //  disabled={true}
                                            onChange={() =>
                                              handleSelectTimeslot(timeslot)
                                            }
                                          />
                                          {formatTime(
                                            timeslot?.timeSlot?.startTime
                                          )}{" "}
                                          -{" "}
                                          {formatTime(
                                            timeslot?.timeSlot?.endTime
                                          )}
                                        </label>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </div>
                              ) : (
                                <div
                                  style={{
                                    display: "grid",
                                    placeItems: "center",
                                    width: "100%",
                                    height: "100%",
                                    textAlign: "center",
                                  }}
                                >
                                  {/* {No slots found on this date} */}
                                  {timeslotWarning}
                                </div>
                              )}
                            </>
                          )}

                          {/* <h4 className="booking_time_label">Afternoon</h4> */}
                          <Spacing lg={40} md={30} />
                          {consultations && consultations?.length > 0 && (
                            <div className="booking_title_card">
                              Select Time
                            </div>
                          )}
                          <Spacing lg={30} md={20} />

                          {consultationLoading ? (
                            <div
                              className="custom-loader_container"
                              style={{ height: "3rem" }}
                            >
                              <span className="custom-loader"></span>
                            </div>
                          ) : (
                            <div
                              className="time_selector_list"
                              style={{ gap: "0.85rem" }}
                            >
                              {consultations?.map((consultation, index) => (
                                <label
                                  key={index}
                                  className={`time_selector_btn ${
                                    selectedConsultation?.slot ===
                                    consultation?.slot
                                      ? "selected"
                                      : ""
                                  } ${
                                    !consultation?.Available ? "disabled" : ""
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={
                                      selectedConsultation?.slot ===
                                      consultation?.slot
                                    }
                                    disabled={!consultation?.Available}
                                    onChange={() =>
                                      handleSelectConsultation(consultation)
                                    }
                                  />
                                  {formatTime(consultation?.slot)}
                                </label>
                              ))}
                            </div>
                          )}
                          <Spacing lg={30} md={20} />

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

                      <div className="booking_form_radio_wrpper">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            checked={bookingType === "guest"}
                            onChange={() => setBookingType("guest")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            Guest Booking
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked={bookingType === "member"}
                            onChange={() => setBookingType("member")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          >
                            Already Member
                          </label>
                        </div>
                      </div>

                      <div className="booking_form_card_btn_wrapper">
                        <button
                          className="booking_form_card_btn"
                          onClick={handleBookNow}
                        >
                          Book Now
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="custom-loader_container pt-4">
                      <div className="row_border mb-5" />
                      This doctor currently does not have a clinic listed.
                    </div>
                  )}
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
