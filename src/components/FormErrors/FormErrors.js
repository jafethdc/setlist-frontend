import React from 'react';
import { Message, MessageBody } from 'bloomer';
import PropTypes from 'prop-types';

const FormErrors = ({ errors }) => (
  <Message isColor="danger">
    <MessageBody>
      <ul>
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    </MessageBody>
  </Message>
);

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default FormErrors;
