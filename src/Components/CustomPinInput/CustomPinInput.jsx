// src/CustomPinInput.js
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
const CustomPinInput = ({ length, onComplete }) => {
  const [values, setValues] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);
  const handleChange = (e, index) => {
    const newValue = e.target.value;
    if (!/^\d*$/.test(newValue)) return; // Allow only digits
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);
    // Move to the next input field if the current one is filled
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
    // If the last input is filled, call the onComplete callback
    if (index === length - 1 && newValues.every((val) => val)) {
      onComplete(newValues.join(''));
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newValues = [...values];
      if (newValues[index]) {
        newValues[index] = '';
        setValues(newValues);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').slice(0, length);
    if (!/^\d*$/.test(pasteData)) return; // Allow only digits
    const newValues = pasteData.split('').concat(Array(length - pasteData.length).fill(''));
    setValues(newValues);
    if (newValues.every((val) => val)) {
      onComplete(newValues.join(''));
    }
  };
  return (
    <div className='otp_input_container'>
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          value={value}
          maxLength="1"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className='otp_input'
        
        />
      ))}
    </div>
  );
};
CustomPinInput.propTypes = {
  length: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  inputStyle: PropTypes.object,
  containerStyle: PropTypes.object,
};
export default CustomPinInput;