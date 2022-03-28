interface IValidation {
  isLogin: boolean;
  name: string;
  email: string;
  password: string;
}

const validation = (props: IValidation) => {
  const errors = {
    name: '',
    email: '',
    password: '',
  };

  if (!props.isLogin && !props.name.trim()) {
    errors.name = 'This field is required';
  } else if (!props.isLogin && props.name.length < 3) {
    errors.name = 'Username field must be at least 3 characters';
  } else {
    errors.name = '';
  }

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
