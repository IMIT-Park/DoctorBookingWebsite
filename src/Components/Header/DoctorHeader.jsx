import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="doc_header">
      <div className="container header_container">
        <div className="back_button" onClick={() => navigate(-1)}>
          <img
            src={`${process.env.PUBLIC_URL}/icons/left-arrow.svg`}
            alt="Back"
          />
        </div>
        {location?.pathname === "/doctor-profile" && (
          <h3 className="doc_header_title">Doctors Profile</h3>
        )}
        <div className="home_button" onClick={() => navigate("/")}>
          <img src={`${process.env.PUBLIC_URL}/icons/home.svg`} alt="Back" />
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;
