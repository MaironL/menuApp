import { Table } from 'react-bootstrap';

interface IDetailsTable {
  price: number;
  readyInMinutes: number;
  healthScore: number;
  vegan: boolean;
  pricePerServing: number;
  servings: number;
  dairyFree: boolean;
  glutenFree: boolean;
}

const DetailsTable = ({
  readyInMinutes,
  healthScore,
  vegan,
  pricePerServing,
  servings,
  price,
  dairyFree,
  glutenFree,
}: IDetailsTable) => {
  return (
    <Table hover responsive>
      <tbody>
        <tr>
          <td>Price:</td>
          <td>${price}</td>
        </tr>
        <tr>
          <td>Servings:</td>
          <td>{servings}</td>
        </tr>
        <tr>
          <td>Price per Serving:</td>
          <td>${pricePerServing} </td>
        </tr>
        <tr>
          <td>Ready in:</td>
          <td>{readyInMinutes} min</td>
        </tr>
        <tr>
          <td>Health Score:</td>
          <td>{healthScore}</td>
        </tr>
        <tr>
          <td>Vegan:</td>
          <td>{`${vegan === true ? 'yes' : 'no'}`}</td>
        </tr>
        <tr>
          <td>Gluten Free:</td>
          <td>{`${glutenFree === true ? 'yes' : 'no'}`}</td>
        </tr>
        <tr>
          <td>Dairy Free:</td>
          <td>{`${dairyFree === true ? 'yes' : 'no'}`}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default DetailsTable;
