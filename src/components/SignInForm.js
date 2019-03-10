import React from 'react';
import {
  Field,
  Label,
  Control,
  Input,
  Icon,
  Button,
  Message,
  MessageBody,
} from 'bloomer';
import PropTypes from 'prop-types';
import useFormState from '../custom-hooks/useFormState';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/.test(values.email)) {
    errors.email = 'Invalid email';
  }

  if (!values.password) errors.password = 'Password is required';
  return errors;
};

const SignInForm = ({
  onSubmit,
  initialValues,
  loading,
  errors: submitErrors,
}) => {
  const [{ values, touched, errors }, { text, password }] = useFormState(
    initialValues,
    { validate }
  );

  return (
    <form>
      <Field>
        <Label>Email</Label>
        <Control className="has-icons-left">
          <Input
            {...text('email')}
            isColor={touched.email && errors.email ? 'danger' : ''}
          />
          <Icon className="fa fa-envelope" isSize="small" isAlign="left" />
        </Control>
        {touched.email && errors.email && (
          <p className="help is-danger">{errors.email}</p>
        )}
      </Field>

      <Field>
        <Label>Password</Label>
        <Control>
          <Input
            {...password('password')}
            isColor={touched.password && errors.password ? 'danger' : ''}
          />
        </Control>
        {touched.password && errors.password && (
          <p className="help is-danger">{errors.password}</p>
        )}
      </Field>

      {submitErrors && submitErrors.length > 0 && (
        <Message isColor="danger">
          <MessageBody>
            <ul>
              {submitErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </MessageBody>
        </Message>
      )}

      <Button
        isColor="primary"
        disabled={Object.keys(errors).length || loading}
        onClick={() => onSubmit(values)}
        isLoading={loading}
      >
        Submit
      </Button>
    </form>
  );
};

SignInForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SignInForm;
