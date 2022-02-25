import { Table } from 'react-bootstrap';
import S from './plateDetails.module.scss';

const PlateDetails = () => {
  return (
    <div className='d-flex flex-column  align-items-center py-3 h-100'>
      <div className='d-flex align-items-center justify-content-center h-100 w-100 mb-4'>
        <header>
          <h2 className='fs-4 fw-bold'>Details of plate</h2>
        </header>
      </div>

      <div className={`d-flex flex-column flex-lg-row mt-auto ${S.fullDetailCont}`}>
        <div className={`d-flex pb-3 ${S.imgCont}`}>
          <img
            className='w-100 h-100 rounded-3'
            src='https://via.placeholder.com/250x250'
            alt=''
          />
        </div>

        <div
          className={`d-flex flex-column justify-content-start align-items-center h-100 px-lg-1 ${S.descCont}`}
        >
          <div className='text-center px-lg-4 w-100'>
            <h2 className='fs-6'>Este sera el nombre del platillo </h2>
          </div>
          <div className='px-1 mt-auto w-100'>
            <Table hover>
              <tbody className={`${S.tableBody}`}>
                <tr>
                  <td>Price:</td>
                  <td>$600</td>
                </tr>
                <tr>
                  <td>Servings:</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Price per Serving:</td>
                  <td>$300 </td>
                </tr>
                <tr>
                  <td>Cooking Time:</td>
                  <td>60 minutes</td>
                </tr>
                <tr>
                  <td>Health Score:</td>
                  <td>86</td>
                </tr>
                <tr>
                  <td>Vegan:</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Gluten Free:</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Dairy Free:</td>
                  <td>Yes</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlateDetails;
