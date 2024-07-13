import React from "react";

const PhoneNumberInput = ({ value, onChange, error, maxLength }) => {
  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, ""); 
    onChange(numericValue.slice(0, maxLength)); 
  };
  return (
    <div className="input-group ">
      <span className="input-group-text" id="basic-phone">
        +91
      </span>
      <input
        type="tel"
        className={`form-control ${error ? "is-invalid" : ""}`}
        placeholder="Phone"
        aria-label="Phone"
        aria-describedby="basic-phone"
        required
        value={value}
        onChange={handlePhoneChange}
        maxLength={maxLength}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default PhoneNumberInput;
