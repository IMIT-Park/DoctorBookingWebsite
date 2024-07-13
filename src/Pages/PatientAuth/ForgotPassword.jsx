import React, { useContext, useEffect, useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASIC_URL } from "../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../Contexts/UseContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { setPageTitle } = useContext(UserContext);

  useEffect(() => {
    setPageTitle("Forgot Password");
  }, []);

  //Submit Email
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASIC_URL}/v1/patient/forgotPasword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      console.log(response);

      if (response.status === 201) {
        setLoading(false);
        toast.success("Email sent successfully.");

        setTimeout(() => {
          navigate("/new-password");
        }, 2000);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
                  <p className="password_reset">Password Reset</p>
                </div>
                <Spacing lg={25} md={20} />
                <label className="email_to_recover mb-4">
                  <span>Enter your email to recover your password</span>
                </label>
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control "
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Spacing lg={40} md={30} />
                <div className="recover_btn_wrapper">
                  <button
                    className="booking_form_card_btn"
                    type="submit"
                    style={{ minWidth: "13rem", height: "2.75rem" }}
                    disabled={loading}
                  >
                    {loading ? <span className="loader"></span> : "Recover"}
                  </button>
                </div>

                <div
                  className="Back_to_Login"
                  onClick={() => navigate("/patient-login")}
                >
                  Back to Login
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

export default ForgotPassword;
