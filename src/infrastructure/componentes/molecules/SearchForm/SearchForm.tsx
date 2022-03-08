import { Button, Form } from 'react-bootstrap';
import { ReactMultiSelect } from 'infrastructure/componentes';
import { useSearchDishForm, useOptions } from './searchFormHooks';

const SearchForm = () => {
  const { options } = useOptions();
  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    dirty,
  } = useSearchDishForm();

  return (
    <Form className='p-4' onSubmit={handleSubmit}>
      <Form.Group className='mb-4 position-relative'>
        <Form.Label>Search Dishes</Form.Label>
        <Form.Control
          type='text'
          name='dish'
          placeholder='Pasta'
          onChange={handleChange}
          value={values.dish}
          onBlur={handleBlur}
          onFocus={handleBlur}
        />
        {touched.dish && errors.dish ? (
          <div className='position-absolute mt-1 text-danger fw-bold'>{errors.dish}</div>
        ) : null}
      </Form.Group>
      <Form.Group className='mb-4'>
        <Form.Label>Include Cuisine</Form.Label>
        <ReactMultiSelect
          options={options}
          onChange={(value: any) => setFieldValue('includeCuisine', value)}
          value={values.includeCuisine}
        />
      </Form.Group>
      <Form.Group className='mb-4'>
        <Form.Label>Exclude Cuisine</Form.Label>
        <ReactMultiSelect
          options={options}
          onChange={(value: any) => setFieldValue('excludeCuisine', value)}
          value={values.excludeCuisine}
        />
      </Form.Group>
      <Form.Group className='mb-4'>
        <Form.Label>Expected results</Form.Label>
        <Form.Range
          name='expectedResult'
          onChange={handleChange}
          value={values.expectedResult}
          min={'1'}
        />
        <Form.Text>
          Choose a range between 1 - 100 results :
          <span className='text-primary fw-bold'> {values.expectedResult}</span>
        </Form.Text>
      </Form.Group>
      <Form.Group className='mb-4'>
        <Form.Check
          type='switch'
          id='custom-switch'
          label='Is vegan'
          name='isVegan'
          onChange={handleChange}
          value={values.isVegan}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!(isValid && dirty)}>
        Submit
      </Button>
    </Form>
  );
};

export default SearchForm;
