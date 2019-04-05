import React, { useState, useRef } from 'react';
import { DropdownTrigger, DropdownContent, DropdownMenu } from 'bloomer';
import PropTypes from 'prop-types';
import useOnClickOutside from '../custom-hooks/useOnClickOutside';

const BasicDropdown = ({ children, trigger }) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setDropdownActive(false));

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${dropdownActive ? 'is-active' : ''}`}
    >
      <DropdownTrigger onClick={() => setDropdownActive(active => !active)}>
        {trigger}
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownContent>{children}</DropdownContent>
      </DropdownMenu>
    </div>
  );
};

BasicDropdown.propTypes = {
  children: PropTypes.any,
  trigger: PropTypes.any,
};

export default BasicDropdown;
