import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import S from './logForm.module.scss';
import { useLogForm } from './logFormHooks';

const LogForm = () => {
  const { values, canSubmit, errors, setValues, handleSubmit, handleChange } =
    useLogForm();
  const [focused, setFocused] = useState({
    name: false,
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
    <Form
      className={`d-flex flex-column align-items-center  bg-light p-4 rounded-3 ${S.form}`}
      onSubmit={handleSubmit}
    >
      <h2 className='text-center fs-4'>{values.isLogin ? 'Login' : 'Sign up'}</h2>

      {!values.isLogin && (
        <Form.Group className='mb-4 position-relative w-100' controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='string'
            name='name'
            placeholder='Anna Doe'
            onChange={handleChange}
            value={values.name}
            onBlur={handleFocusedBlur}
            onFocus={handleFocusedFocus}
          />
          {focused.name && errors.name ? (
            <div className='position-absolute mt-1 text-danger fw-bold'>
              {errors.name}
            </div>
          ) : null}
        </Form.Group>
      )}

      <Form.Group className='mb-4 position-relative w-100' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='anna@gmail.com'
          onChange={handleChange}
          value={values.email}
          onBlur={handleFocusedBlur}
          onFocus={handleFocusedFocus}
        />
        {focused.email && errors.email ? (
          <div className='position-absolute mt-1 text-danger fw-bold'>{errors.email}</div>
        ) : null}
      </Form.Group>
      <Form.Group className='mb-4 position-relative w-100' controlId='formBasicPassword'>
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

      <Button
        className='mb-3 mt-2 w-50'
        variant='primary'
        type='submit'
        disabled={canSubmit}
      >
        {values.isLogin ? 'Login' : 'Register'}
      </Button>

      <Form.Group className='mt-4 text-center position-relative'>
        <Button
          className='fs-6'
          variant='transparent'
          type='button'
          onClick={() => setValues({ ...values, isLogin: !values.isLogin })}
        >
          {values.isLogin ? 'Create account' : 'Login with your account'}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LogForm;
