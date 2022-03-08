import { Table } from 'react-bootstrap';

interface ITotalDishData {
  totalDishData: {
    totalHealScore: number | false;
    totalReadyInMinutes: number | false;
    totalPrice: string | false | 0;
  };
}

const MenuDetails = ({ totalDishData }: ITotalDishData) => {
  return (
    <div className='px-3 pt-3 mt-auto w-100'>
      <div className='d-flex align-items-center justify-content-center h-100 w-100 mb-4'>
        <header>
          <h2 className='fs-4'>Details of the Menu</h2>
        </header>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th>Total amount</th>
            <th>Total health Score</th>
            <th>Total prepare time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${totalDishData.totalPrice}</td>
            <td>{totalDishData.totalHealScore}</td>
            <td>{totalDishData.totalReadyInMinutes} minutes</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default MenuDetails;
