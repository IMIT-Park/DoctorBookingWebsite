import React from "react";
import { Link } from "react-router-dom";

const Specialists = ({ img, name, designation, authorLink }) => {
  return (
    <>
      <Link className="st-doctor-link" to={authorLink}>
        <div className="st-member st-style1 st-zoom">
          <div className="st-member-img">
            <img src={img} alt={img} className="" />
          </div>
          <div className="st-member-meta">
            <div className="st-member-meta-in">
              <h3 className="st-member-name">{name}</h3>
              <div className="st-member-designation">{designation}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Specialists;
