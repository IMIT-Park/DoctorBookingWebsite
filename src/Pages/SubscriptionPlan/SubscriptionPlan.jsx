import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../../Components/SectionHeading/SectionHeading";
import { axiosApi } from "../../axiosInstance";
import { UserContext } from "../../Contexts/UseContext";

const SubscriptionPlan = () => {
  const { setPageTitle } = useContext(UserContext);

  useEffect(() => {
    setPageTitle("Pricing Plans");
  }, []);

  const featureList = [
    {
      title:
        "Clinic waiting area screen for token number and consulting room (Voice over).",
      status: "1",
    },
    {
      title: "Bulk Cancel or Day cancel option.",
      status: "1",
    },
    {
      title:
        "Pro Dashboards (Trend reports, forecasted cash in flow(Account admin)).",
      status: "1",
    },
    {
      title: "Digital prescription sent by SMS and Email.",
      status: "1",
    },
    {
      title: "Patient clinic history.",
      status: "1",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosApi.get(`/v1/plans/getallplans`);
      setPlans(response?.data?.Plans.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(plans);

  return (
    <section id="pricing">
      <div
        className="st-height-b90 st-height-lg-b50 "
        style={{ marginTop: "40px" }}
      ></div>
      <SectionHeading
        title="Show your pricing plans"
        subTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br>Lorem Ipsum the industry's standard dummy text."
      />
      <div
        className="container"
        style={{
          marginBottom: "60px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <div className="custom-loader_container">
            <span className="custom-loader"></span>
          </div>
        ) : (
          <div className="plans-slider-wrapper st-pricing-wrap">
            {plans?.map((plan) => (
              <div
                key={plan?.plan_id}
                className="st-pricing-table st-style1 plan-pricing-card"
              >
                <div className="st-pricing-head">
                  <h2 className="st-plan-price">
                    <span style={{ fontFamily: "Robot", marginRight: "5px" }}>
                      ₹
                    </span>
                    {plan?.price_per_doctor}
                  </h2>
                  <img
                    src="/shape/price-shape.svg"
                    alt="shape"
                    className="st-pricing-head-shape"
                  />
                </div>
                <div className="st-pricing-feature plan_feature_section">
                  <h2 className="st-plan-pricing-feature-title">
                    {plan?.plan_name}
                  </h2>
                  {plan?.plan_name == "Premium" ? (
                    <ul className="st-pricing-feature-list st-mp0 ps-4 pe-3">
                      {featureList.map((element, index) => (
                        <li
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "start",
                            textAlign: "left",
                          }}
                        >
                          <span style={{ display: "flex", marginTop: "5px" }}>
                            {element.status === "1" ? (
                              <Icon
                                style={{ color: "#37af47" }}
                                icon="fa-solid:check"
                              />
                            ) : (
                              <Icon
                                style={{ color: "#e6492d" }}
                                icon="fa-solid:times"
                              />
                            )}
                          </span>
                          <p> {element?.title}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="basic_plan_text st-pricing-feature-list st-mp0 ps-4 pe-3">
                      Basic Dashboards
                    </div>
                  )}
                  <div className="st-pricing-btn" style={{ marginTop: "auto" }}>
                    <Link
                      to="/owner-signup"
                      className="st-btn st-style2 st-color1 st-size-medium"
                    >
                      {" "}
                      Partner With Us
                    </Link>
                  </div>
                  <div className="st-height-b30 st-height-lg-b30" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className="container">
        <div className="row justify-content-center">
          <div className="col-auto">
            <Link to="/owner-signup" className="st-btn st-style2 st-color1 st-size-medium">
              Partner With Us
            </Link>
          </div>
        </div>
      </div> */}

      <div className="st-height-b30 st-height-lg-b30" />
    </section>
  );
};

export default SubscriptionPlan;
