import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosApi } from "../../axiosInstance";
import axios from "axios"; 

const BookStatus = () => {
  return (
    <div>
      <div className="st-height-b120 st-height-lg-b80" />
      <div className="container">
        <div className="details_wrapper">
          <div className="profile_details_container book_status-box">
          <div className="doctor_name">Book Status</div>

            <div className="book-status-grid">
            <div className="details-column">
                {/* <h3 className="doctor_name">sgvjhvb</h3> */}
                <p className="clinic-address">Name</p>
                <p className="address">
                sbfnbcn
                </p>
                

                
              </div>
              <div className="details-column">
                <p className="clinic-address">Token Number</p>
                <p className="address">
                sbfnbcn
                </p>
                {/* <p className="clinic-address">Phone Number</p>
                <input
                  type="number"
                  className="form-control"
                  placeholder= "smnm"
                  aria-label="Phone"
                  aria-describedby="basic-phone"
                /> */}

                
              </div>

              <div className="details-column">
                <p className="clinic-address">Date</p>
                <p className="address">
                sbfnbcn
                </p>

                
              </div>
              <div className="details-column">
                <p className="clinic-address">Doctor Name</p>
                <p className="address">
                sbfnbcn
                </p>
              </div>
              <div className="details-column">
                <p className="clinic-address">Clinic Name</p>
                <p className="address">
                sbfnbcn
                </p>
              </div>
              <div className="details-column">
                <p className="clinic-address">Time</p>
                <p className="address">
                sbfnbcn
                </p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b90" />
    </div>
  );
};

export default BookStatus
