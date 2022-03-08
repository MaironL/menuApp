import { useGlobalContext } from 'context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useDelEditMenu = () => {
  const { C, dispatch, menuList } = useGlobalContext();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const delEditMenu = (id: string) => {
    MySwal.fire({
      title: <span>Deleting or Editing</span>,
      text: 'Do you wanna edit or delete this menu name?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonText: 'Delete this menu',
      confirmButtonText: 'Edit this menu name',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { value: name } = await Swal.fire({
          title: 'Choice a diferent name',
          input: 'text',
          inputLabel: 'Write the new name of your menu',
          inputPlaceholder: 'menu name',
          confirmButtonText: 'Change Name',
          confirmButtonColor: '#3085d6',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          cancelButtonColor: '#d33',
        });
        if (name) {
          dispatch({ type: C.EDIT_MENU_NAME, payload: { id, newName: name } });
          navigate(`/${name}`);
          Swal.fire({
            toast: true,
            icon: 'success',
            title: `Menu name has been updated to "${name}", successfully`,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      } else if (result.isDenied) {
        dispatch({ type: C.DEL_MENU_NAME, payload: id });
        navigate(`/${menuList[0].name}`);
        if (menuList.length === 1) {
          navigate('/');
        }
        MySwal.fire({
          toast: true,
          icon: 'success',
          title: 'You successfully deleted the menu',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    });
  };

  return { delEditMenu };
};

export default useDelEditMenu;
