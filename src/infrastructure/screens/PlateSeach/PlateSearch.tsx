import { MainHeader, SearchForm, Dish } from 'infrastructure/componentes';
import { useDishesList, useSelectAddDish } from './plateSearchHooks';
import { useParams, Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { useGlobalContext } from 'context';
import { Spinner } from 'react-bootstrap';
import S from './plateSearch.module.scss';

const PlateSearch = () => {
  const { menus } = useParams();
  const { dishes } = useDishesList();
  const { searchLoading } = useGlobalContext();
  const { selectDish } = useSelectAddDish();

  return (
    <div className={`${S.mainCont}`}>
      <div className={`bg-secondary shadow  ${S.headerCont}`}>
        <MainHeader size='fs-1' name={menus} short={false} />
      </div>
      <Link to={`/${menus}`} className={`${S.backBtn}`}>
        <TiArrowBack />
      </Link>
      <div className='container w-100 pt-4 bg-light rounded-3 mt-4 mb-3 shadow'>
        <SearchForm />

        <div className='d-flex flex-wrap justify-content-center mt-4 mb-3'>
          {searchLoading ? (
            <Spinner animation='border' variant='primary' />
          ) : (
            <>
              {dishes.map((dish, i) => {
                return (
                  <div
                    key={i}
                    className='mx-3 mx-lg-2 mb-5 mb-lg-2 '
                    tabIndex={-1}
                    onClick={() => selectDish(dish)}
                  >
                    <Dish dishData={dish} canDel={false} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlateSearch;
