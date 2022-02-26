import { Button, Form } from 'react-bootstrap';
import S from './logForm.module.scss';
import useLogForm from './logFormHooks/useLogForm';

const LogForm = () => {
  const {
    handleSubmit,
    handleChange,
    values,
    handleBlur,
    touched,
    errors,
    isValid,
    dirty,
  } = useLogForm();

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
          onBlur={handleBlur}
          onFocus={handleBlur}
        />
        {touched.email && errors.email ? (
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
          onBlur={handleBlur}
          onFocus={handleBlur}
        />
        {touched.password && errors.password ? (
          <div className='position-absolute mt-1 text-danger fw-bold'>
            {errors.password}
          </div>
        ) : null}
      </Form.Group>

      <Button
        className='mb-3 mt-2'
        variant='primary'
        type='submit'
        disabled={!(isValid && dirty)}
      >
        Submit
      </Button>
    </Form>
  );
};

export default LogForm;
