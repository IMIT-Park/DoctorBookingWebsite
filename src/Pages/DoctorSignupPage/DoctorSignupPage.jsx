import React, { useEffect, useState } from "react";
import Spacing from "../../Components/Spacing/Spacing";
import { axiosApi } from "../../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorSignupPage = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    setInput((prevInput) => ({ ...prevInput, user_name: prevInput.email }));
  }, [input.email]);

  const validate = () => {
    const newErrors = {};
    if (input.password !== input.confirmPassword) {
        toast.error("Password doesn't match!");
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
      return;
    }

    if (validate()) {
      setLoading(true);

      try {
        const data = {
          ...input,
          phone: `+91${input.phone}`,
        };

        const response = await axiosApi.post("/v1/doctor/Dr-sign-up", data);
        console.log("Signup successful:", response.data);
        toast.success("Signup successful!");
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

        window.location.href = "https://www.youtube.com/";
      } catch (error) {
        console.error("Signup error:", error);
        if (error.response && error.response.status === 403) {
        //   alert("Email already exists. Please use a different email.");
        toast.error("Email already exists. Please use a different email!");
        }
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
            <div className="mb-2">
              <label htmlFor="dob" className="form-label mt-2">
                Name
              </label>
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
            <div className="mb-2">
              <label htmlFor="dob" className="form-label mt-2">
                Phone
              </label>
              <div className="input-group">
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
                  onChange={(e) =>
                    setInput({ ...input, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="dob" className="form-label mt-2">
                Email
              </label>
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
                onChange={(e) =>
                  setInput({ ...input, dateOfBirth: e.target.value })
                }
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

            <div className="mb-2">
              <label htmlFor="dob" className="form-label mt-2">
                Qualification
              </label>
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

            <div className="mb-2">
              <label htmlFor="dob" className="form-label mt-2">
                Specialization
              </label>
              <input
                type="text"
                className="form-control"
                id="Specialization"
                placeholder="Specialization"
                required
                value={input?.specialization}
                onChange={(e) =>
                  setInput({ ...input, specialization: e.target.value })
                }
              />
            </div>

            <div className="mb-2">
              <label htmlFor="dob" className="form-label mt-2">
                Fees
              </label>
              <input
                type="number"
                className="form-control"
                id="fees"
                placeholder="Fees"
                required
                value={input?.fees}
                onChange={(e) => setInput({ ...input, fees: e.target.value })}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="dob" className="form-label mt-2">
                Address
              </label>
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
            <div className="mb-2">
              <label htmlFor="dob" className="form-label mt-2">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
                value={input?.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="dob" className="form-label mt-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm-password"
                placeholder="Confirm Password"
                required
                value={input?.confirmPassword}
                onChange={(e) =>
                  setInput({ ...input, confirmPassword: e.target.value })
                }
              />
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
      <ToastContainer  position="top-center" autoClose={2000}/>
    </div>
  );
};

export default DoctorSignupPage;
