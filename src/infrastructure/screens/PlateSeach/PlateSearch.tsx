import { MainHeader, SearchForm, Plate } from 'infrastructure/componentes';
import S from './plateSearch.module.scss';

const PlateSearch = () => {
  return (
    <div className={` ${S.mainCont}`}>
      <div className={`bg-secondary shadow  ${S.headerCont}`}>
        <MainHeader size='fs-1' content='Buscador de Platillos' />
      </div>
      <div className='container w-75 bg-light rounded-3 mt-4 mb-3 shadow'>
        <SearchForm />
        <div className='d-flex flex-wrap justify-content-center mt-4 mb-3'>
          <Plate
            img={'asdasd'}
            title={'El titulo'}
            time={'126'}
            score={'34'}
            canClose={false}
          />
          <Plate
            img={'asdasd'}
            title={'El titulo'}
            time={'126'}
            score={'34'}
            canClose={false}
          />
          <Plate
            img={'asdasd'}
            title={'El titulo'}
            time={'126'}
            score={'34'}
            canClose={false}
          />
          <Plate
            img={'asdasd'}
            title={'El titulo'}
            time={'126'}
            score={'34'}
            canClose={false}
          />
          <Plate
            img={'asdasd'}
            title={'El titulo'}
            time={'126'}
            score={'34'}
            canClose={false}
          />
          <Plate
            img={'asdasd'}
            title={'El titulo'}
            time={'126'}
            score={'34'}
            canClose={false}
          />
          <Plate
            img={'asdasd'}
            title={'El titulo'}
            time={'126'}
            score={'34'}
            canClose={false}
          />
          <Plate
            img={'asdasd'}
            title={'El titulo'}
            time={'126'}
            score={'34'}
            canClose={false}
          />
          <Plate
            img={'asdasd'}
            title={'El titulo'}
            time={'126'}
            score={'34'}
            canClose={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PlateSearch;
