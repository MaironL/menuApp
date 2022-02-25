import { useFormik } from 'formik';
import * as Yup from 'yup';

const useLogForm = () => {
  //*useFormik validation
  interface formDataInterface {
    name: string;
    subject: string;
    email: string;
    msg: string;
  }
  const {
    handleSubmit,
    handleChange,
    values,
    handleBlur,
    touched,
    errors,
    isValid,
    dirty,
  } = useFormik<formDataInterface>({
    initialValues: {
      name: '',
      subject: '',
      email: '',
      msg: '',
    },
    onSubmit: ({ name, subject, email, msg }: formDataInterface) => {
      //to use this submit i need to use the handleSubmit of formik, now i am using the handleSubmit from Formspree
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El correo introducido es incorrecto')
        .required('El campo correo es requerido'),
      msg: Yup.string()
        .min(3, 'El mensaje debe ser de minimo 3 letras')
        .required('El campo mensaje es requerido'),
    }),
  });

  return {
    handleSubmit,
    handleChange,
    values,
    handleBlur,
    touched,
    errors,
    isValid,
    dirty,
  };
};

export default useLogForm;
