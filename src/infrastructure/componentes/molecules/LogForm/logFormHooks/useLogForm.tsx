import validation from './validation';
import { useGlobalContext } from 'context';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LOGIN_URL } from 'config';
import { useEffect, useState } from 'react';
const axios = require('axios').default;

const useLogForm = () => {
  const MySwal = withReactContent(Swal);
  //Using the dispatch and constans
  const { dispatch, C } = useGlobalContext();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [canSubmit, setCanSubmit] = useState(false);

  //Function to onsubmit, change loading state, and make a post
  const handleSubmit = async () => {
    dispatch({ type: C.LOGIN_LOADING, payload: true });

    const data = {
      ...values,
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
        MySwal.fire({
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
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please verify that the username and password entered are correct.',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((prevFormData) => {
      return { ...prevFormData, [name]: type === 'checkbox' ? checked : value };
    });
  };

  useEffect(() => {
    setErrors(validation(values));
  }, [values]);

  useEffect(() => {
    setCanSubmit(Object.values(errors).some((error) => error !== ''));
  }, [errors]);

  return { values, errors, canSubmit, handleSubmit, handleChange };
};

export default useLogForm;
