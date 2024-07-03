import React, { useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import Eye from "../../Components/PasswordEye/Eye";
import CloseEye from "../../Components/PasswordEye/CloseEye";
import { axiosApi } from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const PatientGuest = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    phone: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    remarks: "",
    particulars: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validate = () => {
    const newErrors = {};
    if (input.password !== input.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toISOString().split("T")[0];
    setInput({ ...input, dateOfBirth: formattedDate });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // if (
    //   !input.phone ||
    //   !input.name ||
    //   !input.gender ||
    //   !input.dateOfBirth ||
    //   !input.remarks ||
    //   !input.Particulars

    // ) {
    //   return;
    // }
    navigate("/patient-login");
  };
  return (
    <>
      <Spacing lg={50} md={60} />
      <div className="container mt-5">
        <div className="booking_container patient_login_container">
          <div className="patient_form_card">
            <form onSubmit={handleSubmit}>
              <div className="patient_details_wrapper">
                <div className="patient_login_card_header">
                  <p className="book_as_guest_title">Book an Appointment</p>
                </div>
                <Spacing lg={35} md={20} />
                <label htmlFor="phone" className="form-label mb-2 mt-2">
                  Phone
                </label>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-phone">
                    +91
                  </span>
                  <input
                    type="number"
                    value={input?.phone}
                    onChange={(e) =>
                      setInput({ ...input, phone: e.target.value })
                    }
                    className="form-control"
                    placeholder="Phone"
                    required
                    aria-label="Phone"
                  />
                </div>
                <label htmlFor="gender" className="form-label mb-2">
                  Patient Name
                </label>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={input?.name}
                    placeholder="Name"
                    required
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                  />
                </div>
                <label htmlFor="gender" className="form-label mb-2 mt-1">
                  Select Gender
                </label>
                <div className="input-group mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="male"
                      id="genderMale"
                      checked={input.gender === "male"}
                      onChange={(e) =>
                        setInput({ ...input, gender: e.target.value })
                      }
                    />
                    <label className="form-check-label" htmlFor="genderMale">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="female"
                      id="genderFemale"
                      checked={input.gender === "female"}
                      onChange={(e) =>
                        setInput({ ...input, gender: e.target.value })
                      }
                    />
                    <label className="form-check-label" htmlFor="genderFemale">
                      Female
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="other"
                      id="genderOther"
                      checked={input.gender === "other"}
                      onChange={(e) =>
                        setInput({ ...input, gender: e.target.value })
                      }
                    />
                    <label className="form-check-label" htmlFor="genderOther">
                      Other
                    </label>
                  </div>
                </div>
                <div className="form-group mb-2 ">
                  <label htmlFor="dob" className="form-label mt-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={input?.dateOfBirth}
                    onChange={handleDateChange}
                    placeholder="Date of Birth"
                    required
                    aria-label="Date of Birth"
                    aria-describedby="basic-dob"
                    style={{ paddingRight: "10px" }}
                  />
                </div>

                <label htmlFor="remarks" className="form-label mb-2 mt-2">
                  Remarks
                </label>
                <div className="password-input-container mb-2">
                  <textarea
                    className="form-control"
                    id="remarks"
                    value={input.remarks}
                    placeholder="Remarks"
                    required
                    onChange={(e) =>
                      setInput({ ...input, remarks: e.target.value })
                    }
                  />
                </div>

                <label htmlFor="gender" className="form-label mb-2 mt-2">
                  Particulars
                </label>
                <div className="password-input-container mb-2">
                  <textarea
                    className="form-control"
                    id="particulars"
                    value={input?.particulars}
                    placeholder="Particulars"
                    required
                    onChange={(e) =>
                      setInput({
                        ...input,
                        particulars: e.target.value,
                      })
                    }
                  />
                </div>
                <Spacing lg={40} md={30} />
                <div className="patient_login_btn_wrapper">
                  <button className="booking_form_card_btn">
                    {loading ? <span className="loader"></span> : "Book Now"}
                  </button>
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
export default PatientGuest;
