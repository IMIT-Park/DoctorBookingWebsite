import React from "react";

const DoctorHeader = () => {
  return (
    <header className="doc_header">
      <div className="container header_container">
        <div className="back_button">
          <img
            src={`${process.env.PUBLIC_URL}/icons/left-arrow.svg`}
            alt="Back"
          />
        </div>
        <h3 className="doc_header_title">Doctors Profile</h3>
        <div className="home_button">
          <img src={`${process.env.PUBLIC_URL}/icons/home.svg`} alt="Back" />
        </div>
      </div>
    </header>
  );
};

export default DoctorHeader;
