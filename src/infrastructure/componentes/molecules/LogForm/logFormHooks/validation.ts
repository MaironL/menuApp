interface IValidation {
  email: string;
  password: string;
}

const validation = (props: IValidation) => {
  const errors = {
    email: '',
    password: '',
  };

  //Validation for email
  if (!props.email.trim()) {
    errors.email = 'This field is required';
  } else if (
    props.email.trim() &&
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(props.email.trim())
  ) {
    errors.email = 'Email should be a valid email adress';
  } else {
    errors.email = '';
  }

  //Validation for password
  if (!props.password.trim()) {
    errors.password = 'This field is required';
  } else if (props.password.trim() && !/^.{5,}$/.test(props.password.trim())) {
    errors.password = 'Password should be at least 5 character';
  } else {
    errors.password = '';
  }

  return errors;
};

export default validation;
