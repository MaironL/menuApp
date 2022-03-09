import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import S from './logForm.module.scss';
import { useLogForm } from './logFormHooks';

const LogForm = () => {
  const { values, canSubmit, errors, handleSubmit, handleChange } = useLogForm();
  const [focused, setFocused] = useState({
    email: false,
    password: false,
  });

  const handleFocusedBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const name = e.target.name;
    setFocused((prevFocused) => {
      return { ...prevFocused, [name]: true };
    });
  };
  const handleFocusedFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const name = e.target.name;
    name === 'password' &&
      setFocused((prevFocused) => {
        return { ...prevFocused, [name]: true };
      });
  };

  return (
    <Form className={`bg-light p-4 rounded-3 ${S.form}`} onSubmit={handleSubmit}>
      <Form.Group className='mb-4 position-relative' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Jhon@dohn.com'
          onChange={handleChange}
          value={values.email}
          onBlur={handleFocusedBlur}
          onFocus={handleFocusedFocus}
        />
        {focused.email && errors.email ? (
          <div className='position-absolute mt-1 text-danger fw-bold'>{errors.email}</div>
        ) : null}
      </Form.Group>

      <Form.Group className='mb-4 position-relative' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='*****'
          onChange={handleChange}
          value={values.password}
          onBlur={handleFocusedBlur}
          onFocus={handleFocusedFocus}
        />
        {focused.password && errors.password ? (
          <div className='position-absolute mt-1 text-danger fw-bold'>
            {errors.password}
          </div>
        ) : null}
      </Form.Group>

      <Button className='mb-3 mt-2' variant='primary' type='submit' disabled={canSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default LogForm;
