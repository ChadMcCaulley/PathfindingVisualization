import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Dropdown(props) {
  const { label, btnText, options, submitHandler, disabled } = props;

  const [value, setValue] = useState(options[0].text);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!disabled) submitHandler(value);
  };

  return (
    <form
      className={`dropdown-container ${disabled ? "disabled" : ""}`}
      onSubmit={handleSubmit}
    >
      <label htmlFor="dropdown-select"> {label} </label>
      <select
        name="dropdown-select"
        value={value}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value || opt.text} value={opt.text}>
            {opt.text}
          </option>
        ))}
      </select>
      <input
        type="submit"
        value={btnText}
        className="btn"
        disabled={disabled}
      />
    </form>
  );
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  btnText: PropTypes.string,
  options: PropTypes.array.isRequired,
  submitHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
