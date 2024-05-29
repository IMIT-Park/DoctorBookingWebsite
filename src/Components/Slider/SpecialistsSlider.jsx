import React from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import Specialists from "../Specialists/Specialists";

const SpecialistsSlider = ({ data }) => {
  
  return (
    <section id="doctors">
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading
        title="Meet our specialists"
        subTitle=" Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br /> Lorem Ipsum the industry's standard dummy text."
      />
      <div className="container ">
        <div className="st-slider-style3">
          {data.map((elements, index) => (
            <Specialists {...elements} key={index} />
          ))}
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  );
};

export default SpecialistsSlider;
