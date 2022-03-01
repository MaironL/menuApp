export interface CI {
  //Login constant
  LOGIN_LOADING: string;
  LOGIN_SUCCESS: string;
  LOGIN_FAIL: string;
  LOGOUT: string;
  //Navigation menu List
  CREATE_MENU: string;
  SEARCH_LOADING: string;
  SEARCH_DISHES_SUCCESS: string;
  SEARCH_DISHES_FAIL: string;
  ADD_DISH_TO_MENU: string;
  SELECT_DISH_TO_MENU: string;
}

const C: CI = {
  //Login constant
  LOGIN_LOADING: 'LOGIN_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
  //Navigation menu List
  CREATE_MENU: 'CREATE_MENU',
  //search dishes
  SEARCH_LOADING: 'SEARCH_LOADING',
  SEARCH_DISHES_SUCCESS: 'SEARCH_DISHES_SUCCESS',
  SEARCH_DISHES_FAIL: 'SEARCH_DISHES_FAIL',
  //menuDishes
  ADD_DISH_TO_MENU: 'ADD_DISH_TO_MENU',
  SELECT_DISH_TO_MENU: 'SELECT_DISH_TO_MENU',
};

export default C;
