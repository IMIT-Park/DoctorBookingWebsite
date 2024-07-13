import React, { useContext, useEffect, useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { useNavigate } from "react-router-dom";
import { BASIC_URL } from "../../axiosInstance";
import Eye from "../../Components/PasswordEye/Eye";
import CloseEye from "../../Components/PasswordEye/CloseEye";
import { UserContext } from "../../Contexts/UseContext";

const ForgotPassword = () => {
  const { setPageTitle } = useContext(UserContext);

  useEffect(() => {
    setPageTitle("Reset Password");
  }, []);

  const navigate = useNavigate();
  const [data, setData] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate("/");
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
                  <p className="password_reset">Reset password</p>
                </div>
                <Spacing lg={25} md={20} />
                <label className="email_to_recover mb-4">
                  <span>Enter your new password</span>
                </label>
                <div className="password-input-container mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="newPassword"
                    placeholder="New Password"
                    value={data.newPassword}
                    onChange={(e) =>
                      setData({ ...data, newPassword: e.target.value })
                    }
                  />
                  <div
                    className="icon-container"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye /> : <CloseEye />}
                  </div>
                </div>

                <div className="password-input-container mb-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={(e) =>
                      setData({ ...data, confirmPassword: e.target.value })
                    }
                  />
                  <div
                    className="icon-container"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye /> : <CloseEye />}
                  </div>
                </div>

                <Spacing lg={40} md={30} />
                <div className="recover_btn_wrapper">
                  <button
                    className="booking_form_card_btn"
                    type="submit"
                    style={{ minWidth: "13rem", height: "2.75rem" }}
                    disabled={loading}
                  >
                    {loading ? <span className="loader"></span> : "Submit"}
                  </button>
                </div>

                {/* <div
                  className="Back_to_Login"
                  onClick={() => navigate("/patient-login")}
                >
                  Back to Login
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Spacing lg={120} md={80} />
    </>
  );
};

export default ForgotPassword;
