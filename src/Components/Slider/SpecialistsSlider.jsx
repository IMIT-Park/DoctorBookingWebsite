import React, { useEffect, useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import Specialists from "../Specialists/Specialists";
import ReactPaginate from "react-paginate";
import Spacing from "../../Components/Spacing/Spacing";
import { axiosApi } from "../../axiosInstance";

const SpecialistsSlider = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [alldoctors, setAllDoctors] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({});
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // fetch doctors function
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get(
        `/v1/doctor/getallweb?pageSize=${pageSize}&page=${page}`
      );
      setPaginationDetails(response?.data?.pageInfo);
      setTotalDoctors(response?.data?.Doctors?.count);
      setAllDoctors(response?.data?.Doctors?.rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // fetching doctors
  useEffect(() => {
    fetchData();
  }, [page]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <section id="doctors">
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading
        title="Meet our specialists"
        subTitle=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br /> Lorem Ipsum the industry's standard dummy text."
      />
      <div className="container">
        {alldoctors?.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            Total Doctors: {totalDoctors}
          </div>
        )}
        {loading ? (
          <div className="custom-loader_container">
            <span className="custom-loader"></span>
          </div>
        ) : (
          <>
            {alldoctors?.length > 0 ? (
              <div className="st-slider-style3">
                {alldoctors?.map((doctor) => (
                  <Specialists {...doctor} key={doctor?.doctor_id} />
                ))}
              </div>
            ) : (
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              >
                No Doctors Found
              </p>
            )}
          </>
        )}
        {alldoctors?.length > 0 && (
          <>
            <Spacing lg={60} md={30} />
            <div>
              {" "}
              <ReactPaginate
                previousLabel={
                  <img
                    src={`${process.env.PUBLIC_URL}/icons/pagination-arrow.svg`}
                    alt="Previous"
                  />
                }
                nextLabel={
                  <img
                    style={{ rotate: "180deg" }}
                    src={`${process.env.PUBLIC_URL}/icons/pagination-arrow.svg`}
                    alt="Next"
                  />
                }
                breakLabel={"..."}
                pageCount={paginationDetails?.totalpages || 0}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"custom-pagination"}
                activeClassName={"active"}
                previousClassName={"previous"}
                nextClassName={"next"}
              />
            </div>
          </>
        )}
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  );
};

export default SpecialistsSlider;
