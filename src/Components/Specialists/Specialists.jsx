import React from "react";
import { Link } from "react-router-dom";
import { imageBase_URL } from "../../axiosInstance";

const Specialists = ({ photo, name, specialization, doctor_id }) => {
  return (
    <>
      <Link className="st-doctor-link" to={`/doctor-profile/${doctor_id}`}>
        <div className="st-member st-style1 st-zoom">
          <div className="st-member-img">
            <img
              src={
                photo
                  ? imageBase_URL + photo
                  : `${process.env.PUBLIC_URL}/images/empty-user.png`
              }
              alt={"photo"}
              className="st-member-photo"
            />
          </div>
          <div className="st-member-meta">
            <div className="st-member-meta-in">
              <h3 className="st-member-name">{name}</h3>
              <div className="st-member-designation">{specialization}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Specialists;
