import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DetailsTable } from 'infrastructure/componentes';
import { useGlobalContext } from 'context';

const useSelectAddDish = () => {
  const MySwal = withReactContent(Swal);
  const { C, dispatch, meatOrVegan } = useGlobalContext();

  interface Iitem {
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

  const selectDish = (id: number, price: number, item: Iitem) => {
    //to kwon the type of dish selected
    dispatch({ type: C.SELECT_DISH_TO_MENU, payload: item.vegan });
    //This function return the modal to select the dish and the alarm from that action
    return MySwal.fire({
      title: <span>{item.title}</span>,
      imageUrl: item.image,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add the dish',
      html: (
        <div>
          <p>Are you sure you want to add this dish to your menu?</p>
          <DetailsTable
            price={price}
            readyInMinutes={item.readyInMinutes}
            healthScore={item.healthScore}
            vegan={item.vegan}
            pricePerServing={item.pricePerServing}
            servings={item.servings}
            dairyFree={item.dairyFree}
            glutenFree={item.glutenFree}
          />
        </div>
      ),
    }).then((result) => {
      if (result.isConfirmed) {
        if (meatOrVegan === 'noMoreMeat' && !item.vegan) {
          Swal.fire({
            toast: true,
            icon: 'error',
            title: 'You cannot add more "No Vegan" dishes',
            position: 'top-end',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
          });
        } else if (meatOrVegan === 'noMoreVegan' && item.vegan) {
          Swal.fire({
            toast: true,
            icon: 'error',
            title: 'You cannot add more "Vegan" dishes',
            position: 'top-end',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
          });
        } else if (meatOrVegan === 'noMoreDishes') {
          Swal.fire({
            toast: true,
            icon: 'error',
            title: 'Sorry, you cannot add more dishes',
            position: 'top-end',
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true,
          });
        } else {
          dispatch({ type: C.ADD_DISH_TO_MENU, payload: item });
          Swal.fire({
            toast: true,
            icon: 'success',
            title: 'You successfully added a new dish',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  return { selectDish };
};

export default useSelectAddDish;
