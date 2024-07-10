import React, { useContext, useEffect, useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { axiosApi, dashboardUrl } from "../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Contexts/UseContext";
import Eye from "../../Components/PasswordEye/Eye";
import CloseEye from "../../Components/PasswordEye/CloseEye";

const OwnerSignupPage = () => {
  const { salespersoncode } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    setInput((prevInput) => ({ ...prevInput, user_name: prevInput.email }));
  }, [input.email]);

  const validate = () => {
    const newErrors = {};
    if (input.password !== input.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      !input.user_name ||
      !input.address ||
      !input.phone ||
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

        if (!data.salespersoncode) {
          delete data.salespersoncode;
        }

        const response = await axiosApi.post("/v1/auth/sign-up", data);
        console.log("Signup successful:");
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

        window.location.href = dashboardUrl;
      } catch (error) {
        console.error("Signup error:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
            <div className="mb-2">
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
                value={input?.phone}
                onChange={(e) => setInput({ ...input, phone: e.target.value })}
              />
            </div>
            <div className="mb-2">
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
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                required
                value={input?.user_name}
                onChange={(e) =>
                  setInput({ ...input, user_name: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
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
            <div className="password-input-container mb-2">
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
            <div className="password-input-container mb-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
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
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword}</p>
              )}
            </div>
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
    </div>
  );
};

export default OwnerSignupPage;
