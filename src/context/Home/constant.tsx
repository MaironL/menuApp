export interface CI {
  LOGIN_LOADING: string;
  LOGIN_SUCCESS: string;
  LOGIN_FAIL: string;
  LOGOUT: string;
}

const C: CI = {
  LOGIN_LOADING: 'LOGIN_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
};

export default C;
