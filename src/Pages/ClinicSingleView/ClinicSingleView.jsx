import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosApi,imageBase_URL } from "../../axiosInstance";
import axios from "axios"; 

const ClinicSingleView = ({ doctor }) => {
  const navigate = useNavigate();
  const clinicid = 1;

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [loading, setLoading] = useState(false);
  const [doctorClinics, setDoctorClinics] = useState([]);
  const [clinicDetails, setClinicDetails] = useState(null); 
  const days = [
    { name: "Sunday", id: "0" },
    { name: "Monday", id: "1" },
    { name: "Tuesday", id: "2" },
    { name: "Wednesday", id: "3" },
    { name: "Thursday", id: "4" },
    { name: "Friday", id: "5" },
    { name: "Saturday", id: "6" },
  ];

  useEffect(() => {
    // Fetch clinic details
    const fetchClinicDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosApi.get(`/v1/clinic/getbyId/${clinicid}`);
        setClinicDetails(response?.data?.Clinic); 
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching clinic details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClinicDetails();
  }, [clinicid]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosApi.get(`/v1/doctor/getalldr/${clinicid}?page=${page}&pagesize=${pageSize}`);
        setDoctorClinics(response?.data?.alldoctors);
        console.log(response);
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
        <div className="details_wrapper">
          <div className="profile_details_container">
            <div className="clinic_card">
              <div className="image-column">
                <img
                  src={imageBase_URL + clinicDetails?.banner_img_url}
                  alt="Clinic"
                  style={{ width: "800px", height: "350px" }}
                />
              </div>
              <div className="details-column">
                <h3 className="doctor_name">{clinicDetails?.name}</h3>
                <p className="clinic-address">Address</p>
                <p className="address">
                  {clinicDetails?.address}
                </p>
                <p className="clinic-address">Phone Number</p>
                <input
                  type="number"
                  className="form-control"
                  placeholder={clinicDetails?.phone}
                  aria-label="Phone"
                  aria-describedby="basic-phone"
                />

                <button type="button" className="profile_direction_btn mt-5">
                  Location
                </button>
              </div>
            </div>
          </div>

          <div className="doctor_title mt-5">Doctors List</div>
          <div className="doctor_list_card mt-3">
            {doctorClinics.map((doc, index) => (
              <div key={index} className="doctor_list_card1 flex-row doctorlist_details_wrapper1">
                <img
                  src={imageBase_URL + doc?.photo}
                  alt="Doctor"
                  style={{
                    width: "150px",
                    height: "200px",
                    margin: "8px",
                    borderRadius: "5px",
                  }}
                />
                <div className="doctor_detailbox">
                  <h2 className="clini_doctor_name mb-1">{doc?.name}</h2>
                  <p className="docotr_qualification mb-1">{doc?.qualification}</p>
                  <p className="doctor_specialization">{doc?.specialization}</p>

                  <div className="time_selector_btn1">
                    {days.map((day) => (
                      <div key={day.id} className="day">
                        {day.name.slice(0, 3).toUpperCase()}
                      </div>
                    ))}
                  </div>

                  <button className="clinic_doctor_card_btn mt-3">
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
