import React, { useContext, useReducer, createContext } from 'react';
import reducer, { initialState, IInitialState } from 'context/menus/reducer';
import C, { CI } from './menus/constant';

//CreateContext Interface
interface IAppContext extends IInitialState {
  dispatch: React.Dispatch<any>;
  C: CI;
  state: IInitialState;
}

//The Create Context
const AppContext = createContext<IAppContext>({
  ...initialState,
  dispatch: () => null,
  C,
  state: initialState,
});

const AppProvider = ({ children }: any) => {
  //Delayed LocalstorageCall
  const getlocalStorage = () => {
    const localState = localStorage.getItem('MenuAppstate');
    return localState !== null && JSON.parse(localState);
  };
  const [state, dispatch] = useReducer(reducer, getlocalStorage() || initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
        state,
        dispatch,
        C,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
