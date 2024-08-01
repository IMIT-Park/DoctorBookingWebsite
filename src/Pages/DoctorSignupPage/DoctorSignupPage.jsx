import React, { useContext, useEffect, useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { axiosApi, dashboardUrl } from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../Contexts/UseContext";
import Eye from "../../Components/PasswordEye/Eye";
import CloseEye from "../../Components/PasswordEye/CloseEye";
import PhoneNumberInput from "../../Components/PhoneNumberInput/PhoneNumberInput";
import Swal from "sweetalert2";
import { formatDate } from "../../utils/formatDate";

const DoctorSignupPage = () => {
  const { setPageTitle } = useContext(UserContext);

  useEffect(() => {
    setPageTitle("Register as Doctor");
  }, []);

  const [input, setInput] = useState({
    name: "",
    phone: "",
    email: "",
    user_name: "",
    dateOfBirth: "",
    qualification: "",
    specialization: "",
    address: "",
    password: "",
    confirmPassword: "",
    gender: "",
    fees: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [specializations, setSpecializations] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (input.password !== input.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (input.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      toast.warning("Phone number must be exactly 10 digits");
    }
    if (input?.password.length < 6) {
      newErrors.password = "Password should contain minimum 6 characters";
      toast.warning("Password should contain minimum 6 letters");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !input.name ||
      !input.email ||
      !input.dateOfBirth ||
      !input.qualification ||
      !input.specialization ||
      !input.address ||
      !input.phone ||
      !input.password ||
      !input.confirmPassword ||
      !input.gender ||
      !input.fees
    ) {
      toast.warning("Please fill in all input fields");
      return;
    }

    if (validate()) {
      setLoading(true);

      try {
        const data = {
          ...input,
          phone: `+91${input.phone}`,
          user_name: input.email,
        };

        const response = await axiosApi.post("/v1/doctor/Dr-sign-up", data);

        Swal.fire({
          title: "Signup successful!",
          text: "Click to continue to your Dashboard",
          icon: "success",
          confirmButtonText: "Go to Dashboard",
        }).then((result) => {
          window.location.href = dashboardUrl;
        });

        setLoading(false);
        setInput({
          name: "",
          phone: "",
          email: "",
          user_name: "",
          dateOfBirth: "",
          qualification: "",
          specialization: "",
          address: "",
          password: "",
          confirmPassword: "",
          gender: "",
          fees: "",
        });

        setTimeout(() => {
          window.location.href = dashboardUrl;
        }, 6000);
      } catch (error) {
        console.error("Signup error:", error);
        if (error.response && error.response.status === 403) {
          toast.error("Email already exists. Please use a different email!");
        } else {
          toast.error("Signup failed. Please try again!");
        }
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchSpecializations = async () => {
    try {
      const response = await axiosApi.get("/v1/doctor/specializations");
      setSpecializations(response?.data?.specializations);
    } catch (error) {
      console.error("Error fetching specializations:", error);
    }
  };

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const handleSpecializationChange = (e) => {
    setInput({ ...input, specialization: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setInput({ ...input, phone: value });
    if (value.length === 10) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setInput({ ...input, password: value });
    if (value.length >= 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
    if (value === input?.confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setInput({ ...input, confirmPassword: value });
    if (value === input?.password) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    }
  };

  const handleFeesChange = (e) => {
    setInput({ ...input, fees: e.target.value.replace(/\D/g, "") });
  };

  const currentDate = formatDate(new Date());

  return (
    <div className="container signup_main">
      <Spacing lg={80} md={80} />
      <div className="booking_container">
        <div className="booking_form_card">
          <form onSubmit={handleSubmit} className="signup_form">
            <h3
              style={{
                textAlign: "center",
                fontFamily: '"Inter", sans-serif',
                fontWeight: "500px",
                fontSize: "35px",
                color: "#00704A",
              }}
              className="booking_form_card_title"
            >
              Sign up
            </h3>
            <Spacing lg={30} md={20} />
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                required
                value={input?.name}
                onChange={(e) => setInput({ ...input, name: e.target.value })}
              />
            </div>

            <PhoneNumberInput
              value={input?.phone}
              onChange={handlePhoneChange}
              error={errors?.phone}
              maxLength="10"
            />

            <div className="mb-3 mt-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                required
                value={input?.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                required
                value={input?.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
                readOnly
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="dob" className="form-label mt-2">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={input?.dateOfBirth}
                onChange={(e) =>
                  setInput({ ...input, dateOfBirth: e.target.value })
                }
                max={currentDate}
                placeholder="Date of Birth"
                aria-label="Date of Birth"
                aria-describedby="basic-dob"
                style={{ paddingRight: "10px" }}
              />
            </div>

            <label htmlFor="gender" className="form-label mb-2 mt-1">
              Select Gender
            </label>
            <div className="input-group mb-3">
              <div className="form-check me-3">
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
              <div className="form-check me-3">
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

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="Qualification"
                placeholder="Qualification"
                required
                value={input?.qualification}
                onChange={(e) =>
                  setInput({ ...input, qualification: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control form-select p-2 "
                id="Specialization"
                required
                style={{ color: "grey" }}
                value={input?.specialization}
                onChange={handleSpecializationChange}
              >
                <option value="">Select Specialization</option>
                {specializations?.map((spec) => (
                  <option key={spec?.id} value={spec.name}>
                    {spec?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <input
                type="tel"
                className="form-control"
                id="fees"
                placeholder="Fees"
                required
                value={input?.fees}
                onChange={handleFeesChange}
              />
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                id="address"
                rows="3"
                placeholder="Address"
                required
                value={input?.address}
                onChange={(e) =>
                  setInput({ ...input, address: e.target.value })
                }
              ></textarea>
            </div>

            <div className= "password-input-container mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                required
                value={input?.password}
                onChange={handlePasswordChange}
              />
              <div
                className="icon-container"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <CloseEye />}
              </div>
            </div>

            {errors.password && (
              <p className="text-danger" style={{marginTop:"-5px"}}>
                {errors.password}
              </p>
            )}

            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control ${
                  errors?.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirm-password"
                placeholder="Confirm Password"
                required
                value={input?.confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <div
                className="icon-container"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye /> : <CloseEye />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-danger">{errors.confirmPassword}</p>
            )}

            <Spacing lg={40} md={30} />
            <div className="booking_form_card_btn_wrapper">
              <button
                type="submit"
                className="signup_submit_btn"
                disabled={loading}
              >
                {loading ? <span className="loader"></span> : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Spacing lg={100} md={80} />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default DoctorSignupPage;
