import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UseContext";

const DoctorHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pageTitle } = useContext(UserContext);

  return (
    <header className="doc_header">
      <div className="container header_container">
        {location?.pathname === "/booking/booking-confirmation" ? (
          <div className="" />
        ) : (
          <div className="back_button" onClick={() => navigate(-1)}>
            <img
              src={`${process.env.PUBLIC_URL}/icons/left-arrow.svg`}
              alt="Back"
            />
          </div>
        )}
        {pageTitle && <h3 className="doc_header_title">{pageTitle}</h3>}
        <div className="home_button" onClick={() => navigate("/")}>
          <img src={`${process.env.PUBLIC_URL}/icons/home.svg`} alt="Back" />
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;
