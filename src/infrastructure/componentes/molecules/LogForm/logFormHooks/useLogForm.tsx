import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGlobalContext } from 'context';
import Swal from 'sweetalert2';
import { LOGIN_URL } from 'config';
const axios = require('axios').default;

const useLogForm = () => {
  //Using the dispatch and constans
  const { dispatch, C } = useGlobalContext();

  //Function to onsubmit, change loading state, and make a post
  const login = async (email: string, password: string) => {
    dispatch({ type: C.LOGIN_LOADING, payload: true });
    const data = {
      email,
      password,
    };
    try {
      let response = await axios.post(`${LOGIN_URL}`, data);
      if (response) {
        const {
          data: { token },
          status,
          statusText,
        } = response;
        dispatch({
          type: C.LOGIN_SUCCESS,
          payload: { token, status, statusText, error: false },
        });
        Swal.fire({
          toast: true,
          icon: 'success',
          title: 'Signed in successfully',
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        timer: 5000,
        timerProgressBar: true,
        footer: `${error}`,
      });
      dispatch({
        type: C.LOGIN_FAIL,
        payload: typeof error.message !== 'undefined' && error.message,
      });
    }

    dispatch({ type: C.LOGIN_LOADING, payload: false });
  };

  interface formDataInterface {
    email: string;
    password: string;
  }
  //Validation logic with useFormik
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    dirty,
  } = useFormik<formDataInterface>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }: formDataInterface) => {
      login(email, password);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El correo introducido es incorrecto')
        .required('El campo correo es requerido'),
      password: Yup.string()
        .min(2, 'El password debe ser de minimo 2 caracteres')
        .required('El campo contraseña es requerido'),
    }),
  });

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    dirty,
  };
};

export default useLogForm;
