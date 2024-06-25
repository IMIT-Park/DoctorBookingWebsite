import React, { useEffect, useRef } from "react";
import Spacing from "../Spacing/Spacing";

const ComplaintModal = ({
  showModal,
  handleClose,
  reportInput,
  setReportInput,
  handleComplaintSubmit,
  loading,
}) => {
  const modalRef = useRef();

  // prevents scrollbar overflow
  useEffect(() => {
    const toggleBodyOverflow = () => {
      const body = document.querySelector("body");
      if (showModal) {
        body.style.overflow = "hidden";
        body.style.position = "fixed";
      } else {
        body.style.overflow = "auto";
        body.style.position = "relative";
      }
    };

    toggleBodyOverflow();

    return () => {
      document.querySelector("body").style.overflow = "auto";
      document.querySelector("body").style.position = "relative";
    };
  }, [showModal]);

  // Handles clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, handleClose]);

  if (!showModal) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        aria-modal="true"
      >
        <div className="modal-dialog" ref={modalRef}>
          <div className="modal-content">
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={handleComplaintSubmit}
                className="report_form"
                style={{ margin: "10px" }}
              >
                <h3
                  style={{ textAlign: "center" }}
                  className="booking_form_card_title"
                >
                  Report
                </h3>
                <Spacing lg={30} md={20} />
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="reportEmail"
                    style={{ marginBottom: "15px" }}
                    placeholder="Enter Email"
                    value={reportInput.email}
                    onChange={(e) =>
                      setReportInput({ ...reportInput, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="input-group mb-2">
                  <input
                    type="tel"
                    className="form-control"
                    aria-label="Phone"
                    aria-describedby="basic-phone"
                    placeholder="Enter Your Phone Number"
                    style={{ marginBottom: "15px" }}
                    value={reportInput.phone}
                    onChange={(e) =>
                      setReportInput({ ...reportInput, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    className="form-control"
                    id="reportContent"
                    rows="5"
                    placeholder="Enter your report content"
                    value={reportInput.content}
                    onChange={(e) =>
                      setReportInput({
                        ...reportInput,
                        content: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>
                <Spacing lg={40} md={30} />
                <div className="booking_form_card_btn_wrapper">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleClose}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#ff0000",
                      borderColor: "#b50404",
                      marginRight: "10px",
                      marginBottom: "10px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#b50404";
                      e.target.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                      e.target.style.color = "#b50404";
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    style={{
                      backgroundColor: "#006241",
                      borderColor: "#006241",
                      marginBottom: "10px",
                      borderRadius: "5px",
                    }}
                    disabled={loading}
                  >
                    {loading ? <span className="loader"></span> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintModal;
