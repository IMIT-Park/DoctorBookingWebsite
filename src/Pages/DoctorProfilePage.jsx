import React from "react";
import DoctorProfile from "../Components/Specialists/DoctorProfile";
import Spacing from "../Components/Spacing/Spacing";

const DoctorProfilePage = () => {
  return (
    <>
      <Spacing lg={60} md={30} />
      <DoctorProfile />
      <Spacing lg={80} md={40} />
    </>
  );
};

export default DoctorProfilePage;
