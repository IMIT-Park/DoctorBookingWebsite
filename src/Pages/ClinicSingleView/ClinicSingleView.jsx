import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosApi, imageBase_URL } from "../../axiosInstance";
import { getMapLocation } from "../../utils/getLocation";
import { UserContext } from "../../Contexts/UseContext";
import ComplaintModal from "../../Components/ComplaintModal/ComplaintModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import { decode } from "base-64";

const ClinicSingleView = () => {
  const navigate = useNavigate();
  const params = useParams();

  const encodedClinicId = params?.clinicId;
  const clinicId = decode(encodedClinicId);

  const { setPageTitle, userDetails, bookingDetails, setBookingDetails } =
    useContext(UserContext);

  useEffect(() => {
    setPageTitle("");
  }, []);

  const [buttonLoading, setButtonLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  const [loading, setLoading] = useState(false);
  const [doctorLoading, setDoctorLoading] = useState(false);
  const [doctorClinics, setDoctorClinics] = useState([]);
  const [totalPages, setTotlaPages] = useState(0);
  const [clinicDetails, setClinicDetails] = useState(null);
  const [reportInput, setReportInput] = useState({
    email: "",
    phone: "",
    content: "",
    clinic_id: clinicDetails && clinicDetails?.clinic_id,
  });

  const resetReportInput = () => {
    setReportInput({
      email: "",
      phone: "",
      content: "",
      clinic_id: clinicDetails && clinicDetails?.clinic_id,
    });
  };

  const days = [
    { name: "SUN", id: 0 },
    { name: "MON", id: 1 },
    { name: "TUE", id: 2 },
    { name: "WED", id: 3 },
    { name: "THU", id: 4 },
    { name: "FRI", id: 5 },
    { name: "SAT", id: 6 },
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
    const fetchClinicDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosApi.get(`/v1/clinic/getbyId/${clinicId}`);
        setClinicDetails(response?.data?.Clinic);
      } catch (error) {
        console.error("Error fetching clinic details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicDetails();
  }, [clinicId]);

  useEffect(() => {
    const fetchData = async () => {
      setDoctorLoading(true);
      try {
        const response = await axiosApi.get(
          `/v1/doctor/getalldr/${clinicId}?pageSize=${pageSize}&page=${page}`
        );
        setTotlaPages(response?.data?.pageInfo?.totalPages);
        setDoctorClinics(response?.data?.alldoctors);
      } catch (error) {
        console.log(error);
      } finally {
        setDoctorLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

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

    const updatedInput = {
      ...reportInput,
      phone: `+91${reportInput.phone}`,
    };

    try {
      const response = await axiosApi.post(
        "/v1/complaint/sendComplaint",
        updatedInput
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

  const handleComplaintSubmit = () => {
    addComplaint();
  };

  const isDayAvailable = (timeslots, dayId, clinicId) => {
    return timeslots.some(
      (timeslot) =>
        timeslot?.day_id === dayId && timeslot?.clinic_id === clinicId
    );
  };

  const handleBookAppoinment = (doctorId) => {
    setBookingDetails({
      ...bookingDetails,
      clinic_id: parseFloat(clinicId),
      type: "application",
    });
    navigate(`/doctor-profile/${doctorId}`);
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div>
      <ToastContainer autoClose={2000} position="top-center" />
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="details_wrapper clinicProfile_details_wrapper">
          {loading ? (
            <div className="custom-loader_container">
              <span className="custom-loader"></span>
            </div>
          ) : (
            <>
              {clinicDetails ? (
                <>
                  <div className="clinic_card">
                    <button
                      className="profile_report_btn clinic_report_btn"
                      onClick={handleReportClick}
                    >
                      Report
                    </button>

                    <div className="clinicprofile__banner_wrapper">
                      <img
                        src={imageBase_URL + clinicDetails?.banner_img_url}
                        alt="Clinic"
                        className="clinicprofile__banner_wrapper_image"
                      />
                    </div>
                    <div className="clinic-details-column">
                      <h3 className="clinic_name_text">
                        {clinicDetails?.name}
                      </h3>
                      <p className="clinic-address">Address</p>
                      <p className="clinic_detail_box clinic_detail_address_box">
                        {clinicDetails?.address}
                      </p>
                      <p className="clinic-address">Phone Number</p>
                      <p className="clinic_detail_box">
                        {clinicDetails?.phone}
                      </p>
                      {clinicDetails?.googleLocation && (
                        <button
                          type="button"
                          className="clinic_location_view_btn"
                          onClick={() =>
                            getMapLocation(clinicDetails?.googleLocation)
                          }
                        >
                          Location
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="doctor_title">Doctors List</div>
                  {doctorLoading ? (
                    <div
                      className="custom-loader_container"
                      style={{ height: "20rem" }}
                    >
                      <span className="custom-loader"></span>
                    </div>
                  ) : (
                    <>
                      {doctorClinics && doctorClinics?.length > 0 ? (
                        <div className="doctor_list_card_container">
                          {doctorClinics?.map((doc, index) => (
                            <div
                              key={index}
                              className="doctor_list_detail_card"
                            >
                              <div className="doctor_list_detail_top_sec">
                                <div className="doctor_list_card_photo_container">
                                  <img
                                    src={
                                      doc?.photo
                                        ? imageBase_URL + doc?.photo
                                        : `${process.env.PUBLIC_URL}/images/empty-user.png`
                                    }
                                    alt="Doctor"
                                    className="doctor_list_card_photo"
                                  />
                                </div>
                                <div className="clini_doctor_web_hidden_details">
                                  <h2 className="clini_doctor_name">
                                    Dr. {doc?.name}
                                  </h2>
                                  <p className="docotr_qualification">
                                    {doc?.qualification}
                                  </p>
                                  <p className="doctor_specialization">
                                    {doc?.specialization}
                                  </p>
                                </div>
                              </div>
                              <div className="clinic_doctor_detailbox">
                                <div className="clini_doctor_mob_hidden_details">
                                  <h2 className="clini_doctor_name">
                                    Dr. {doc?.name}
                                  </h2>
                                  <p className="docotr_qualification">
                                    {doc?.qualification}
                                  </p>
                                  <p className="doctor_specialization">
                                    {doc?.specialization}
                                  </p>
                                </div>
                                <div className="doctor_day_showing_container">
                                  {days.map((day) => (
                                    <div
                                      key={day?.id}
                                      className={
                                        isDayAvailable(
                                          doc?.timeslots,
                                          day?.id,
                                          parseFloat(clinicId)
                                        )
                                          ? "doctor_day_showing_card"
                                          : "doctor_day_showing_card disabled"
                                      }
                                    >
                                      {day?.name}
                                    </div>
                                  ))}
                                </div>

                                <button
                                  onClick={() =>
                                    handleBookAppoinment(doc?.doctor_id)
                                  }
                                  className="clinic_dr_book_appoinment_btn"
                                >
                                  Book Appointment
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="clinic_data_notfound">
                          No Doctors Found On This Clinic
                        </div>
                      )}
                    </>
                  )}
                  {doctorClinics && doctorClinics?.length > 20 && (
                    <div
                      style={{
                        width: "100%",
                        display: "grid",
                        placeItems: "center",
                        marginTop: "3rem",
                      }}
                    >
                      {" "}
                      <ReactPaginate
                        previousLabel={
                          <img
                            src={`${process.env.PUBLIC_URL}/icons/pagination-arrow.svg`}
                            alt="Previous"
                          />
                        }
                        nextLabel={
                          <img
                            style={{ rotate: "180deg" }}
                            src={`${process.env.PUBLIC_URL}/icons/pagination-arrow.svg`}
                            alt="Next"
                          />
                        }
                        breakLabel={"..."}
                        pageCount={totalPages || 0}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"custom-pagination"}
                        activeClassName={"active"}
                        previousClassName={"previous"}
                        nextClassName={"next"}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="clinic_data_notfound">No Data Found</div>
              )}
            </>
          )}
        </div>
      </div>
      <ComplaintModal
        showModal={showModal}
        handleClose={handleCloseModal}
        reportInput={{
          ...reportInput,
          clinic_id: clinicDetails && clinicDetails.clinic_id,
        }}
        setReportInput={setReportInput}
        handleComplaintSubmit={handleComplaintSubmit}
        loading={buttonLoading}
      />
      <div className="st-height-b120 st-height-lg-b90" />
    </div>
  );
};

export default ClinicSingleView;
