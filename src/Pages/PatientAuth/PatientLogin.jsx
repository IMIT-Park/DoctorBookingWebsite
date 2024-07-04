import React, { useContext, useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { useNavigate } from "react-router-dom";
import Eye from "../../Components/PasswordEye/Eye";
import CloseEye from "../../Components/PasswordEye/CloseEye";
import { BASIC_URL } from "../../axiosInstance";
import { UserContext } from "../../Contexts/UseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUserDetails } = useContext(UserContext);
  const { userDetails } = useContext(UserContext);

  // login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!data.email && !data.password) {
      toast.warning("Please enter your email and password.");
      setLoading(false);
      return;
    }

    if (!data.email) {
      toast.warning("Please enter your Email.");
      setLoading(false);
      return;
    }

    if (!data.password) {
      toast.warning("Please enter your Password.");
      setLoading(false);
      return;
    }

    const auth = btoa(`${data.email}:${data.password}`);

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `${auth}`,
    });

    try {
      const response = await fetch(`${BASIC_URL}/v1/patient/login`, {
        method: "POST",
        headers,
      });

      if (response.ok) {
        const data = await response.json();

        const { accessToken, refreshToken, user } = data;

        // Store data in sessionStorage
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("userData", JSON.stringify(user));

        // Update the user details in context
        setUserDetails(user);

        setLoading(false);
        toast.success("Login Success");
        setData({ email: "", password: "" });
        navigate("/");
      } else if (response.status === 403) {
        const message = await response.json();
        toast.error(
          message?.error || "Incorrect email or password. Please try again."
        );
      } else {
        toast.error("Incorrect email or password. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("password").focus();
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin(e);
    }
  };

  return (
    <>
      <Spacing lg={120} md={60} />
      <div className="container mt-5">
        <div className="booking_container patient_login_container">
          <div className="booking_form_card">
            <form onSubmit={handleLogin}>
              <div className="patient_details_wrapper">
                <div className="patient_login_card_header">
                  <p className="booking_confirmation_card_title">Login</p>
                </div>
                <div className="">
                  <div>
                    <Spacing lg={35} md={20} />
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        id="Username"
                        placeholder="User Name"
                        value={data.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        onKeyDown={handleEmailKeyDown}
                      />
                    </div>
                    <div className="password-input-container mb-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        onKeyDown={handlePasswordKeyDown}
                      />
                      <div
                        className="icon-container"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye /> : <CloseEye />}
                      </div>
                    </div>
                    <label
                      className="forgot_Password"
                      onClick={() => navigate("/forgot-password")}
                    >
                      <span>Forgot Password ?</span>
                    </label>

                    <div className="book_as_guest_wrapper">
                      <div
                        className="book_as_guest"
                        onClick={() => navigate("/book-as-guest")}
                      >
                        Book as Guest
                        <span className="register_divider">|</span>
                      </div>
                      <div
                        className="register"
                        onClick={() => navigate("/patient-register")}
                      >
                        Register
                      </div>
                    </div>

                    <Spacing lg={25} md={25} />
                    <div className="patient_login_btn_wrapper">
                      <button className="patient_login_btn">
                        {loading ? <span className="loader"></span> : "Login"}
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

export default PatientLogin;
