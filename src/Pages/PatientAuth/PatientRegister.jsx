import React, { useContext, useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import Eye from "../../Components/PasswordEye/Eye";
import CloseEye from "../../Components/PasswordEye/CloseEye";
import { axiosApi } from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UseContext";

const PatientRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    user_name: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserDetails } = useContext(UserContext);

  const validate = () => {
    const newErrors = {};
    if (input.password !== input.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.user_name || !input.password) {
      return;
    }

    if (validate()) {
      setLoading(true);

      try {
        const data = { ...input };
        const response = await axiosApi.post(
          "/v1/patient/registerpatient",
          data
        );

        console.log(response);

        if (response.status === 201) {
          const { accessToken, refreshToken, user } = response.data;

          // sessionStorage.setItem("accessToken", accessToken);
          // sessionStorage.setItem("refreshToken", refreshToken);
          // sessionStorage.setItem("userData", JSON.stringify(user));

          // setUserDetails({ user, accessToken, refreshToken });

          toast.success("Signup successful!");
          setInput({
            user_name: "",
            password: "",
            confirmPassword: "",
          });

          setTimeout(() => {
            navigate("/patient-login");
          }, 2000);
        } else {
          console.error("Signup failed:", response);
          toast.error("Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        if (error?.response?.status === 403) {
          toast.error(error?.response?.data?.error || "User already exist");
        } else {
          toast.error("Signup error. Please try again.");
        }
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
              <div className="patient_details_wrapper patient_details_form_wrapper">
                <div className="patient_login_card_header">
                  <p className="booking_confirmation_card_title">Signup</p>
                </div>
                <Spacing lg={35} md={20} />
                <label htmlFor="user_name" className="form-label mb-2 mt-2">
                  User name
                </label>
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="user_name"
                    placeholder="User name"
                    required
                    value={input.user_name}
                    onChange={(e) =>
                      setInput({ ...input, user_name: e.target.value })
                    }
                  />
                </div>
                <label htmlFor="password" className="form-label mb-2 mt-2">
                  Password
                </label>
                <div className="password-input-container mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    value={input.password}
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
                <label
                  htmlFor="confirm_password"
                  className="form-label mb-2 mt-2"
                >
                  Confirm Password
                </label>
                <div className="password-input-container mb-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="confirm_password"
                    value={input.confirmPassword}
                    placeholder="Confirm Password"
                    required
                    onChange={(e) =>
                      setInput({ ...input, confirmPassword: e.target.value })
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
                    {loading ? <span className="loader"></span> : "Signup"}
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
