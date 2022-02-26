import { useGlobalContext } from 'context';
import Swal from 'sweetalert2';

const useLogout = () => {
  const { dispatch, C } = useGlobalContext();

  const logout = () => {
    dispatch({ type: C.LOGOUT });
    localStorage.removeItem('MenuAppstate');
  };

  const wantLogout = () => {
    return Swal.fire({
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
