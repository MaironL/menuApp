import { Button, Form } from 'react-bootstrap';

const SearchForm = () => {
  return (
    <Form className='p-4'>
      <Form.Group className='mb-2'>
        <Form.Label>Platillo a buscar</Form.Label>
        <Form.Control type='text' placeholder='Pasta' />
      </Form.Group>

      <Form.Group className='mb-2'>
        <Form.Label>Incluye Cuisine</Form.Label>
        <Form.Select aria-label='Default select example'>
          <option>Open this select menu</option>
          <option value='1'>italiana</option>
          <option value='2'>Japonesa</option>
          <option value='3'>Venezolana</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className='mb-2'>
        <Form.Label>Excluye Cuisine</Form.Label>
        <Form.Select aria-label='Default select example'>
          <option>Open this select menu</option>
          <option value='1'>italiana</option>
          <option value='2'>Japonesa</option>
          <option value='3'>Venezolana</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className='mb-4'>
        <Form.Label>Type</Form.Label>
        <Form.Select aria-label='Default select example'>
          <option>Open this select menu</option>
          <option value='1'>Postre</option>
          <option value='2'>Tentenpie</option>
          <option value='3'>etc</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className='mb-4' controlId='formBasicPassword'>
        <Form.Check type='switch' id='custom-switch' label='Vegana' />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default SearchForm;
