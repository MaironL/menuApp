import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DetailsTable } from 'infrastructure/componentes';
import { useGlobalContext } from 'context';
import { useParams, useNavigate } from 'react-router-dom';
import { useVOM } from '.';

const useSelectAddDish = () => {
  const navigate = useNavigate();
  const { menus } = useParams();
  const MySwal = withReactContent(Swal);
  const { vOm } = useVOM();
  const { C, dispatch } = useGlobalContext();

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

  const selectDish = (dishData: IdishData) => {
    //This function return the modal to select the dish and the alarm from that action
    const price = (dishData.pricePerServing * dishData.servings).toFixed(2);
    //Modal to confirm the adding of the dish to the menu
    MySwal.fire({
      title: <span>{dishData.title}</span>,
      imageUrl: dishData.image,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add this dish',
      html: (
        <div>
          <p>Are you sure you want to add this dish to your menu?</p>
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
    }).then((result) => {
      //Depending of the validation, a diferent result
      if (result.isConfirmed) {
        if (vOm === 'noMoreMeat' && !dishData.vegan) {
          MySwal.fire({
            toast: true,
            icon: 'error',
            title: 'Sorry, you can only add 2 "Non Vegan" dishes per menu',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
          });
        } else if (vOm === 'noMoreVegan' && dishData.vegan) {
          MySwal.fire({
            toast: true,
            icon: 'error',
            title: 'Sorry, you can only add 2 "Vegan" dishes per menu',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
          });
        } else if (vOm === 'noMoreDishes') {
          navigate(`/${menus}`);
          MySwal.fire({
            toast: true,
            icon: 'error',
            title: 'Sorry, you cannot add more than 4 dishes per menu',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
          });
        } else {
          //adding the dish
          dispatch({ type: C.ADD_DISH_TO_MENU, payload: { dishData, menus } });
          //couting the dish types vegan or not vegan
          dispatch({ type: C.COUNT_DISHES_TYPES, payload: menus });
          //to kwon the type of dish selected
          dispatch({
            type: C.SELECT_DISH_TO_MENU,
            payload: { menus, isVegan: dishData.vegan },
          });
          //confirmation alert
          MySwal.fire({
            toast: true,
            icon: 'success',
            title: 'You successfully added a new dish',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  return { selectDish };
};

export default useSelectAddDish;
