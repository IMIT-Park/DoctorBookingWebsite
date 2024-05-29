import React from "react";
const tick = `${process.env.PUBLIC_URL}/images/white-tick.svg`;

function CustomStepper({ activeStep, completedSteps }) {
  const steps = [
    {
      label: "Mobile number verification",
      isCompleted: completedSteps?.includes(1),
    },
    { label: "OTP Verification", isCompleted: completedSteps?.includes(2) },
    { label: "Patients Details", isCompleted: completedSteps?.includes(3) },
    { label: "Book Confirmation", isCompleted: completedSteps?.includes(4) },
  ];

  const activeLabel = steps[activeStep - 1]?.label;

  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`round ${step.isCompleted ? "isCompleted" : ""} ${
              activeStep === index + 1 ? "isRoundActive" : ""
            } ${activeStep === index + 1 ? "isActive" : ""}`}
          >
            {step.isCompleted && <img src={tick} alt="" className="tick" />}
            {activeStep === index + 1 && !step.isCompleted && (
              <div className="dot"></div>
            )}
            <span className="number">{index + 1}</span>
            <span className="label">{step.label}</span>
          </div>
          {index !== steps.length - 1 && (
            <div
              className={`line ${index < activeStep - 1 ? "isLineActive" : ""}`}
            ></div>
          )}
        </React.Fragment>
      ))}
      <div className="active_label">{activeLabel}</div>
    </div>
  );
}

export default CustomStepper;
