import C from './constant';

type Taction = {
  type: string;
  payload: any;
};

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
    //Name of the menu
    name: string;
    //ID of the menu
    id: string;
    //List of dishes on the search
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
    //The list of 4 dishes to appear in the front page menu
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
    //To validate the type of dishes
    dishDetail: {
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
    };
    meatOrVegan: { vOm: string; veganDishes: number; notVeganDishes: number };
  }[];
  searchLoading: boolean;
  dishesSearchFail: { fail: boolean; error: string };
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
};

const reducer = (state: IInitialState, { type, payload }: Taction) => {
  switch (type) {
    /*==============================Changing Loading state*/
    case C.LOGIN_LOADING:
      return { ...state, loginLoading: payload };

    /*==============================Saving Login Info*/
    case C.LOGIN_SUCCESS:
      return { ...state, LogInSuccess: { ...payload, isLog: true } };

    /*==============================Saving Login Info Fail */
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

    /*==============================Cleaning Login Info*/
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
    /*==============================Creating a new menu*/
    case C.CREATE_MENU:
      const id = '_' + Math.random().toString(36).slice(2);
      return {
        ...state,
        menuList: [
          ...state.menuList,
          {
            name: payload,
            id,
            dishes: [],
            dishesInMenu: [],
            meatOrVegan: { vOm: '', veganDishes: 0, notVeganDishes: 0 },
            dishDetail: {
              id: 0,
              title: '',
              image: '',
              imageType: '',
              readyInMinutes: 0,
              healthScore: 0,
              vegan: false,
              pricePerServing: 0,
              servings: 0,
              dairyFree: false,
              glutenFree: false,
            },
          },
        ],
      };

    /*==============================Changing Loading for dishes search*/
    case C.SEARCH_LOADING:
      return { ...state, searchLoading: payload };

    /*==============================Saving info o dishes searched*/
    case C.SEARCH_DISHES_SUCCESS:
      const searchDishes = state.menuList.map((dish) => {
        return dish.name === payload.name ? { ...dish, dishes: payload.dishes } : dish;
      });
      return {
        ...state,
        dishesSearchFail: { fail: false, error: '' },
        menuList: searchDishes,
      };

    /*==============================Saving info o dishes searched fail*/
    case C.SEARCH_DISHES_FAIL:
      return {
        ...state,
        dishesSearchFail: { fail: true, error: payload },
      };

    /*==============================Adding the dishes from to be displayed in the Menu*/
    case C.ADD_DISH_TO_MENU:
      const menuListDishes = state.menuList.map((menu) => {
        if (menu.name === payload.menus) {
          return { ...menu, dishesInMenu: [...menu.dishesInMenu, payload.dishData] };
        } else {
          return menu;
        }
      });

      return {
        ...state,
        menuList: menuListDishes,
      };

    /*==============================Deleting the dishes displayed in the Menu*/
    case C.DELETE_DISH_OF_MENU:
      const menuListDelDishInMenu = state.menuList.map((menu) => {
        if (menu.name === payload.menus) {
          const dishDeleted = menu.dishesInMenu.filter(
            (menuToDel) => menuToDel.id !== payload.id
          );
          return { ...menu, dishesInMenu: dishDeleted };
        } else {
          return menu;
        }
      });
      return {
        ...state,
        menuList: menuListDelDishInMenu,
      };

    /*==============================Counting how many dishes of type vegan/nonvegan exist in menu*/
    case C.COUNT_DISHES_TYPES:
      const NewMenu = state.menuList.map((menu) => {
        if (menu.name === payload) {
          const veganDishes = menu.dishesInMenu.filter(
            (dish) => dish.vegan === true
          ).length;
          const notVeganDishes = menu.dishesInMenu.filter(
            (dish) => dish.vegan === false
          ).length;
          return {
            ...menu,
            meatOrVegan: { ...menu.meatOrVegan, veganDishes, notVeganDishes },
          };
        } else {
          return menu;
        }
      });
      return {
        ...state,
        menuList: NewMenu,
      };

    /*==============================Validation for the dishes type* on select */
    case C.SELECT_DISH_TO_MENU:
      const menuListVom = state.menuList.map((menu) => {
        if (menu.name === payload.menus) {
          const veganDish = menu.meatOrVegan.veganDishes;
          const NotveganDish = menu.meatOrVegan.notVeganDishes;
          const dishesAmount = veganDish + NotveganDish;

          //To clean the vOm validation after delete dish from menu
          if (payload.isVegan === 'notNewDish') {
            if (NotveganDish < 2 && veganDish < 2) {
              return { ...menu, meatOrVegan: { ...menu.meatOrVegan, vOm: '' } };
            }
            if (NotveganDish < 2 && veganDish === 2) {
              return {
                ...menu,
                meatOrVegan: { ...menu.meatOrVegan, vOm: '' },
              };
            }
            if (NotveganDish === 2 && veganDish < 2) {
              return { ...menu, meatOrVegan: { ...menu.meatOrVegan, vOm: '' } };
            }
          }
          //To set the vOm validation after adding dish to menu
          if (dishesAmount > 1 && dishesAmount < 4) {
            if (payload.isVegan === false && NotveganDish === 2) {
              return { ...menu, meatOrVegan: { ...menu.meatOrVegan, vOm: 'noMoreMeat' } };
            }
            if (payload.isVegan === true && veganDish === 2) {
              return {
                ...menu,
                meatOrVegan: { ...menu.meatOrVegan, vOm: 'noMoreVegan' },
              };
            }
          }
          if (dishesAmount === 4) {
            return { ...menu, meatOrVegan: { ...menu.meatOrVegan, vOm: 'noMoreDishes' } };
          }
          return menu;
        } else {
          return menu;
        }
      });
      return {
        ...state,
        menuList: menuListVom,
      };

    /*==============================*/
    case C.SHOW_DISH_DETAILS:
      const menuListDetails = state.menuList.map((menu) => {
        if (menu.name === payload.menus) {
          return { ...menu, dishDetail: payload.detail };
        } else {
          return menu;
        }
      });

      return {
        ...state,
        menuList: menuListDetails,
      };

    /*==============================*/
    case C.DEL_MENU_NAME:
      const deletingMenu = state.menuList.filter((menu) => menu.id !== payload);
      return {
        ...state,
        menuList: deletingMenu,
      };

    /*==============================*/
    case C.EDIT_MENU_NAME:
      const editMenu = state.menuList.map((menu) => {
        return menu.id === payload.id ? { ...menu, name: payload.newName } : menu;
      });
      return {
        ...state,
        menuList: editMenu,
      };

    /*==============================*/
    default:
      throw new Error();
  }
};

export default reducer;
