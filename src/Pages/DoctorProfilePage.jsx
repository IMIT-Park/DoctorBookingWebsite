import React, { useEffect, useState } from "react";
import DoctorProfile from "../Components/Specialists/DoctorProfile";
import Spacing from "../Components/Spacing/Spacing";
import { axiosApi } from "../axiosInstance";
import { useParams } from "react-router-dom";

const DoctorProfilePage = () => {
  const { doctorId } = useParams();
  const [loading, setLoading] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [doctorClinics, setDoctorClinics] = useState([]);

  // fetch doctor details function
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get(`/v1/doctor/getbyIdweb/${doctorId}`);
      setDoctorDetails(response?.data?.Doctor);
      setDoctorClinics(response?.data?.allclinics);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // fetching doctor details
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Spacing lg={60} md={30} />
      <DoctorProfile
        doctorDetails={doctorDetails}
        doctorClinics={doctorClinics}
        loading={loading}
      />
      <Spacing lg={80} md={40} />
    </>
  );
};

export default DoctorProfilePage;
