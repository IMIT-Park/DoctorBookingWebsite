import React, { useContext, useEffect, useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { axiosApi, dashboardUrl } from "../../axiosInstance";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UseContext";
import Eye from "../../Components/PasswordEye/Eye";
import CloseEye from "../../Components/PasswordEye/CloseEye";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneNumberInput from "../../Components/PhoneNumberInput/PhoneNumberInput";
import Swal from "sweetalert2";

const OwnerSignupPage = () => {
  const { salespersoncode } = useParams();
  const { setPageTitle } = useContext(UserContext);

  useEffect(() => {
    setPageTitle("Register as Owner");
  }, []);

  const [input, setInput] = useState({
    name: "",
    email: "",
    user_name: "",
    phone: "",
    address: "",
    salespersoncode: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (salespersoncode) {
      setInput((prevInput) => ({
        ...prevInput,
        salespersoncode,
      }));
    }
  }, [salespersoncode]);

  const validate = () => {
    const newErrors = {};
    if (input.password !== input.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (input.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      toast.warning("Phone number must be exactly 10 digits");
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
      !input.address ||
      !input.phone ||
      !input.password ||
      !input.confirmPassword
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

        if (!data.salespersoncode) {
          delete data.salespersoncode;
        }

        const response = await axiosApi.post("/v1/auth/sign-up", data);
        // toast.success("Signup successful!");

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
          email: "",
          user_name: "",
          phone: "",
          address: "",
          salespersoncode: "",
          password: "",
          confirmPassword: "",
        });

        // setTimeout(() => {
        //   window.location.href = dashboardUrl;
        // }, 5000);
      } catch (error) {
        console.error("Signup error:", error);
        if (error?.response && error?.response?.status === 403) {
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

  const handlePhoneChange = (value) => {
    setInput({ ...input, phone: value });
    if (value.length === 10) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
    }
  };

  return (
    <div className="container signup_main">
      <Spacing lg={80} md={80} />
      <div className="booking_container">
        <div className="booking_form_card">
          <form onSubmit={handleSubmit} className="signup_form">
            <h3
              style={{ textAlign: "center" }}
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
                autoComplete="off"
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
            <div className="password-input-container mb-3">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Password"
                required
                value={input?.password}
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
                onChange={(e) =>
                  setInput({ ...input, confirmPassword: e.target.value })
                }
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

export default OwnerSignupPage;
