import { useGlobalContext } from 'context';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsTable } from 'infrastructure/componentes';

interface IdishData {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  healthScore: number;
  vegan: boolean;
  pricePerServing: number;
  servings: number;
  dairyFree: boolean;
  glutenFree: boolean;
}

const useShowDishDetails = () => {
  const [size, setSize] = useState([0, 0]);
  const MySwal = withReactContent(Swal);
  const { C, dispatch, menuList } = useGlobalContext();
  const { menus } = useParams();

  //Get windows size
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  //Setting Dish Details modal
  const setDishDetails = (dishData: IdishData) => {
    if (size[0] < 992) {
      const price = (dishData.pricePerServing * dishData.servings).toFixed(2);
      return MySwal.fire({
        title: <span>{dishData.title}</span>,
        imageUrl: dishData.image,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'ok',
        html: (
          <div>
            <p>dish details</p>
            <DetailsTable
              isModal={true}
              price={price}
              readyInMinutes={dishData.readyInMinutes}
              healthScore={dishData.healthScore}
              vegan={dishData.vegan}
              pricePerServing={dishData.pricePerServing}
              servings={dishData.servings}
              dairyFree={dishData.dairyFree}
              glutenFree={dishData.glutenFree}
            />
          </div>
        ),
      });
    } else {
      dispatch({ type: C.SHOW_DISH_DETAILS, payload: { menus, detail: dishData } });
    }
  };
  //Dish details Data
  const menu = menuList.find((menu) => menu.name === menus);
  const dish = menu !== undefined && menu.dishDetail;
  const dishDetails = dish
    ? dish
    : {
        id: 0,
        title: '',
        image: 'https://placehold.jp/FFFFFF/ffffff/150x150.jpg',
        imageType: '',
        readyInMinutes: 0,
        healthScore: 0,
        vegan: false,
        pricePerServing: 0,
        servings: 0,
        dairyFree: false,
        glutenFree: false,
      };

  return { setDishDetails, dishDetails };
};

export default useShowDishDetails;
