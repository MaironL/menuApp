import S from './dish.module.scss';
import { Card } from 'react-bootstrap';
import { FaLeaf } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import { MdOutlineHealthAndSafety } from 'react-icons/md';

interface Iplate {
  img: string;
  title: string;
  time: number;
  score: number;
  vegan: boolean;
  canClose: boolean;
  price: number;
}
const Dish = ({ img, title, time, score, vegan, canClose, price }: Iplate) => {
  return (
    <Card className={`position-relative shadow h-100 ${S.card}`}>
      {canClose && (
        <div className='position-absolute top-0 end-0 px-2'>
          <GrClose />
        </div>
      )}
      <Card.Img variant='top' src={img} />
      <Card.Body className='position-relative px-1 d-flex flex-column justify-content-between'>
        <div
          className={`position-absolute bg-white rounded-pill px-2 py-1 text-success text-center shadow ${S.price}`}
        >
          {`$${price}`}
        </div>
        {vegan && (
          <div
            className={`d-flex position-absolute  bg-white rounded-pill px-2 py-1 text-center shadow text-success ${S.vegan}`}
          >
            <span className='me-1 fw-bold'>Vegan</span>
            <FaLeaf className='fs-5' />
          </div>
        )}
        <Card.Title className='fs-6 text-center'>{title}</Card.Title>
        <Card.Text className='fs-6 px-2'>
          <div className='d-flex align-items-center'>
            <BiTime className='text-info fs-5 me-1' /> <span>{time}</span>
          </div>{' '}
          <div className='d-flex align-items-center'>
            <MdOutlineHealthAndSafety className='text-info fs-5 me-1' />
            <span className='d-block'>{score}</span>
          </div>
        </Card.Text>

        {/* <Button variant='primary'>Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default Dish;
