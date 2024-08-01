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
    country: "India",
    state: "",
    district: "",
    city: "",
    salespersoncode: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [districtvalue, setDistricts] = useState([]);
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
    if(input.password.length < 6){
      newErrors.password = "Password should contain minimum 6 characters";
      toast.warning("Password should contain minimum 6 characters");
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
      !input.country ||
      !input.state ||
      !input.district ||
      !input.city ||
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
          country: "",
          state: "",
          district: "",
          city: "",
          salespersoncode: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          window.location.href = dashboardUrl;
        }, 6000);
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setInput({...input, password: value});
    if(value >= 6){
      setErrors((prevErrors) => ({...prevErrors, password: ""}));
    }
    if(value === input?.confirmPassword){
      setErrors((prevErrors) => ({...prevErrors, confirmPassword:""}));
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setInput({...input, confirmPassword: value});
    if(value === input?.password){
      setErrors((prevErrors) => ({...prevErrors, confirmPassword:""}));
    }
  }

  const fetchStateList = async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get(`/v1/owner/getAllStatesandDistrict`);
      setStates(response?.data?.States || []);
    } catch (error) {
      console.error(" error:", error);

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStateList();
  }, []);

  const handleStateSelect = (e) => {
    const selectedStateName = e.target.value;
    setInput({ ...input, state: selectedStateName });
    const selectedState = states.find(
      (state) => state.name === selectedStateName
    );
    const selectedStateId = selectedState?.state_id;
    if (selectedStateId) {
      fetchDistrictList(selectedStateId);
    } else {
      setDistricts([]); 
    }
  };

  const fetchDistrictList = async (stateid) => {
    try {
      const response = await axiosApi.get(
        `/v1/owner/getAllDistrictbystate/${stateid}`
      );
      setDistricts(response?.data?.District || []);
      console.log(response);
    } catch (error) {
      console.error(" error:", error);

      setLoading(false);
    } finally {
      setLoading(false);
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
            <div className="mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                id="country"
                placeholder="Country"
                required
                value={input?.country}
                readOnly
                onChange={(e) =>
                  setInput({ ...input, country: e.target.value })
                }
                autoComplete="off"
              />
            </div>
            <div className="mb-3 mt-3">
              <select
                className={`form-control form-select ${!input?.state && "form-textcolor"}`}
                id="state"
                placeholder="State"
                required
                value={input?.state}
                onChange={(e) => {
                  handleStateSelect(e);
                  setInput({ ...input, state: e.target.value });
                }}
              >
                <option className="" value="" disabled>
                  Select State
                </option>
                {states.map((state) => (
                  <option key={state?.state_id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3 mt-3">
              <select
                className={`form-control form-select district-select ${!input?.district && "form-textcolor"}`}
                id="districts"
                placeholder="District"
                required
                value={input?.district || ""}
                onChange={(e) =>
                  setInput({ ...input, district: e.target.value })
                }
                disabled={districtvalue.length === 0}
              >
                <option value="" disabled>
                  Select District
                </option>
                {districtvalue.map((district) => (
                  <option key={district?.id} value={district?.district}>
                    {district.district}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="City"
                required
                value={input?.city}
                onChange={(e) => setInput({ ...input, city: e.target.value })}
                
              />
            </div>

            <div className="password-input-container mb-3">
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
              <p className="text-danger">{errors.password}</p>
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

export default OwnerSignupPage;
