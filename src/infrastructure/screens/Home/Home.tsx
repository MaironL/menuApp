import { MainHeader } from 'infrastructure/componentes';
import S from './home.module.scss';

const Home = () => {
  return (
    <main className={`container-fluid px-0  ${S.mainCont}`}>
      <div className={`bg-secondary shadow  ${S.headerCont}`}>
        <MainHeader size='fs-1' name='Menus creator' short={false} />
      </div>
      <section
        className={`d-flex justify-content-center align-items-center ${S.homeCont}`}
      >
        <h1 className='text-center fw-bolder text-light'>
          Create a new menu, <br /> or choose one of those you have already created.
        </h1>
      </section>
    </main>
  );
};

export default Home;
