import React, { useEffect, useState } from "react";
import DoctorProfile from "../Components/Specialists/DoctorProfile";
import Spacing from "../Components/Spacing/Spacing";
import { axiosApi } from "../axiosInstance";
import { useParams } from "react-router-dom";

const DoctorProfilePage = () => {
  const { doctorId } = useParams();
  const [loading, setLoading] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({});

  // fetch doctor details function
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get(`/v1/doctor/getbyIdweb/${doctorId}`);
      setDoctorDetails(response?.data?.Doctor);
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
      <DoctorProfile data={doctorDetails} loading={loading}/>
      <Spacing lg={80} md={40} />
    </>
  );
};

export default DoctorProfilePage;
