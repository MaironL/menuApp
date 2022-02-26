import C from './constant';

export interface IInitialState {
  loginLoading: boolean;
  LogInSuccess: {
    isLog: boolean;
    status: string;
    statusText: string;
    token: string;
  };
  logInFail: { fail: boolean; error: string };
}

export const initialState: IInitialState = {
  loginLoading: false,
  LogInSuccess: {
    isLog: false,
    status: '',
    statusText: '',
    token: '',
  },
  logInFail: { fail: false, error: '' },
};

const reducer = (state: IInitialState, { type, payload }: any) => {
  switch (type) {
    /*==============================*/
    case C.LOGIN_LOADING:
      return { ...state, loginLoading: payload };
    /*==============================*/
    case C.LOGIN_SUCCESS:
      return { ...state, LogInSuccess: { ...payload, isLog: true } };
    /*==============================*/
    case C.LOGIN_FAIL:
      return {
        ...state,
        logInFail: { fail: true, error: payload },
        LogInSuccess: {
          isLog: false,
          status: '',
          statusText: '',
          token: '',
        },
      };
    /*==============================*/
    case C.LOGOUT:
      return {
        ...state,
        LogInSuccess: {
          isLog: false,
          status: '',
          statusText: '',
          token: '',
        },
        logInFail: { fail: false, error: '' },
      };

    default:
      throw new Error();
  }
};

export default reducer;
