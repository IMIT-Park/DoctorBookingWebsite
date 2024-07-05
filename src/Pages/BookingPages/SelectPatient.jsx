import React, { useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import CustomStepper from "../../Components/CustomStepper/CustomStepper";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosApi } from "../../axiosInstance";

const SelectPatient = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("add-patient");
  const [input, setInput] = useState({
    phone: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    remarks: "",
    particulars: "",
  });
  const [loading, setLoading] = useState(false);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split("T")[0];
    setInput({ ...input, dateOfBirth: formattedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !input.phone ||
      !input.name ||
      !input.gender ||
      !input.dateOfBirth ||
      !input.remarks ||
      !input.particulars
    ) {
      return;
    }

    setLoading(true);

    try {
      const data = { ...input };
      const response = await axiosApi.post("/v1/patient/guestpatient", data);

      console.log(response);

      if (response.status === 201) {
        toast.success("Booking confirmed!");
        setInput({
          phone: "",
          name: "",
          gender: "",
          dateOfBirth: "",
          remarks: "",
          particulars: "",
        });

        setTimeout(() => {
          navigate("/booking/booking-confirmation");
        }, 2000);
      } else {
        console.error("Booking failed:", response);
        toast.error("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setLoading(false);
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
                      <button
                        className="booking_form_card_btn"
                        // onClick={() => navigate("/booking/booking-confirmation")}
                      >
                        {loading ? (
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
