import { Card } from 'react-bootstrap';
import S from './plate.module.scss';
import { FaLeaf } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { GrClose } from 'react-icons/gr';

interface Iplate {
  img: string;
  title: string;
  time: string;
  score: string;
  canClose: boolean;
}
const Plate = ({ img, title, time, score, canClose }: Iplate) => {
  return (
    <Card className={`position-relative shadow mx-3 mx-lg-2 mb-5 mb-lg-2  ${S.card}`}>
      {canClose && (
        <div className='position-absolute top-0 end-0 px-2'>
          <GrClose />
        </div>
      )}
      <Card.Img variant='top' src='https://via.placeholder.com/100x100' />
      <Card.Body className='position-relative px-1'>
        <div
          className={`position-absolute bg-white rounded-pill px-2 py-1 text-success text-center shadow ${S.price}`}
        >
          $600
        </div>
        <div
          className={`d-flex position-absolute  bg-white rounded-pill px-2 py-1 text-center shadow text-success ${S.vegan}`}
        >
          <span className='me-1 fw-bold'>Vegan</span>
          <FaLeaf className='fs-5' />
        </div>
        <Card.Title className='fs-6 text-center'>{title}</Card.Title>
        <Card.Text className='fs-6 px-2'>
          <div className='d-flex align-items-center'>
            <BiTime className='text-info fs-5 me-1' /> <span>60 min</span>
          </div>{' '}
          <div className='d-flex align-items-center'>
            <MdOutlineHealthAndSafety className='text-info fs-5 me-1' />
            <span className='d-block'>86 score</span>
          </div>
        </Card.Text>

        {/* <Button variant='primary'>Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default Plate;
