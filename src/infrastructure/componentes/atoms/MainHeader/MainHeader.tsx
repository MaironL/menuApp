import S from './mainHeader.module.scss';
import { FaUserAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useLogout } from './mainHeaderHook';

interface IMainHeader {
  name: any;
  size: string;
  short: boolean;
}
const MainHeader = ({ name, size, short }: IMainHeader) => {
  const { wantLogout } = useLogout();
  return (
    <header
      className={`py-0 py-xl-2 bg-warning d-flex justify-content-start align-items-center px-3 px-lg-5 ${size} ${
        S.header
      } ${short && S.headerShort}`}
    >
      <div className='d-flex align-items-center justify-content-between'>
        <h1 className='m-0 text-dark fs-2 fs-xl-1 pt-2 pb-1 pt-xl-0'>{name}</h1>
        <Button
          variant='transparent'
          className='d-flex fs-6 fw-bold py-0'
          onClick={wantLogout}
        >
          Logout <FaUserAlt className='ms-2 text-danger fs-5' />
        </Button>
      </div>
    </header>
  );
};

export default MainHeader;
