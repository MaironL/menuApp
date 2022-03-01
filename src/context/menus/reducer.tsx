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
  menuList: {
    name: string;
    id: string;
    dishes: {
      id: number;
      title: string;
      image: string;
      imageType: string;
      readyInMinutes: number;
      healthScore: number;
      vegan: boolean;
      pricePerServing: number;
      servings: number;
      dairyFree: boolean;
      glutenFree: boolean;
    }[];
  }[];
  searchLoading: boolean;
  dishesSearchFail: { fail: boolean; error: string };
  dishesInMenu: {
    id: number;
    title: string;
    image: string;
    imageType: string;
    readyInMinutes: number;
    healthScore: number;
    vegan: boolean;
    pricePerServing: number;
    servings: number;
    dairyFree: boolean;
    glutenFree: boolean;
  }[];
  meatOrVegan: string;
}

export const initialState: IInitialState = {
  //Login
  loginLoading: false,
  LogInSuccess: {
    isLog: false,
    status: '',
    statusText: '',
    token: '',
  },
  logInFail: { fail: false, error: '' },
  //dishes search
  menuList: [],
  dishesSearchFail: { fail: false, error: '' },
  searchLoading: false,
  //menu
  dishesInMenu: [],
  meatOrVegan: '',
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

    /*==============================*/
    case C.CREATE_MENU:
      const id = '_' + Math.random().toString(36).slice(2);
      return {
        ...state,
        menuList: [...state.menuList, { name: payload, id, dishes: [] }],
      };

    /*==============================*/

    case C.SEARCH_LOADING:
      return { ...state, searchLoading: payload };

    /*==============================*/
    case C.SEARCH_DISHES_SUCCESS:
      const searchDishes = state.menuList.map((dish) => {
        return dish.name === payload.name ? { ...dish, dishes: payload.dishes } : dish;
      });
      return {
        ...state,
        dishesSearchFail: { fail: false, error: '' },
        menuList: searchDishes,
      };

    /*==============================*/
    case C.SEARCH_DISHES_FAIL:
      return {
        ...state,
        dishesSearchFail: { fail: true, error: payload },
      };

    /*==============================*/
    case C.SELECT_DISH_TO_MENU:
      if (state.dishesInMenu.length >= 1) {
        const veganDishes = state.dishesInMenu.filter((dish) => dish.vegan === true);
        if (payload === false && veganDishes.length === 0) {
          return { ...state, meatOrVegan: 'noMoreMeat' };
        }
        if (payload === true && veganDishes.length >= 1) {
          return { ...state, meatOrVegan: 'noMoreVegan' };
        }
      }
      if (state.dishesInMenu.length >= 3) {
        return { ...state, meatOrVegan: 'noMoreDishes' };
      }
      return { ...state };

    case C.ADD_DISH_TO_MENU:
      return { ...state, dishesInMenu: [...state.dishesInMenu, payload] };

    default:
      throw new Error();
  }
};

export default reducer;
