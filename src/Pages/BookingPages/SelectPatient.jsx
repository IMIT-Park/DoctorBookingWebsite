import React, { useContext, useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosApi } from "../../axiosInstance";
import { UserContext } from "../../Contexts/UseContext";

const SelectPatient = () => {
  const navigate = useNavigate();
  const {
    userDetails,
    bookingDetails,
    setBookingDetails,
    setBookingCompleted,
  } = useContext(UserContext);

  const [tab, setTab] = useState("add-patient");
  const [input, setInput] = useState({
    phone: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    remarks: "",
    particulars: "",
  });

  const [buttonLoading, setButtonLoading] = useState(false);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split("T")[0];
    setInput({ ...input, dateOfBirth: formattedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.phone || !input.name || !input.gender || !input.dateOfBirth) {
      toast.warning("Please fill in all required fields");
      return;
    }

    setButtonLoading(true);

    const prepareInput = (input) => {
      return {
        ...input,
        Remarks: input.Remarks || null,
        Particulars: input.Particulars || null,
      };
    };

    const preparedInput = prepareInput(input);
    try {
      const response = await axiosApi.post(
        "/v1/patient/guestpatient",
        preparedInput
      );

      console.log(response);

      if (response.status === 201) {
        createBooking(e, response?.data?.Patient?.patient_id);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setButtonLoading(false);
    }
  };

  // CreateBooking
  const createBooking = async (e, patient_id = null) => {
    e.preventDefault();
    console.log("patient_id", patient_id);
    setButtonLoading(true);

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
      setButtonLoading(false);
    }
  };

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <CustomStepper activeStep={3} completedSteps={[1, 2]} />
        <Spacing lg={50} md={20} />
        <div className="booking_container">
          <div className="booking_form_card">
            <form onSubmit={handleSubmit}>
              <div className="patient_details_wrapper">
                {/* <div className="patient_tabs_container">
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
              </div> */}
                <h3 className="booking_form_card_title">Enter your Details</h3>
                <div className="">
                  <div>
                    <Spacing lg={35} md={20} />
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Name"
                        required
                        value={input.name}
                        onChange={(e) =>
                          setInput({ ...input, name: e.target.value })
                        }
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
                        required
                        value={input.phone}
                        onChange={(e) =>
                          setInput({ ...input, phone: e.target.value })
                        }
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
                          required
                          value={input?.dateOfBirth}
                          onChange={handleDateChange}
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
                          required
                          value={input.gender}
                          onChange={(e) =>
                            setInput({ ...input, gender: e.target.value })
                          }
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
                        id="Remarks"
                        rows="4"
                        placeholder="Remarks"
                        required
                        value={input.remarks}
                        onChange={(e) =>
                          setInput({ ...input, remarks: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <div>
                      <textarea
                        className="form-control"
                        id="particulars"
                        rows="4"
                        placeholder="Particulars"
                        required
                        value={input.particulars}
                        onChange={(e) =>
                          setInput({ ...input, particulars: e.target.value })
                        }
                      ></textarea>
                    </div>
                    <Spacing lg={40} md={30} />
                    <div className="booking_form_card_btn_wrapper">
                      <button className="booking_form_card_btn">
                        {buttonLoading ? (
                          <span className="loader"></span>
                        ) : (
                          " Book Now"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default SelectPatient;
