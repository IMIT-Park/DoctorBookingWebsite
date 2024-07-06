import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosApi, imageBase_URL } from "../../axiosInstance";
import { getMapLocation } from "../../utils/getLocation";

const ClinicSingleView = () => {
  const navigate = useNavigate();
  const { clinicId } = useParams();

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [loading, setLoading] = useState(false);
  const [doctorClinics, setDoctorClinics] = useState([]);
  const [clinicDetails, setClinicDetails] = useState(null);
  const days = [
    { name: "SUN", id: "0" },
    { name: "MON", id: "1" },
    { name: "TUE", id: "2" },
    { name: "WED", id: "3" },
    { name: "THU", id: "4" },
    { name: "FRI", id: "5" },
    { name: "SAT", id: "6" },
  ];

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
      setLoading(true);
      try {
        const response = await axiosApi.get(
          `/v1/doctor/getalldr/${clinicId}?page=${page}&pagesize=${pageSize}`
        );
        setDoctorClinics(response?.data?.alldoctors);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize]);

  return (
    <div>
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="details_wrapper clinicProfile_details_wrapper">
          <div className="clinic_card">
            <div className="clinicprofile__banner_wrapper">
              <img
                src={imageBase_URL + clinicDetails?.banner_img_url}
                alt="Clinic"
                className="clinicprofile__banner_wrapper_image"
              />
            </div>
            <div className="clinic-details-column">
              <h3 className="clinic_name_text">{clinicDetails?.name}</h3>
              <p className="clinic-address">Address</p>
              <p className="clinic_detail_box">{clinicDetails?.address}</p>
              <p className="clinic-address">Phone Number</p>
              <p className="clinic_detail_box">{clinicDetails?.phone}</p>
              {clinicDetails?.googleLocation && (
                <button
                  type="button"
                  className="clinic_location_view_btn"
                  onClick={() => getMapLocation(clinicDetails?.googleLocation)}
                >
                  Location
                </button>
              )}
            </div>
          </div>

          <div className="doctor_title">Doctors List</div>
          <div className="doctor_list_card_container">
            {doctorClinics.map((doc, index) => (
              <div key={index} className="doctor_list_detail_card">
                <div className="doctor_list_card_photo_container">
                  <img
                    src={imageBase_URL + doc?.photo}
                    alt="Doctor"
                    className="doctor_list_card_photo"
                  />
                </div>
                <div className="clinic_doctor_detailbox">
                  <h2 className="clini_doctor_name">{doc?.name}</h2>
                  <p className="docotr_qualification">{doc?.qualification}</p>
                  <p className="doctor_specialization">{doc?.specialization}</p>

                  <div className="doctor_day_showing_container">
                    {days.map((day) => (
                      <div key={day?.id} className="doctor_day_showing_card">
                        {day?.name}
                      </div>
                    ))}
                  </div>

                  <button className="clinic_dr_book_appoinment_btn">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b90" />
    </div>
  );
};

export default ClinicSingleView;
