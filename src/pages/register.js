import React, { useState, useContext } from 'react';
import { Form, Input, Button, ErrorMessage } from '../components/common';
import { FirebaseContext } from '../components/firebase';

function Register() {
  const { firebase } = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirm: '',
    username: '',
  });

  const handleInputChange = (e) => {
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }))
  };

  const  handleSumbit = (e) => {
    e.preventDefault();
    if (formValues.password === formValues.confirm) {
      firebase.register({
        email: formValues.email,
        password: formValues.password,
        username: formValues.username,
      })
      .catch(err => {
        setErrorMessage(err.message);
      });
    } else {
      setErrorMessage('Password and ConfrimPasswrod Fields must match!');
    }
  };

  return (
    <Form onSubmit={handleSumbit}>
      <Input value={formValues.email} onChange={handleInputChange} placeholder="email" type="email" required name="email"/>
      <Input value={formValues.password} onChange={handleInputChange} placeholder="password" type="password" name="password" required minLength={6} />
      <Input value={formValues.confirm} onChange={handleInputChange} placeholder="confirm password" type="password" name="confirm" required minLength={6} />
      <Input value={formValues.username} onChange={handleInputChange} placeholder="username" type="text" name="username" required />
      {!!errorMessage && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      <Button block type="submit">
        REGISTER
      </Button>
    </Form>
  )
}

export default Register;
