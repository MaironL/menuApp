import S from './dish.module.scss';
import { Card } from 'react-bootstrap';
import { FaLeaf } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdOutlineHealthAndSafety } from 'react-icons/md';

interface IDish {
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
  canDel: boolean;
  deleteDish?: () => void;
  setDishDetails?: () => void;
}
const Dish = ({ dishData, canDel, deleteDish, setDishDetails }: IDish) => {
  const price = (dishData.pricePerServing * dishData.servings).toFixed(2);
  return (
    <Card className={`position-relative shadow ${S.card}`}>
      {canDel && (
        <div
          onClick={deleteDish}
          className={`position-absolute bg-white top-0 end-0 ps-2 pb-2 ${S.closeBtn}`}
        >
          <AiFillCloseCircle className='text-danger' />
        </div>
      )}

      <div onClick={setDishDetails} className='h-100 d-flex flex-column'>
        <Card.Img
          className='border border-white border-5'
          variant='top'
          src={dishData.image}
        />
        <Card.Body className='position-relative px-1 d-flex flex-column justify-content-between h-100'>
          <div
            className={`position-absolute bg-white rounded-pill px-2 py-1 text-success text-center shadow ${S.price}`}
          >
            {`$${price}`}
          </div>
          {dishData.vegan && (
            <div
              className={`d-flex position-absolute  bg-white rounded-pill px-2 py-1 text-center shadow text-success ${S.vegan}`}
            >
              <span className='me-1 fw-bold'>Vegan</span>
              <FaLeaf className='fs-5' />
            </div>
          )}
          <Card.Title className='fs-6 text-center'>{dishData.title}</Card.Title>
          <Card.Text className='fs-6 px-2'>
            <div className='d-flex align-items-center'>
              <BiTime className='text-info fs-5 me-1' />{' '}
              <span>{dishData.readyInMinutes}</span>
            </div>{' '}
            <div className='d-flex align-items-center'>
              <MdOutlineHealthAndSafety className='text-info fs-5 me-1' />
              <span className='d-block'>{dishData.healthScore}</span>
            </div>
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};

export default Dish;
