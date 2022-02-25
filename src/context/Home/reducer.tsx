import C from './constant';

export interface IInitialState {}

export const initialState: IInitialState = {};

const reducer = (state: IInitialState, { type, payload }: any) => {
  switch (type) {
    /*==============================*/
    case 'test':
      return { ...state };
    default:
      throw new Error();
  }
};

export default reducer;
