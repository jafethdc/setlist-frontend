import React, { useState, useRef } from 'react';
import { DropdownTrigger, DropdownContent, DropdownMenu } from 'bloomer';
import PropTypes from 'prop-types';
import useOnClickOutside from '../../custom-hooks/useOnClickOutside';

const BasicDropdown = ({ children, trigger }) => {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setActive(false));

  return (
    <div ref={ref} className={`dropdown ${active ? 'is-active' : ''}`}>
      <DropdownTrigger onClick={() => setActive(!active)}>
        {trigger}
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownContent>{children({ active, setActive })}</DropdownContent>
      </DropdownMenu>
    </div>
  );
};

BasicDropdown.propTypes = {
  children: PropTypes.any,
  trigger: PropTypes.any,
};

export default BasicDropdown;
