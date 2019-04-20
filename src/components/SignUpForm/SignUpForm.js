import React from 'react';
import { Field, Label, Control, Input, Icon, Button, Help } from 'bloomer';
import PropTypes from 'prop-types';
import useFormState from '../../custom-hooks/useFormState';
import FormErrors from '../FormErrors';

const validate = values => {
  const errors = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.username) errors.username = 'Username is required';
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/(.+)@(.+){2,}\.(.+){2,}/.test(values.email)) {
    errors.email = 'Invalid email';
  }

  if (!values.password) errors.password = 'Password is required';

  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = "Confirmation doesn't match the password";
  }
  return errors;
};

const SignUpForm = ({
  onSubmit,
  initialValues,
  loading,
  errors: submitErrors,
}) => {
  const [{ values, touched, errors }, { text, password }] = useFormState(
    initialValues,
    {
      validate,
    }
  );

  return (
    <form autoComplete="off">
      <Field>
        <Label>Name</Label>
        <Control>
          <Input
            {...text('name')}
            isColor={touched.name && errors.name ? 'danger' : ''}
          />
        </Control>
        {touched.name && errors.name && (
          <Help isColor="danger">{errors.name}</Help>
        )}
      </Field>

      <Field>
        <Label>Username</Label>
        <Control className="has-icons-left">
          <Input
            {...text('username')}
            isColor={touched.username && errors.username ? 'danger' : ''}
            autoComplete="new-password"
          />
          <Icon className="fa fa-user" isSize="small" isAlign="left" />
        </Control>
        {touched.username && errors.username && (
          <Help isColor="danger">{errors.username}</Help>
        )}
      </Field>

      <Field>
        <Label>Email</Label>
        <Control className="has-icons-left">
          <Input
            {...text('email')}
            isColor={touched.email && errors.email ? 'danger' : ''}
            autoComplete="new-password"
          />
          <Icon className="fa fa-envelope" isSize="small" isAlign="left" />
        </Control>
        {touched.email && errors.email && (
          <Help isColor="danger">{errors.email}</Help>
        )}
      </Field>

      <Field>
        <Label>Password</Label>
        <Control>
          <Input
            {...password('password')}
            isColor={touched.password && errors.password ? 'danger' : ''}
            autoComplete="new-password"
          />
        </Control>
        {touched.password && errors.password && (
          <Help isColor="danger">{errors.password}</Help>
        )}
      </Field>

      <Field>
        <Label>Password confirmation</Label>
        <Control>
          <Input
            {...password('passwordConfirmation')}
            isColor={
              touched.passwordConfirmation && errors.passwordConfirmation
                ? 'danger'
                : ''
            }
          />
        </Control>
        {touched.passwordConfirmation && errors.passwordConfirmation && (
          <Help isColor="danger">{errors.passwordConfirmation}</Help>
        )}
      </Field>

      {submitErrors && submitErrors.length > 0 && (
        <FormErrors errors={submitErrors} />
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

SignUpForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default SignUpForm;
