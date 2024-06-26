import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import { axiosApi } from "../../axiosInstance";

const SubscriptionPlan = () => {
  const featureList = [
    {
      title: 'First Description',
      status: '1',
    },
    {
      title: 'Second Description',
      status: '1',
    },
    {
      title: 'Third Description',
      status: '1',
    },
    {
      title: 'Fourth Description',
      status: '1',
    },
    {
      title: 'Fifth Description',
      status: '1',
    },
  ];

  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get(`/v1/plans/getallplans`);
      console.log(response.data?.Plans);
      setPlans(response.data?.Plans.rows); // Set 'plans' to the array of plans
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="pricing">
      <div className="st-height-b90 st-height-lg-b50" style={{ marginTop: "40px" }}></div>
      <SectionHeading
        title="Show your pricing plans"
        subTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br>Lorem Ipsum the industry's standard dummy text."
      />
      <div className="container" style={{ marginBottom: "60px" }}>
        {loading ? (
           <div className="custom-loader_container">
           <span className="custom-loader"></span>
         </div>
        ) : (
          <div className="plans-slider-wrapper st-pricing-wrap">
            {plans.map((plan) => (
              <div key={plan.plan_id} className="st-pricing-table st-style1 plan-pricing-card">
                <div className="st-pricing-head">
                  <h2 className="st-price">${plan.price_per_doctor}</h2>
                  <img src="/shape/price-shape.svg" alt="shape" className="st-pricing-head-shape" />
                </div>
                <div className="st-pricing-feature">
                  <h2 className="st-pricing-feature-title">{plan.plan_name}</h2>
                  <ul className="st-pricing-feature-list st-mp0">
                    {featureList.map((element, index) => (
                      <li key={index}>
                        {element.status === "1" ? (
                          <Icon style={{ color: "#37af47" }} icon="fa-solid:check" />
                        ) : (
                          <Icon style={{ color: "#e6492d" }} icon="fa-solid:times" />
                        )}
                        {element.title}
                      </li>
                    ))}
                  </ul>
                  <div className="st-pricing-btn">
                    <Link to="" className="st-btn st-style2 st-color1 st-size-medium">
                    {" "}
                      Contact Now
                    </Link>
                  </div>
                  <div className="st-height-b30 st-height-lg-b30" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubscriptionPlan;
