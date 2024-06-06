import React, { useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import { useNavigate } from "react-router-dom";

const SelectPatient = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("add-patient");

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <CustomStepper activeStep={3} completedSteps={[1, 2]} />
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
                    <Spacing lg={35} md={20} />
                    <div class="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                      />
                    </div>
                    <div class="input-group mb-2">
                      <span class="input-group-text" id="basic-phone">
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
                    <div class="row g-2 mb-2">
                      <div class="col-md-6">
                        <input
                          type="date"
                          className="form-control"
                          placeholder="DOB"
                        />
                      </div>
                      <div class="col-md-6">
                        <select
                          className="form-select form-control"
                          aria-label="Default select example"
                        >
                          <option selected>Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div class="mb-2">
                      <textarea
                        class="form-control"
                        id="address"
                        rows="4"
                        placeholder="Address"
                      ></textarea>
                    </div>
                    <div>
                      <textarea
                        class="form-control"
                        id="remarks"
                        rows="4"
                        placeholder="Remarks"
                      ></textarea>
                    </div>
                    <Spacing lg={40} md={30} />
                    <div className="booking_form_card_btn_wrapper">
                      <button className="booking_form_card_btn"  onClick={() => navigate("/booking/booking-confirmation")}>
                        Book Now
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Spacing lg={20} md={15} />
                    <div class="form-check custom-radio">
                      <label class="form-check-label" for="flexRadioDefault1">
                        1. Anitta Charly
                      </label>
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                    </div>
                    <div class="form-check custom-radio">
                      <label class="form-check-label" for="flexRadioDefault2">
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
                      <button className="booking_form_card_btn" onClick={() => navigate("/booking/booking-confirmation")}>
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

export default SelectPatient;
