import React, { useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import Eye from "../../Components/PasswordEye/Eye";
import CloseEye from "../../Components/PasswordEye/CloseEye";
import { axiosApi } from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PatientRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    e.preventDefault();
    if (
      !input.name ||
      !input.gender ||
      !input.dateOfBirth ||
      !input.phone ||
      !input.email ||
      !input.password ||
      !input.confirmPassword
    ) {
      return;
    }

    if (validate()) {
      setLoading(true);

      try {
        const data = {
          ...input,
          phone: `+91${input.phone}`,
        };

        const response = await axiosApi.post(
          "/v1/patient/registerpatient",
          data
        );
        console.log("Signup successful:");
        toast.success("Signup successful!");
        setLoading(false);
        setInput({
          name: "",
          gender: "",
          dateOfBirth: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          navigate("/patient-login");
        }, 2000);
      } catch (error) {
        console.error("Signup error:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <div className="booking_container patient_login_container">
          <div className="booking_form_card">
            <form onSubmit={handleSubmit}>
              <div className="patient_details_wrapper">
                <div className="patient_login_card_header">
                  <p className="booking_confirmation_card_title">Register</p>
                </div>

                <Spacing lg={35} md={20} />
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

                <label htmlFor="email" className="form-label mb-2 mt-2">
                  Email
                </label>
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    required
                    value={input?.email}
                    onChange={(e) =>
                      setInput({ ...input, email: e.target.value })
                    }
                  />
                </div>

                <label htmlFor="gender" className="form-label mb-2 mt-2">
                  Password
                </label>
                <div className="password-input-container mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    value={input?.password}
                    placeholder="Password"
                    required
                    onChange={(e) =>
                      setInput({ ...input, password: e.target.value })
                    }
                  />
                  <div
                    className="icon-container"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <CloseEye />}
                  </div>
                </div>

                <label htmlFor="gender" className="form-label mb-2 mt-2">
                  Confirm Password
                </label>
                <div className="password-input-container mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="confirm_password"
                    value={input?.confirmPassword}
                    placeholder="Confirm Password"
                    required
                    onChange={(e) =>
                      setInput({
                        ...input,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <div
                    className="icon-container"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <CloseEye />}
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-danger">{errors.confirmPassword}</p>
                  )}
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

export default PatientRegister;
