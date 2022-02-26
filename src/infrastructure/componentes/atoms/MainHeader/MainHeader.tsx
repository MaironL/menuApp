import S from './mainHeader.module.scss';
import { FaUserAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useLogout } from './mainHeaderHook';

interface IMainHeader {
  content: string;
  size: string;
}
const MainHeader = ({ content, size }: IMainHeader) => {
  const { wantLogout } = useLogout();
  return (
    <header
      className={`py-2 bg-warning d-flex justify-content-start align-items-center px-5 ${size} ${S.header}`}
    >
      <div className='d-flex align-items-center justify-content-between'>
        <h1 className='m-0 text-dark'>{content}</h1>
        <Button
          variant='transparent'
          className='d-flex fs-6 fw-bold py-0'
          onClick={wantLogout}
        >
          Salir <FaUserAlt className='ms-2 text-danger fs-5' />
        </Button>
      </div>
    </header>
  );
};

export default MainHeader;
