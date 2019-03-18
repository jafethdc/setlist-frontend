/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect } from 'react';
import { Control, Input } from 'bloomer';
import PropTypes from 'prop-types';

const keyCodes = {
  enter: 13,
  upArrow: 38,
  downArrow: 40,
};

const Option = ({ isActive, onMouseOver, onClick, children }) => (
  <div
    onMouseOver={onMouseOver}
    onMouseDown={onClick}
    className={`autocomplete-dropdown-item ${
      isActive ? 'has-background-light' : ''
    }`}
  >
    {children}
  </div>
);
Option.propTypes = {
  isActive: PropTypes.bool,
  onMouseOver: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

const Autocomplete = ({
  onChange,
  onSelect,
  options: incomingOptions,
  loadingOptions,
  optionLabel,
  placeholder,
}) => {
  const [term, setTerm] = useState('');
  const [activeOption, setActiveOption] = useState(-1);
  const [inputFocus, setInputFocus] = useState(false);
  const [options, setOptions] = useState(null);

  const displayDropdown = inputFocus && !loadingOptions && options;

  const labelFor = option =>
    typeof optionLabel === 'function'
      ? optionLabel(option)
      : option[optionLabel];

  const handleChange = ({ target: { value } }) => {
    setTerm(value);
    if (value) onChange(value);
    else setOptions(null);
  };

  const handleSelect = option => {
    setTerm(labelFor(option));
    onSelect(option);
    setOptions(null);
  };

  const handleOnFocus = () => {
    setInputFocus(true);
    if (term) onChange(term);
  };

  const handleKeyDown = ({ keyCode }) => {
    if (!displayDropdown) return;
    switch (keyCode) {
      case keyCodes.enter:
        handleSelect(options[activeOption]);
        break;
      case keyCodes.upArrow:
        if (activeOption > 0) setActiveOption(activeOption - 1);
        break;
      case keyCodes.downArrow:
        if (activeOption < options.length - 1)
          setActiveOption(activeOption + 1);
        break;
      default:
    }
  };

  useEffect(() => setOptions(incomingOptions), [incomingOptions]);
  useEffect(() => setActiveOption(-1), [options]);

  let dropdownContent = null;
  if (displayDropdown) {
    if (options.length) {
      dropdownContent = (
        <ul>
          {options.map((option, i) => (
            <Option
              key={i}
              isActive={activeOption === i}
              onMouseOver={() => setActiveOption(i)}
              onClick={() => handleSelect(option)}
              data={option}
            >
              {labelFor(option)}
            </Option>
          ))}
        </ul>
      );
    } else if (term) {
      dropdownContent = (
        <div className="autocomplete-dropdown-message">
          Not results found :(
        </div>
      );
    }
  }

  return (
    <div className="autocomplete">
      <Control isLoading={loadingOptions}>
        <Input
          value={term}
          onChange={handleChange}
          onFocus={handleOnFocus}
          onBlur={() => setInputFocus(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </Control>
      {displayDropdown && (
        <div className="autocomplete-dropdown">{dropdownContent}</div>
      )}
    </div>
  );
};

Autocomplete.propTypes = {
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  options: PropTypes.array,
  loadingOptions: PropTypes.bool,
  optionLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  placeholder: PropTypes.string,
};

Autocomplete.defaultProps = {
  loadingOptions: false,
};

export default Autocomplete;
