import React, {useState} from 'react'
import PropTypes from 'prop-types'

export default function Dropdown (props) {
  const {
    label,
    btnText,
    options,
    submitHandler,
    disabled
  } = props

  const [value, setValue] = useState(options[0].text)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!disabled) submitHandler(value)
  }

  const allOptions = options.map((opt, index) => {
    return (
      <option key={index}>
        {opt.text}
      </option>
    )
  })
  return (
    <form
      className={`dropdown-container ${disabled ? 'disabled' : ''}`}
      onSubmit={handleSubmit}
    >
      <label htmlFor="dropdown-select"> {label} </label>
      <select
        name="dropdown-select"
        value={value}
        onChange={handleChange}
      >
        {allOptions}
      </select>
      <input type="submit" value={btnText} className="btn" />
    </form>
  )
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  btnText: PropTypes.string,
  options: PropTypes.array.isRequired,
  submitHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

Dropdown.defaultProps = {
  btnText: 'Start',
  disabled: false
}