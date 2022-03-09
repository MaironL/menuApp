import { MainHeader, MenuDetails, Dish, DishDetails } from 'infrastructure/componentes';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import {
  useMenusList,
  useDishDetails,
  useMenuDetails,
  useDeleteDish,
} from './menusHooks';
import S from './menus.module.scss';

const Menus = () => {
  const { setDishDetails, dishDetails } = useDishDetails();
  const { totalDishData } = useMenuDetails();
  const { deleteDish } = useDeleteDish();
  const { menuDishes } = useMenusList();
  const { menus } = useParams();

  return (
    <main className={`container-fluid px-0  ${S.mainCont}`}>
      <div className={`bg-secondary shadow  ${S.headerCont}`}>
        <MainHeader size='fs-1' name={menus} short={true} />
      </div>

      <section
        className={`container d-none d-lg-block bg-white rounded-right mb-2 shadow ${S.dishDetails}`}
      >
        <DishDetails dishData={dishDetails} />
      </section>
      <section
        className={`position-relative d-flex flex-wrap justify-content-center py-5 py-lg-3 m-lg-2 overflow-auto bg-white rounded shadow ${S.dishList}`}
      >
        {menuDishes.map((dish, i) => {
          return (
            <div key={i} className={`mx-3 mx-lg-2 mb-5 mb-lg-2 ${S.dishCont}`}>
              <Dish
                dishData={dish}
                canDel={true}
                deleteDish={() => deleteDish(dish.id, dish)}
                setDishDetails={() => setDishDetails(dish)}
              />
            </div>
          );
        })}
      </section>
      <section
        className={`d-flex justify-content-center align-items-center my-2 ${S.addDish}`}
      >
        <Link to='dishSearch'>
          <Button className='rounded-pill shadow' variant='warning'>
            Add some dishes
          </Button>
        </Link>
      </section>
      <section className={`bg-white rounded-right shadow ${S.menuDetails}`}>
        <MenuDetails totalDishData={totalDishData} />
      </section>
    </main>
  );
};

export default Menus;
