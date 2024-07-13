import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spacing from "../../Components/Spacing/Spacing";
import { UserContext } from "../../Contexts/UseContext";
import { axiosApi } from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneNumberInput from "../../Components/PhoneNumberInput/PhoneNumberInput";

const PatientList = () => {
  const navigate = useNavigate();

  const {
    setPageTitle,
    userDetails,
    bookingDetails,
    setBookingDetails,
    setBookingCompleted,
  } = useContext(UserContext);

  useEffect(() => {
    setPageTitle("Select Patient");
  }, []);

  const [loading, setLoading] = useState(false);
  const [patientsList, setPatientsList] = useState([]);
  const [selectedPatient, setSelectedPatint] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [input, setInput] = useState({
    phone: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    Remarks: "",
    Particulars: "",
  });
  const [errors, setErrors] = useState({});

  const [tab, setTab] = useState("add-patient");

  const validate = () => {
    const newErrors = {};

    if (input.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      toast.warning("Phone number must be exactly 10 digits");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addNewPatient = async (e) => {
    e.preventDefault();

    if (!input.phone || !input.name || !input.gender || !input.dateOfBirth) {
      toast.warning("Please fill in all required fields");
      return;
    }

    if (validate()) {
      setButtonLoading(true);

      const prepareInput = (input) => {
        return {
          ...input,
          phone: `+91${input.phone}`,
          Remarks: input.Remarks || null,
          Particulars: input.Particulars || null,
        };
      };

      const preparedInput = prepareInput(input);

      try {
        const response = await axiosApi.post(
          "/v1/patient/createpatient",
          preparedInput
        );
        if (response.status === 201) {
          createBooking(e, response?.data?.Patient?.patient_id);
        }
      } catch (error) {
        console.error(error?.response?.data?.error);
      } finally {
        setButtonLoading(false);
      }
    }
  };

  // fetch patients list function
  const fetchPatientsList = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get(
        `/v1/patient/getuserpatient/${userDetails?.user_id}`
      );
      setPatientsList(response?.data?.Patients);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // fetch patients
  useEffect(() => {
    if (tab === "select-patient") {
      fetchPatientsList();
    }
  }, [tab]);

  const handleSelectPatient = (patient) => {
    setSelectedPatint(patient);
    setBookingDetails({
      ...bookingDetails,
      patient_id: patient?.patient_id,
      type: "application",
    });
  };

  const createBooking = async (e, patient_id = null) => {
    e.preventDefault();
    console.log(patient_id);
    setBookingLoading(true);

    try {
      const bookingData = {
        ...bookingDetails,
        patient_id: patient_id || bookingDetails.patient_id,
      };

      const response = await axiosApi.post(
        "/v1/booking/createBooking",
        bookingData
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Booking Added Successfully");
        setTimeout(() => {
          navigate("/booking/booking-confirmation");
        }, 2000);
        setBookingDetails({
          doctor_id: null,
          clinic_id: null,
          patient_id: null,
          schedule_date: "",
          schedule_time: "",
          type: "application",
          DoctorTimeSlot_id: null,
        });
        setBookingCompleted(response?.data);
      }
    } catch (error) {
      console.error(error?.response?.data?.error);
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePhoneChange = (value) => {
    setInput({ ...input, phone: value });
    if (value.length === 10) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
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
                  <form onSubmit={addNewPatient}>
                    <Spacing lg={50} md={40} />
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        value={input?.name}
                        onChange={(e) =>
                          setInput({ ...input, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <PhoneNumberInput
                      value={input?.phone}
                      onChange={handlePhoneChange}
                      error={errors?.phone}
                      maxLength="10"
                    />
                    <div className="row g-2 mb-3 mt-1">
                      <div className="col-md-6">
                        <label
                          style={{ color: "gray" }}
                          htmlFor="dob"
                          className="form-label mb-0"
                        >
                          Date of Birth
                        </label>
                        <input
                          id="dob"
                          type="date"
                          className="form-control"
                          placeholder="DOB"
                          style={{ paddingRight: "10px" }}
                          value={input?.dateOfBirth}
                          onChange={(e) =>
                            setInput({ ...input, dateOfBirth: e.target.value })
                          }
                          required
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
                          value={input?.gender}
                          onChange={(e) =>
                            setInput({ ...input, gender: e.target.value })
                          }
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        id="remarks"
                        rows="4"
                        placeholder="Remarks"
                        value={input?.Remarks}
                        onChange={(e) =>
                          setInput({ ...input, Remarks: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div>
                      <textarea
                        className="form-control"
                        id="particulars"
                        rows="4"
                        placeholder="Particulars"
                        value={input?.Particulars}
                        onChange={(e) =>
                          setInput({ ...input, Particulars: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <Spacing lg={40} md={30} />
                    <div className="booking_form_card_btn_wrapper">
                      <button
                        className="booking_form_card_btn"
                        disabled={buttonLoading}
                        type="submit"
                        style={{
                          minWidth: "13rem",
                          height: "2.75rem",
                          padding: "0",
                        }}
                      >
                        {buttonLoading ? (
                          <span className="loader"></span>
                        ) : (
                          " Book Now"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    {loading ? (
                      <div className="custom-loader_container">
                        <span className="custom-loader"></span>
                      </div>
                    ) : (
                      <>
                        {patientsList && patientsList?.length > 0 ? (
                          <div>
                            <Spacing lg={50} md={40} />
                            {patientsList?.map((patient, index) => (
                              <div
                                key={patient?.patient_id}
                                className="form-check custom-radio"
                              >
                                <label
                                  className="form-check-label"
                                  htmlFor={`flexRadioDefault1${patient?.patient_id}`}
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {index + 1}. {patient?.name}
                                </label>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id={`flexRadioDefault1${patient?.patient_id}`}
                                  checked={
                                    selectedPatient?.patient_id ===
                                    patient?.patient_id
                                  }
                                  onChange={() => handleSelectPatient(patient)}
                                />
                              </div>
                            ))}

                            <Spacing lg={40} md={30} />
                            <div className="booking_form_card_btn_wrapper">
                              <button
                                className="booking_form_card_btn"
                                onClick={createBooking}
                                style={{
                                  minWidth: "13rem",
                                  height: "2.75rem",
                                  padding: "0",
                                }}
                                disabled={bookingLoading}
                              >
                                {bookingLoading ? (
                                  <span className="loader"></span>
                                ) : (
                                  "Book Now"
                                )}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "20rem",
                              display: "grid",
                              placeItems: "center",
                            }}
                          >
                            No patients Found
                          </div>
                        )}
                      </>
                    )}
                  </>
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
