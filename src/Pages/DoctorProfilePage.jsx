import React, { useContext, useEffect, useState } from "react";
import DoctorProfile from "../Components/Specialists/DoctorProfile";
import Spacing from "../Components/Spacing/Spacing";
import { axiosApi } from "../axiosInstance";
import { useParams } from "react-router-dom";
import { UserContext } from "../Contexts/UseContext";

const DoctorProfilePage = () => {
  const { doctorId } = useParams();
  const { userDetails, bookingDetails, setBookingDetails } =
    useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [doctorClinics, setDoctorClinics] = useState([]);

  // fetch doctor details function
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get(`/v1/doctor/getbyId/${doctorId}`);
      setDoctorDetails(response?.data?.Doctor);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorClinics = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get(
        `/v1/doctor/getClincbydr/${doctorId}`
      );
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
    if (!bookingDetails?.clinic_id) {
      fetchDoctorClinics();
    }
  }, []);

  return (
    <>
      <DoctorProfile
        doctorId={doctorId}
        doctorDetails={doctorDetails}
        doctorClinics={doctorClinics}
        loading={loading}
      />
      <Spacing lg={80} md={40} />
    </>
  );
};

export default DoctorProfilePage;
