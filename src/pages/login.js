import React, { useState, useContext } from "react";
import { FirebaseContext } from '../components/firebase';
import { Form, Input, Button, ErrorMessage } from '../components/common';

function Login()  {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { firebase } = useContext(FirebaseContext);
  const handleInputChange = (e) => {
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.login({
       email: formValues.email,
       password: formValues.password,
    })
    .catch(err => {
      setErrorMessage(err.message);
    })
  }
  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="email"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        <Input
          placeholder="password"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
        {!!errorMessage && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
        <Button type="submit" block>
          Login
        </Button>
      </Form>
    </section>
  );
}

export default Login;
