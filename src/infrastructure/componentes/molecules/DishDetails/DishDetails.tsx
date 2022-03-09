import { Table } from 'react-bootstrap';
import { DetailsTable } from 'infrastructure/componentes';
import S from './dishDetails.module.scss';

interface IDishDetails {
  dishData: {
    id: number;
    title: string;
    image: string;
    imageType: string;
    readyInMinutes: number;
    healthScore: number;
    vegan: boolean;
    pricePerServing: number;
    servings: number;
    dairyFree: boolean;
    glutenFree: boolean;
  };
}

const DishDetails = ({ dishData }: IDishDetails) => {
  const price = (dishData.pricePerServing * dishData.servings).toFixed(2);
  return (
    <div className='d-flex flex-column  align-items-center py-3 h-100'>
      <div className='d-flex align-items-center justify-content-center h-100 w-100 mb-4'>
        <header>
          <h2 className='fs-4 fw-bold'>DISH DETAILS</h2>
        </header>
      </div>

      <div className={`d-flex flex-column flex-lg-row mt-auto ${S.fullDetailCont}`}>
        <div className={`d-flex pb-3 ${S.imgCont}`}>
          <img className='w-100 h-100 rounded-3' src={`${dishData.image}`} alt='' />
        </div>

        <div
          className={`d-flex flex-column justify-content-start align-items-center h-100 px-lg-1 ${S.descCont}`}
        >
          <div className='text-center px-lg-4 w-100'>
            <h2 className='fs-6'>{dishData.title}</h2>
          </div>
          <div className='px-1 mt-auto w-100'>
            <DetailsTable
              isModal={false}
              readyInMinutes={dishData.readyInMinutes}
              healthScore={dishData.healthScore}
              vegan={dishData.vegan}
              pricePerServing={dishData.pricePerServing}
              servings={dishData.servings}
              price={price}
              dairyFree={dishData.dairyFree}
              glutenFree={dishData.glutenFree}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
