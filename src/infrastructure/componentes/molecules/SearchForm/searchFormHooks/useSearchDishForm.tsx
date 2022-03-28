import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGlobalContext } from 'context';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const axios = require('axios').default;

const useSearchDishForm = () => {
  const MySwal = withReactContent(Swal);
  const { dispatch, C } = useGlobalContext();
  const { menus } = useParams();

  //Function to onsubmit, change loading state, and make a serach dishes
  const searchDish = async (
    dish: string,
    includeCuisine: { value: string; label: string }[],
    excludeCuisine: { value: string; label: string }[],
    expectedResult: string,
    isVegan: string
  ) => {
    dispatch({ type: C.SEARCH_LOADING, payload: true });
    //get a string ready of all include dishes
    const includedDishes = '&cuisine='.concat(
      includeCuisine
        .map((item: { value: string; label: string }) => {
          return item.value + ',';
        })
        .join('')
        .slice(0, -1)
    );
    //get a string ready of all excludes dishes
    const excludeDishes = '&excludeCuisine='.concat(
      excludeCuisine
        .map((item: { value: string; label: string }) => {
          return item.value + ',';
        })
        .join('')
        .slice(0, -1)
    );

    //The complete query
    const theQueryString = `?query=${dish}${
      includeCuisine.length > 0 ? includedDishes : ''
    }${excludeCuisine.length > 0 ? excludeDishes : ''}&number=${expectedResult}${
      isVegan ? '&diet=Vegan' : ''
    }&addRecipeInformation=true`;
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_SEARCH_ENDPOINT}${theQueryString}&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      if (response) {
        dispatch({
          type: C.SEARCH_DISHES_SUCCESS,
          payload: { name: menus, dishes: response.data.results },
        });
        if (response.data.results.length > 0) {
          MySwal.fire({
            toast: true,
            icon: 'success',
            title: 'dishes were successfully searched',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          MySwal.fire({
            toast: true,
            icon: 'error',
            title:
              'Sorry, cant find any matches, please try to look for another dish selection',
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
          });
        }
      }
    } catch (error) {
      MySwal.fire({
        toast: true,
        icon: 'error',
        title: 'Oops...Something were wrong with the dishes search',
        position: 'top-end',
        timer: 6000,
        showConfirmButton: false,
        timerProgressBar: true,
        footer: `${error}`,
      });
      dispatch({
        type: C.SEARCH_DISHES_FAIL,
        payload: { fail: true, error: error },
      });
    }

    dispatch({ type: C.SEARCH_LOADING, payload: false });
  };

  interface IFormData {
    dish: string;
    includeCuisine: { value: string; label: string }[];
    excludeCuisine: { value: string; label: string }[];
    expectedResult: string;
    isVegan: string;
  }
  //Validation logic with useFormik
  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    dirty,
  } = useFormik<IFormData>({
    initialValues: {
      dish: '',
      includeCuisine: [],
      excludeCuisine: [],
      expectedResult: '10',
      isVegan: '',
    },
    onSubmit: ({
      dish,
      includeCuisine,
      excludeCuisine,
      expectedResult,
      isVegan,
    }: IFormData) => {
      searchDish(dish, includeCuisine, excludeCuisine, expectedResult, isVegan);
    },
    validationSchema: Yup.object({
      dish: Yup.string()
        .required('This field is required')
        .min(2, 'The dish name must be of minimun two character'),
    }),
  });

  return {
    setFieldValue,
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

export default useSearchDishForm;
