import Swal from 'sweetalert2';
import { useGlobalContext } from 'context';
import { useNavigate } from 'react-router-dom';

const useMenuList = () => {
  const navigate = useNavigate();
  const { dispatch, C } = useGlobalContext();

  const getMenu = async () => {
    const { value: name } = await Swal.fire({
      title: 'Create a new menu',
      input: 'text',
      inputLabel: 'Write your new menu name',
      inputPlaceholder: 'menu name',
      confirmButtonText: 'Create',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
    });
    if (name) {
      dispatch({ type: C.CREATE_MENU, payload: name });
      navigate(`/${name}`);
      Swal.fire({
        toast: true,
        icon: 'success',
        title: `Menu ${name}, created`,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return { getMenu };
};

export default useMenuList;
