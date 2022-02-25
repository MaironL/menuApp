import S from './mainHeader.module.scss';

interface IMainHeader {
  content: string;
  size: string;
}
const MainHeader = ({ content, size }: IMainHeader) => {
  return (
    <header
      className={`pt-2 bg-warning d-flex justify-content-start align-items-center bg-secondary ps-5 ${size} ${S.header}`}
    >
      <h1 className='m-0 text-dark'>{content}</h1>
    </header>
  );
};

export default MainHeader;
