import { useGlobalContext } from 'context';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useLogout = () => {
  const MySwal = withReactContent(Swal);
  const { dispatch, C } = useGlobalContext();

  const logout = () => {
    dispatch({ type: C.LOGOUT });
    localStorage.removeItem('MenuAppstate');
  };

  const wantLogout = () => {
    return MySwal.fire({
      icon: 'warning',
      title: 'logging out',
      text: 'Are you sure, you want to logout',
      showCancelButton: true,
      confirmButtonText: 'logout',
      cancelButtonText: 'cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return { logout, wantLogout };
};

export default useLogout;
