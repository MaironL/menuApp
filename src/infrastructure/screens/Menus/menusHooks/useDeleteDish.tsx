import { useGlobalContext } from 'context';
import { useParams } from 'react-router-dom';
import { useDishDetails, useMenusList } from '.';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useDeleteDish = () => {
  const { C, dispatch } = useGlobalContext();
  const { menus } = useParams();
  const { menuDishes } = useMenusList();
  const { dishDetails } = useDishDetails();
  const MySwal = withReactContent(Swal);

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

  const deleteDish = (id: number, dishData: IdishData) => {
    //Modal asking to delete dish
    MySwal.fire({
      title: <span>{dishData.title}</span>,
      imageUrl: dishData.image,
      text: 'Are you sure you want to delete this dish',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete this dish',
    }).then((result) => {
      if (result.isConfirmed) {
        //Deleting the dish from menu
        dispatch({ type: C.DELETE_DISH_OF_MENU, payload: { menus, id } });
        //Counting how many dish are in menu an their types
        dispatch({ type: C.COUNT_DISHES_TYPES, payload: menus });
        //updating the validation in base of how many dish are in menu
        dispatch({
          type: C.SELECT_DISH_TO_MENU,
          payload: { menus, isVegan: 'notNewDish' },
        });
        //Making the dish detail be the first element in the dishes selected in menu, if the dish details
        //are the details of the dish we just deleted
        if (menuDishes.length > 1) {
          //if the details displayed are the same has the dish we delete
          if (dishDetails.id === id) {
            dispatch({
              type: C.SHOW_DISH_DETAILS,
              payload: { menus, detail: menuDishes[0] },
            });
          }
          //if the details displayed are the same has the dish we delete and it is the first element
          //show seconds dish details
          if (dishDetails.id === menuDishes[0].id && dishDetails.id === id) {
            dispatch({
              type: C.SHOW_DISH_DETAILS,
              payload: { menus, detail: menuDishes[1] },
            });
          }
        } else {
          //if there no more dishes, then show the placeholder
          const dishDetail = {
            id: 0,
            title: '',
            image: 'https://via.placeholder.com/100/FFFFFF/FFFFFF?text=ef',
            imageType: '',
            readyInMinutes: 0,
            healthScore: 0,
            vegan: false,
            pricePerServing: 0,
            servings: 0,
            dairyFree: false,
            glutenFree: false,
          };
          dispatch({
            type: C.SHOW_DISH_DETAILS,
            payload: { menus, detail: dishDetail },
          });
        }

        //Confirmation alert
        MySwal.fire({
          toast: true,
          icon: 'success',
          title: 'You successfully deleted the dish',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  };

  return { deleteDish };
};

export default useDeleteDish;
