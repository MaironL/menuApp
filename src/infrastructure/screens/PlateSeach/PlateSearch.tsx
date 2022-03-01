import { MainHeader, SearchForm, Dish } from 'infrastructure/componentes';
import { useParams } from 'react-router-dom';
import { useDishesList, useSelectAddDish } from './plateSearchHooks';
import S from './plateSearch.module.scss';

const PlateSearch = () => {
  const { menus } = useParams();
  const { dishes } = useDishesList();
  const { selectDish } = useSelectAddDish();

  return (
    <div className={` ${S.mainCont}`}>
      <div className={`bg-secondary shadow  ${S.headerCont}`}>
        <MainHeader size='fs-1' name={menus} short={false} />
      </div>
      <div className='container w-75 bg-light rounded-3 mt-4 mb-3 shadow'>
        <SearchForm />
        <div className='d-flex flex-wrap justify-content-center mt-4 mb-3'>
          {dishes &&
            dishes.map((item, i) => {
              const {
                id,
                title,
                image,
                vegan,
                pricePerServing,
                servings,
                healthScore,
                readyInMinutes,
              } = item;
              let price =
                Math.round((pricePerServing * servings + Number.EPSILON) * 100) / 100;

              return (
                <div
                  key={i}
                  className='mx-3 mx-lg-2 mb-5 mb-lg-2 '
                  tabIndex={-1}
                  onClick={() => selectDish(id, price, item)}
                >
                  <Dish
                    img={image}
                    title={title}
                    time={readyInMinutes}
                    score={healthScore}
                    canClose={false}
                    vegan={vegan}
                    price={price}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PlateSearch;
