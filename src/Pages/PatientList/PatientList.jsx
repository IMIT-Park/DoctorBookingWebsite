import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spacing from "../../Components/Spacing/Spacing";

const PatientList = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("add-patient");

  return (
    <>
      <div className="container mt-5">
        <Spacing lg={50} md={20} />
        <div className="booking_container">
          <div className="booking_form_card">
            <div className="patient_details_wrapper">
              <div className="patient_tabs_container">
                <div
                  className={`patient_tab ${
                    tab === "add-patient" ? "add-active" : ""
                  }`}
                  onClick={() => setTab("add-patient")}
                >
                  Add Patient
                </div>
                <div
                  className={`patient_tab ${
                    tab === "select-patient" ? "select-active" : ""
                  }`}
                  onClick={() => setTab("select-patient")}
                >
                  Select Patient
                </div>
              </div>
              <div className="">
                {tab === "add-patient" ? (
                  <div>
                    <Spacing lg={50} md={40} />
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="input-group mb-2">
                      <span className="input-group-text" id="basic-phone">
                        +91
                      </span>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Phone"
                        aria-label="Phone"
                        aria-describedby="basic-phone"
                      />
                    </div>
                    <div className="row g-2 mb-2">
                      <div className="col-md-6">
                        <label
                          style={{ color: "gray" }}
                          htmlFor="dob"
                          className="form-label mb-0"
                        >
                          DOB
                        </label>
                        <input
                          id="dob"
                          type="date"
                          className="form-control"
                          placeholder="DOB"
                          style={{ paddingRight: "10px" }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label
                          style={{ color: "gray" }}
                          htmlFor="gender"
                          className="form-label mb-0"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
                          className="form-select form-control"
                          aria-label="Default select example"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-2">
                      <textarea
                        className="form-control"
                        id="address"
                        rows="4"
                        placeholder="Address"
                      ></textarea>
                    </div>
                    <div>
                      <textarea
                        className="form-control"
                        id="remarks"
                        rows="4"
                        placeholder="Remarks"
                      ></textarea>
                    </div>
                    <Spacing lg={40} md={30} />
                    <div className="booking_form_card_btn_wrapper">
                      <button
                        className="booking_form_card_btn"
                        onClick={() =>
                          navigate("/booking/booking-confirmation")
                        }
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Spacing lg={50} md={40} />
                    <div class="form-check custom-radio">
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        1. Anitta Charly
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                    </div>
                    <div className="form-check custom-radio">
                      <label
                        className="form-check-label"
                        for="flexRadioDefault2"
                      >
                        2. Amal Pradeep
                      </label>
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                      />
                    </div>
                    <div class="form-check custom-radio">
                      <label class="form-check-label" for="flexRadioDefault3">
                        3. Paul K P
                      </label>
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                      />
                    </div>
                    <Spacing lg={40} md={30} />
                    <div className="booking_form_card_btn_wrapper">
                      <button
                        className="booking_form_card_btn"
                        onClick={() =>
                          navigate("/booking/booking-confirmation")
                        }
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default PatientList;
