import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../axiosInstance";

const ClinicSingleView = () => {
  const navigate = useNavigate();

  const doctorId = "someDoctorId";

  const [loading, setLoading] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [doctorClinics, setDoctorClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get(`/v1/doctor/getalldr/${doctorId}`);
      setDoctorDetails(response?.data?.Doctor);
      setDoctorClinics(response?.data?.allclinics);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // fetching doctor details
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="details_wrapper">
          <div className="profile_details_container">
            <div className="clinic_card">
              <div className="image-column">
                <img
                  src="https://via.placeholder.com/600"
                  alt="Clinic"
                  style={{ width: "800px", height: "350px" }}
                />
              </div>
              <div className="details-column">
                <h3 className="doctor_name">Dr. Anjo’s Clinic</h3>
                <p className="clinic-address">Address</p>
                <p className="lorem-paragraph">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </p>
                <p className="clinic-address">Phone Number</p>
                <input
                  type="number"
                  className="form-control"
                  placeholder="7559 XXXXXX"
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
          <div className=" doctor_list_card mt-3">
            <div className=" doctor_list_card1 flex-row doctorlist_details_wrapper1">
              <img
                src="https://via.placeholder.com/600"
                alt="Clinic"
                style={{
                  width: "150px",
                  height: "200px",
                  margin: "8px",
                  borderRadius: "5px",
                }}
              />
              <div className="doctor_detailbox">
                <h2 className="clini_doctor_name mb-1">Dr. Anitta Charly</h2>
                <p className="docotr_job mb-1">MBBS</p>
                <p className="doctor_surgery">General Surgery</p>

                <div className="time_selector_btn1">
                  <div className="day">SUN</div>
                  <div className="day">MON</div>
                  <div className="day">TUE</div>
                  <div className="day">WED</div>
                  <div className="day">THU</div>
                  <div className="day">FRI</div>
                  <div className="day">SAT</div>
                </div>

                <button className="clinic_doctor_card_btn mt-3">
                  Book Appointment
                </button>
              </div>
            </div>
            
          </div>

          
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b90" />
    </div>
  );
};

export default ClinicSingleView;
