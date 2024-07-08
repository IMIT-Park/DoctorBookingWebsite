import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../axiosInstance";
import axios from "axios";


const BookStatus = () => {
  const clinicid = 1;


  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [loading, setLoading] = useState(false);
  const [doctorClinics, setDoctorClinics] = useState([]);
  const [clinicDetails, setClinicDetails] = useState(null);



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


  return (
    <div>
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="details_wrapper">
          <div className="profile_details_container book_status-box">
            <div className="doctor_name">Book Status</div>

            {/* <div className="book-status-grid">
            <div className="details-column"> */}
            <div
              style={{ overflow: "auto", textAlign: "center" }}
              className="table_parent"
            >
              <table class="table table_width">
                <thead>
                  <tr className="table_head">
                    <th scope="col">Sl No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Token Number</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Doctors Name</th>
                    <th scope="col">Clinic Name</th>
                    <th scope="col">Queue Position</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-row">
                    {/* <th scope="row">01</th> */}
                    <td>01</td>
                    <td>Paul KP</td>
                    <td>321543687</td>
                    <td>02/05/2024</td>
                    <td>10.00 AM</td>
                    <td>Dr.James Kopel</td>
                    <td>SH Hospital, IJK</td>
                    <td className="queue_position">5</td>
                  </tr>
                  <tr className="table-row">
                    {/* <th scope="row">01</th> */}
                    <td>02</td>
                    <td>Cerena James</td>
                    <td>321543687</td>
                    <td>02/05/2024</td>
                    <td>10.30 AM</td>
                    <td>Dr. Andrews MK</td>
                    <td>NMT Health Care, IJK</td>
                    <td className="queue_position">10</td>
                  </tr>
                  <tr className="table-row">
                    {/* <th scope="row">03</th> */}
                    <td>03</td>
                    <td>Sebi</td>
                    <td>321543687</td>
                    <td>02/05/2024</td>
                    <td>12.00 AM</td>
                    <td>Dr. Raichel Paul</td>
                    <td>CT Clinic, TCR</td>
                    <td className="queue_position">3</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* </div>
              
            </div> */}
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b90" />
    </div>
  );
};

export default BookStatus;